/*
  Here lives all of Unslated's custom Webpack plugins.
  Please note, the majority of plugins have been hand crafted to be ran under a abstract syntax tree.
*/

const fs = require('fs');
const path = require('path');
const { declare } = require('@babel/helper-plugin-utils');

const getElementName = (pathing) => {
  pathing = path.resolve(__dirname, pathing).split('\\');
  return pathing[pathing.length - 1].split('.')[0];
};

// Unslated's ECMA Script comment based docs
const ESDocs = declare((api, opts) => {
  process.esDocsReset = () => {};
  process.esDocs = {};
  let imports = [];
  let comments;

  const commentToSourceMatching = (comments, ast, name) => {
    let comment = false;

    Object.keys(comments).map((i) => {
      const cmt = comments[i];
      if ((ast.node.loc.start.line - 1) === cmt.loc.start.line) {
        comment = cmt.value;
      } else if ((ast.node.loc.start.line - 2) === cmt.loc.start.line) {
        comment = cmt.value;
      }

      return false;
    });

    return comment;
  };

  const getMethodParams = (containers) => {
    let params = [];
    Object.keys(containers.init.params).map((j) => {
      params.push(containers.init.params[j].name);
    });

    return params;
  };

  const getEventParams = (params) => {
    let collection = [];
    if (params) {
      Object.keys(params).map((j) => {
        collection.push(params[j].name);
      });
    }

    return collection;
  };

  const getSelectorTemplateLiteral = (expressions, quasis) => {
    let selector = '';
    let collection = [];

    // first we collect both expressions and quasis start line numbers
    Object.keys(quasis).map((i) => {
      collection.push(quasis[i].start);
    });

    Object.keys(expressions).map((i) => {
      collection.push(expressions[i].start);
    });

    // then we sort the numbers
    collection = collection.sort((a, b) => a - b);

    // then we loop / hunt for the values based on the order of our sorting above.
    Object.keys(collection).map((i) => {
      Object.keys(quasis).map((j) => {
        if (collection[i] === quasis[j].start) {
          selector += quasis[j].value.raw;
        }
      });

      Object.keys(expressions).map((j) => {
        if (collection[i] === expressions[j].start) {
         selector += `\$\{${expressions[j].name}\}`;
        }
      });
    });

    // results
    return selector;
  };

  return {
    name: 'ESDocs',
    visitor: {
      Program(ast, file) {
        if (file.filename.indexOf('.container.js') !== -1) {
          comments = ast.container.comments;

          // Grab elements name from file.filename
          const elementName = getElementName(file.filename);

          // Start element's collection entry point
          process.esDocs[elementName] = {};
          process.esDocs[elementName].events = [];
          process.esDocs[elementName].methods = [];
          process.esDocs[elementName].selectors = [];
        }
      },
      Expression(ast, file) {
        if (file.filename.indexOf('container.js') !== -1) {
          const container = ast.container;
          const callee = container.callee;
          const elementName = getElementName(file.filename);

          // Methods documenting
          if (ast.type === 'ArrowFunctionExpression') {
            if (container.length) {
              Object.keys(container).keys((i) => {
                if (container[i].id) {
                  process.esDocs[elementName].methods.push({
                    name: container[i].id.name,
                    type: ast.type,
                    comment: commentToSourceMatching(comments, ast, container[i].id.name),
                    params: getMethodParams(container[0])
                  });
                }
              });
            } else {
              if (container.type !== 'AssignmentExpression') {
                process.esDocs[elementName].methods.push({
                  name: container.id.name,
                  type: ast.type,
                  comment: commentToSourceMatching(comments, ast, container.id.name),
                  params: getMethodParams(container)
                });
              }
            }
          }

          if (ast.type === 'FunctionExpression') {
            process.esDocs[elementName].methods.push({
              name: ast.name,
              type: ast.type,
              comment: commentToSourceMatching(comments, ast),
              params: getMethodParams(container)
            });
          }

          // eventListener documenting
          if (ast.type === 'MemberExpression') {
            if (ast.node.property.name === 'addEventListener') {
              const args = container.arguments;
              const parent = callee.object.object;
              const endpoint = (callee.object.name) ? callee.object : callee.object.property;
              let element;

              if (parent && endpoint) {
                element = `${parent.name}.${endpoint.name}`;
              } else if (parent && !endpoint) {
                element = parent.name;
              } else if (!parent && endpoint) {
                element = endpoint.name;
              }

              if (!element) {
                console.log(element);
              }

              process.esDocs[elementName].events.push({
                file: file.filename,
                line: container.loc.start.line,            // line in document this is expressed
                element: element,
                eventType: args[0].value,   // `click`, `mouseup`, keyup etc.
                callbackType: args[1].type,    // callback kind `function(){}` or `() => {}`
                callbackParams: getEventParams(args[1].params), // params passed to listener callback
              });
            }


            // querySelector documenting
            if (
              ast.node.property.name === 'querySelector'
              || ast.node.property.name === 'querySelectorAll'
            ) {
              const args = container.arguments;
              if (args[0].type === 'StringLiteral') {
                process.esDocs[elementName].selectors.push({
                  file: file.filename,
                  line: container.loc.start.line,            // line in document this is expressed
                  element: callee.object.name,
                  selector: args[0].value,               // '#someId .someClass etc.'
                  selectorType: ast.node.property.name
                });
              }

              if (args[0].type === 'TemplateLiteral') {
                console.log();
                process.esDocs[elementName].selectors.push({
                  file: file.filename,
                  line: container.loc.start.line,            // line in document this is expressed
                  element: callee.object.name,
                  selector: getSelectorTemplateLiteral(args[0].expressions, args[0].quasis), // templateliteral variable usage
                  selectorType: ast.node.property.name
                });
              }
            }
          }

          // Determins line numbers of methods being used
          if (ast.type === 'CallExpression') {
            if (container.expression) {
              if (container.expression.callee.name) {
                const name = container.expression.callee.name;

                Object.keys(process.esDocs[elementName].methods).map((j) => {
                  const method = process.esDocs[elementName].methods[j];
                  if (method.name === name) {
                    if (!method.used) {
                      method.used = [];
                    }

                    method.used.push(container.expression.callee.loc.start.line);
                  }
                });

              }
            }
          }
        }
      }
    }
  };
});

const JSXDocs = declare((api, opts) => {
  process.jsxDocsReset = () => {};
  process.jsxDocs = {};

  const getComment = (prop) => (prop.leadingComments) ? Object.keys(prop.leadingComments).map((k) => prop.leadingComments[k].value).join(' ') : '';

  const getPropTypes = (classProperties, elementName) => {
    const collection = [];

    Object.keys(classProperties).map((i) => {
      const classPropertyName = classProperties[i].key.name;
      if (classPropertyName === 'propTypes') {
        const propTypes = classProperties[i].value.properties;
        Object.keys(propTypes).map((j) => {
          const prop = propTypes[j];
          const propName = prop.key.name;


          if (prop.value.object) {
            const { object } = prop.value;
            const { property } = prop.value;
            collection.push({
              name: propName,
              type: (object.property) ? object.property.name : property.name,
              value: `${(object.name) ? object.name : `PropTypes.${object.property.name}`}.${property.name}`,
              required: (object.property) ? property.name : false,
              description: getComment(prop)
            })
          }

          if (prop.value.callee) {
            const { object } = prop.value.callee;
            const { property } = prop.value.callee;
            const { arguments } = prop.value;

            collection.push({
              name: propName,
              type: (object.property) ? object.property.name : property.name,
              value: `${object.name}.${property.name}([${
                Object.keys(arguments).map((k) => {
                  const { elements } = arguments[k];
                  return Object.keys(elements).map((l) => {
                    return (elements[l].value) ? `'${elements[l].value}'` : `${elements[l].object.name}.${elements[l].property.name}`;
                  });
                }).join(', ')
              }])`,
              required: (object.property) ? property.name : false,
              description: getComment(prop)
            });
          }
        });
      }
    });

    return collection;
  };

  return {
    name: 'JSXDocs',
    visitor: {
      Program(ast, file) {
        if (file.filename.indexOf('.jsx') !== -1 && file.filename.indexOf('.example.jsx') === -1) {

        }
      },
      Class(ast, file) {
        if (ast.node.superClass.object.name === 'React') {
          const elementName = ast.node.id.name;
          const classProperties = ast.node.body.body;

          // If you build it, they will come.
          if (!process.jsxDocs[getElementName(file.filename)]) {
            process.jsxDocs[getElementName(file.filename)] = {};
          }

          process.jsxDocs[getElementName(file.filename)][elementName] = {
            description: getComment(ast.container),
            props: getPropTypes(classProperties, elementName)
          };
        }
      }
    }
  };
});

const ESMetrics = declare((api, opts) => {
  process.jsMetricsReset = () => {
    return {
      utils: {
        all: 0,
        xhr: 0,
        fetch: 0
      },
      variables: {
        all: 0,
        const: 0,
        lets: 0
      },
      loops: {
        all: 0,
        for: 0,
        forIn: 0,
        forOf: 0,
        while: 0,
        object: 0
      },
      methods: {
        all: 0,
        functions: 0,
        arrows: 0
      },
      promises: {
        all: 0,
        async: 0,
        await: 0
      },
      expressions: {
        all: 0,
        assignments: 0,
        calls: 0,
        members: 0
      }
    }
  };

  process.jsMetrics = process.jsMetricsReset();

  // https://babeljs.io/docs/en/6.26.3/babel-types for all available babel AST types
  return {
    name: "metrics",
    visitor: {
      Declaration(ast, file) {
        if (file.filename.indexOf('container.js') !== -1) {
          if (ast.type === 'VariableDeclaration') {
            if (ast.node.kind === 'let') { // please note let === var
              process.jsMetrics.variables.all++;
              process.jsMetrics.variables.lets++;
            }

            if (ast.node.kind === 'const') {
              process.jsMetrics.variables.all++;
              process.jsMetrics.variables.const++;
            }
          }
        }
      },
      Expression(ast, file) {
        if (file.filename.indexOf('container.js') !== -1) {
          /* Arrow Methods */
          if (ast.type === 'ArrowFunctionExpression') {
            process.jsMetrics.methods.all++;
            process.jsMetrics.methods.arrows++;
          }

          if (ast.type === 'FunctionExpression') {
            process.jsMetrics.methods.all++;
            process.jsMetrics.methods.functions++;
          }

          if (ast.type === 'CallExpression') {
            process.jsMetrics.expressions.all++;
            process.jsMetrics.expressions.calls++;
          }

          if (ast.type === 'AssignmentExpression') {
            process.jsMetrics.expressions.all++;
            process.jsMetrics.expressions.assignments++;
          }

          if (ast.type === 'MemberExpression') {
            process.jsMetrics.expressions.all++;
            process.jsMetrics.expressions.members++;

            /* Utils Usage */
            if (ast.node.name === 'Utils') {
              // All Utils used
              process.jsMetrics.utils.all++;

              // XHR Usage
              if (ast.node.property.name === 'XHR') {
                process.jsMetrics.utils.xhr++;
              }

              // Fetch Usage
              if (ast.node.property.name === 'Fetch') {
                process.jsMetrics.utils.fetch++;
              }
            }

            // Object Methods (keys, map)
            if (ast.node.property.name === 'keys') {
              process.jsMetrics.loops.all++;
              process.jsMetrics.loops.object++;
            }
          }
        }
      },
      For(ast, file) {
        if (file.filename.indexOf('container.js') !== -1) {
          process.jsMetrics.loops.all++;

          if (ast.type === 'ForStatement') {
            process.jsMetrics.loops.for++;
          }

          if (ast.type === 'ForInStatement') {
            process.jsMetrics.loops.forIn++;
          }

          if (ast.type === 'ForOfStatement') {
            process.jsMetrics.loops.forOf++;
          }
        }
      },
      While(ast, file) {
        if (file.filename.indexOf('container.js') !== -1) {
          process.jsMetrics.loops.all++;
          process.jsMetrics.loops.while++;
        }
      }
    }
  };
});

/*
  Helper plugin to compile our project metric and docs into guide.js
*/
class Bundle {
  constructor() {
    this.stats = {
      js: [],
      css: [],
      files: []
    };

    this.excludes = ['node_modules', '!', 'jsx', 'guide'];
    this.includes = ['js', 'css', 'svg', 'jpg', 'png', 'gif', 'atoms', 'molecules', 'modifiers', 'organisms'];
  }

  // Used to prevent unwanted file types into our file list buildup
  filter(url) {
    if (!this.excludes.some(substring => url.includes(substring))) {
      if (this.includes.some(substring => url.includes(substring))) {
        return true;
      }
    }

    return false;
  }

  // Used to prevent duplicates in file list buildup
  duplicateChecker(hunt, object) {
    let alreadyHave = false;
    Object.keys(object).map((i) => {
      if (hunt === object[i].name) {
        alreadyHave = true;
      }

      return false;
    });

    return alreadyHave;
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('StatsCompile', (factory) => {
      factory.hooks.module.tap('StatsCompile', (module) => {
        const url = module.userRequest;
        const name = url.replace(path.resolve(__dirname, '../../../'), '');
        if (this.filter(url) && !this.duplicateChecker(name, this.stats.files)) {
          this.stats.files.push({
            'name': name,
            'size': fs.statSync(module.userRequest)['size']
          })
        }
      });
    });

    compiler.hooks.afterCompile.tap('StatsCompile', (compilation) => {
      const assets = compilation.assets;
      Object.keys(assets).map((i) => {
        const asset = assets[i];
        if (asset._source) {
          if (this.filter(i) && !this.duplicateChecker(i, this.stats.files)) {
            this.stats.files.push({
              "name": i,
              "size": asset._source.children.join('').length
            });
          }
        }
      });
    });

    compiler.hooks.emit.tap('StatsCompile', (compilation) => {
      Object.keys(compilation.assets).map((i) => {
        if (i.indexOf('guide.js') !== -1) {
          this.stats.js = process.jsMetrics;
          this.stats.css = process.cssMetrics;
          const source = `
            var __stats__ = ${JSON.stringify(this.stats)};\n ${compilation.assets[i].source()};
            var __jsxDocs__ = ${JSON.stringify(process.jsxDocs)};
            var __esDocs__ = ${JSON.stringify(process.esDocs)};
          `;

          compilation.assets[i] = {
            source: function () {
              return source;
            },
            size: function () {
              return source.length;
            }
          };

          // The great memory leak prevention reset (DO NOT REMOVE!)
          process.jsMetrics = process.jsMetricsReset();
          process.cssMetrics = process.cssMetricsReset();
        }
      });
    });
  }
}

module.exports = {
  JSXDocs,
  ESDocs,
  ESMetrics,
  Bundle
};
