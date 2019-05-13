const postcss = require('postcss');

const colors = postcss.plugin('postcss-color', (options) => {
  options = options || {};

  const HexToRGB = (color) => {
    color = color.replace('#', '');
    if (color.length < 6) {
      color += color;
    }

    return [
      parseInt(color.substr(0, 2), 16),
      parseInt(color.substr(2, 2), 16),
      parseInt(color.substr(4, 2), 16)
    ];
  };

  const RGB_Linear_Shade = (color, percent) => {
    let intParse = parseInt;
    let intRound = Math.round;

    let e = (intParse(color[0]) === 0) ? 1 : color[0];
    let f = (intParse(color[1]) === 0) ? 1 : color[1];
    let g = (intParse(color[2]) === 0) ? 1 : color[2];
    let h = (intParse(color[3]) === 0) ? 1 : color[3];

    let q = percent < 0;
    let t = q ? 0 : 255 * percent;
    q = q ? 1 + percent : 1 - percent;
    return [
      'rgb',
      (h ? 'a(' : '('),
      intRound(intParse(e) * (q + t)),
      ',',
      intRound(intParse(f) * (q + t)),
      ',',
      intRound(intParse(g) * (q + t)),
      (h ? ',' + h : ')')
    ].join('');
  }

  return (root) => {
    root.walkDecls(decl => {
      if (decl.value.indexOf('color(') !== -1) {
        const colors = decl.value.match(/color\((.*?)\)/g);
        Object.keys(colors).map((index) => {
          const arguments = colors[index].replace(/^color\((.*?)\)$/, '$1').split(',');
          const color = (arguments[0].length < 7) ? (arguments[0] + arguments[0].replace('#', '')) : arguments[0];
          const brightness = (parseInt(arguments[1]) / 100);

          decl.value = decl.value.replace(colors[index], RGB_Linear_Shade(HexToRGB(color), brightness));
        });
      }
    });
  };
});

const exporting = postcss.plugin('postcss-colors', (options) => {
  options = options || {};

  return (root) => {
    root.walkRules(':export', (rule) => {
      rule.selector = ':root';
      rule.append('--css-exports: true;');
    });
  };
});

const extend = postcss.plugin('postcss-extend', (options) => {
  options = options || {
    preserve: false
  };

  return (root) => {
    // loop over @extend rules
    root.walkAtRules(atRule => {
      if(atRule.name.indexOf('extend') === -1) { return; }

      const extendStyles = (to, from) => {
        from.walkDecls(decl => {
          const clone = decl.clone();
          to.append(clone);
        });
      };

      const data = {
        type: (atRule.name.indexOf('extend-all') === -1) ? 'extend' : 'extend-all',
        extender: atRule.parent.selector,
        extending: atRule.params.trim()
      };

      // loop over selectors
      root.walkRules(normalRule => {
        // basic extend
        if (normalRule.selector.trim() === atRule.params.trim()) {
          extendStyles(atRule.parent, normalRule);
        }

        // deep extend
        if (data.type === 'extend-all'
          && normalRule.selector.indexOf(data.extending) !== -1
          && normalRule.selector.indexOf(data.extender) === -1
        ) {

          const toSelectors = data.extender.split(',');
          const fromSelectors = normalRule.selector.split(',');

          // Make sure we check for previously extended mathces across both to and from selectors.
          const alreadyExtended = () => {
            let flag = false;
            Object.keys(fromSelectors).map((i) => {
              const selector = fromSelectors[i].replace(/\\n\\n/g, '').trim();
              fromSelectors[i] = selector;
              if (selector.indexOf(atRule.params.trim()) > 0) {
                flag = true;
              }
            });

            Object.keys(toSelectors).map((i) => {
              const selector = toSelectors[i].replace(/\\n\\n/g, '').trim();
              toSelectors[i] = selector;
              if (selector.indexOf(atRule.params.trim()) > 0) {
                flag = true;
              }
            });
            return flag;
          };

          if (alreadyExtended()) { return false; } // prevents matching already extended matches

          let styles = '';
          normalRule.walkDecls(decl => {
            styles += `${decl.prop}: ${decl.value};`;
          });


          // Build new selectors off to and from selectors
          let i = fromSelectors.length;
          let newSelector = '';
          while (i--) {
            let j = toSelectors.length;
            while (j--) {
              newSelector += `${fromSelectors[i].replace(new RegExp(`${atRule.params.trim()}(.*?)`, 'g'), ` ${toSelectors[j]}$1`)},`;
            }
          }

          // Combine new extended selectors and styles
          newSelector = `
            ${
              newSelector
            } {
              ${styles}
            }
          `.replace(', {', ' {'); // <- little clean up catching

          root.append(newSelector);
        }
      });

      atRule.remove(); // once we are done extending, we already remove the extend rule
    });
  };
});

const media = postcss.plugin('postcss-custom-media', (options) => {
  options = options || {
    preserve: false
  };

  const queries = [];
  const packs = [];

  return (root) => {
    // collect all possible breakpoints
    root.walkDecls(decl => {
      const value = decl.value;
      if (value.indexOf('only screen and') !== -1 ||
        value.indexOf('screen and') !== -1 ||
        value.indexOf('only print and') !== -1 ||
        value.indexOf('print and') !== -1) {
        queries[decl.prop] = value;
        packs[value] = '';
      }
    });

    // replace @mediavariable declirations, with values from collected queries above
    root.walkAtRules('media', (rule) => {
      const variable = rule.params.replace(/\((.*)\)/g, '$1');
      Object.keys(queries).map(key => {
        if (key === variable) {
          rule.params = queries[key];

          // gather meida queries inners
          rule.walkRules(innerRules => {
            let stringSelector = `  ${innerRules.selector} {\n`;
            innerRules.walkDecls(innerDecl => {
                stringSelector += `    ${innerDecl.prop}: ${innerDecl.value};\n`;
            });
            stringSelector += '  }\n';

            packs[queries[key]] += stringSelector;
          });
        }
      });

      rule.remove(); // remove this query, to re-append a packed set down below.
    });

    // append compressed media quries to end of sheet
    const objectReverse = (object) => {
      const newObject = {};
      const keys = [];

      Object.keys(object).map((key) => keys.push(key));

      for (let i = keys.length - 1; i >= 0; i--) {
        const value = object[keys[i]];
        newObject[keys[i]] = value;
      }

      return newObject;
    };

    Object.keys(objectReverse(packs)).map((i) => {
      if (packs[i].length) {
        root.append(`@media ${i} {\n${packs[i]}\n}`);
      }
    });
  };
});

const rems = postcss.plugin('postcss-rems', (options) => {
  options = options || {
    baseSize: 16
  };

  return root => {
    root.walkDecls(decls => {
      if (decls.value.indexOf('rem(') !== -1) {
        let occurances = decls.value.match(/rem\(.*?\)/g);
        Object.keys(occurances).map(i => {
          let unit = parseInt(occurances[i].replace(/rem\((.*?)\)/g, '$1'), 10);
          decls.value = decls.value.replace(occurances[i], `${unit / options.baseSize}rem`);
        });
      }
    })
  }
});

const roots =postcss.plugin('postcss-vars', (options) => {
  options = options || {};

  return root => {
    root.walkRules(':root', rule => {
      // we never remove color root for guide purposes
      // if (typeof rule === 'undefined') { return false; }
      // if (rule.parent.source.input.file.indexOf('colors.css') !== -1) { return; }
      rule.remove();
    });
  };
});

const variables = postcss.plugin('postcss-vars', (options) => {
  options = options || {};
  const variables = [];

  return root => {
    const extractVariables = (value) => {
      value = value.split(' ');
      return Object.keys(value).map(index => {
        if (value[index].replace(/var\((.*?)\)/g, '$1').indexOf('--') !== -1) {
          let quickClean = value[index].replace(/var\((.*?)\)/g, '$1');
          quickClean = quickClean.replace(/,/g, '');
          if (quickClean.split('(').length > 1) {
            return quickClean.split('(')[1];
          }
          return quickClean;
        }
        return;
      }).filter((n) => n);
    };

    // First, build list of variables
    root.walkRules(':root', rule => {
      rule.walkDecls(decl => {
        if (decl.prop.indexOf('--') !== -1) {
          variables[decl.prop] = decl.value;
        }
      });
    });

    // Next loop over list of variables values, and determin if
    // values are back referencing another variable or not.
    // if found to be back referencing another variable, use extractVariable method to
    // reverse loop up variables value in our list and update value
    Object.keys(variables).map(index => {
      const reverseLookupVariable = extractVariables(variables[index]);
      if (reverseLookupVariable.length) {
        const reverseLookupValue = variables[reverseLookupVariable];
        variables[index] = variables[index].replace('var('+reverseLookupVariable+')', reverseLookupValue);
      }
    });

    // Now that we have a distilled down list of all variables, lets replace all usage of variables across the
    // stylesheets using our clean variables list as a key
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        Object.keys(variables).map(index => {
          if (decl.value.indexOf('var('+index+')') !== -1) {
            decl.value = decl.value.replace(/var\((.*?)\)/g, variables[index]);
          }
        });
      });
    });
  };
});

const comments = postcss.plugin('postcss-comments', (options) => {
  options = options || {};
  return root => {
    root.walkComments(comment => {
      comment.remove();
    });
  };
});

module.exports = {
  exporting,
  variables,
  comments,
  extend,
  colors,
  media,
  roots,
  rems
};
