/*
  Here lives all of Unslated's custom Webpack plugins.
  Please note, the majority of plugins have been hand crafted to be ran under a abstract syntax tree.
*/

const fs = require('fs');
const path = require('path');
const { declare } = require('@babel/helper-plugin-utils');
const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

const getElementName = (pathing) => path.basename(path.resolve(__dirname, pathing)).split('.')[0];


// Used to collect all metrics and docs from element .container.js files
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

  const getMethodParams = (containers) => (containers.init)
    ? [...Object.keys(containers.init.params).map((i) => containers.init.params[i].name)]
    : [];

  const getEventParams = (params) => (params)
    ? [...Object.keys(params).map((i) => params[i].name)]
    : [];

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
        if (file.filename.indexOf('.container') !== -1) {
          comments = ast.container.comments;

          // Grab elements name from file.filename
          const elementName = getElementName(file.filename);

          // Start element's collection entry point
          process.esDocs[elementName] = {
            events: [],
            methods: [],
            expressions: [],
            selectors: [],
            variables: [],
            utils: [],
            loops: [],
            promises: {
              async: [],
              await: []
            }
          };
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
                    kind: ast.kind,
                    params: getMethodParams(container[i]),
                    comment: (container[i].id) ? commentToSourceMatching(comments, ast, container[i].id.name) : '',
                    line: container.loc.start.line         // line in document this is expressed
                  });
                }
              });
            } else {
              if (container.type !== 'AssignmentExpression') {
                process.esDocs[elementName].methods.push({
                  name: (container.id) ? container.id.name : (container.key) ? container.key.name : '--',
                  type: ast.type,
                  kind: ast.kind,
                  params: getMethodParams(container),
                  comment: (container.id) ? commentToSourceMatching(comments, ast, container.id.name) : '',
                  line: container.loc.start.line         // line in document this is expressed
                });
              }
            }
          }

          if (ast.type === 'FunctionExpression') {
            process.esDocs[elementName].methods.push({
              name: ast.name,
              type: ast.type,
              params: getMethodParams(container),
              comment: commentToSourceMatching(comments, ast),
              line: container.loc.start.line         // line in document this is expressed
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

              process.esDocs[elementName].events.push({
                file: file.filename,
                element: element,
                eventType: args[0].value,   // `click`, `mouseup`, keyup etc.
                callbackType: args[1].type,    // callback kind `function(){}` or `() => {}`
                callbackParams: getEventParams(args[1].params), // params passed to listener callback
                comments: commentToSourceMatching(comments, ast),
                line: container.loc.start.line         // line in document this is expressed
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
                  element: callee.object.name,
                  selector: args[0].value,               // '#someId .someClass etc.'
                  selectorType: ast.node.property.name,
                  comments: commentToSourceMatching(comments, ast),
                  line: container.loc.start.line            // line in document this is expressed
                });
              }

              if (args[0].type === 'TemplateLiteral') {
                process.esDocs[elementName].selectors.push({
                  file: file.filename,
                  element: callee.object.name,
                  selector: getSelectorTemplateLiteral(args[0].expressions, args[0].quasis), // templateliteral variable usage
                  selectorType: ast.node.property.name,
                  comments: commentToSourceMatching(comments, ast),
                  line: container.loc.start.line            // line in document this is expressed
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
      },
      VariableDeclaration(ast, file) {
        if (file.filename.indexOf('.container') !== -1) {
          const elementName = getElementName(file.filename);
          process.esDocs[elementName].variables.push({
            type: ast.type,
            kind: ast.node.kind,
            name: ast.node.declarations[0].id.name,
            comments: commentToSourceMatching(comments, ast),
            line: ast.node.local
          });
        }
      },
      CallExpression(ast, file) {
        const elementName = getElementName(file.filename);
        if (file.filename.indexOf('.container') !== -1) {
          // sometimes x.y(arguments) othertimes y(arguments)
          process.esDocs[elementName].expressions.push({
            type: ast.node.type,
            object: (ast.node.callee.object) ? ast.node.callee.object.name : null,
            property: (ast.node.callee.property) ? ast.node.callee.property.name : null,
            identifier: (ast.node.callee.name) ? ast.node.callee.name : null,
            arguments: (ast.node.arguments) ? Object.keys(ast.node.arguments).map((i) => ast.node.arguments[i].type) : [],
            comments: commentToSourceMatching(comments, ast),
            line: ast.node.loc.start.line
          });
        }
      },
      AssignmentExpression(ast, file) {
        const elementName = getElementName(file.filename);
        if (file.filename.indexOf('.container') !== -1) {
          process.esDocs[elementName].expressions.push({
            type: ast.node.type,
            left: `${ast.node.left.object.name}.${ast.node.left.property.name}`,
            operator: ast.node.operator,
            comments: commentToSourceMatching(comments, ast),
            line: ast.node.loc.start.line
          });
        }
      },
      MemberExpression(ast, file) {
        const elementName = getElementName(file.filename);
        if (file.filename.indexOf('.container') !== -1) {
          process.esDocs[elementName].expressions.push({
            type: ast.node.type,
            object: ast.node.object.name,
            property: ast.node.property.name,
            comments: commentToSourceMatching(comments, ast),
            line: ast.node.loc.start.line
          });

          /* Utils Usage */
          if (ast.node.name === 'Utils') {
            process.esDocs[elementName].utils.push({
              object: ast.node.name,
              property: ast.node.property.name,
              comments: commentToSourceMatching(comments, ast),
              line: ast.node.loc.start.line
            });
          }

          // Object Methods (keys, map)
          if (ast.node.property.name === 'keys') {
            Object.keys(ast.container.arguments).map((i) => {
              if (!ast.container.arguments[i].property) {
                console.log();
              }
            });
            process.esDocs[elementName].loops.push({
              type: 'ObjectKeysExpression',
              keys: Object.keys(ast.container.arguments).map((i) => (ast.container.arguments[i].property)
                ? ast.container.arguments[i].property.name
                : ast.container.arguments[i].name
              ),
              comments: commentToSourceMatching(comments, ast),
              line: ast.node.loc.start.line
            });
          }
        }
      },
      ForStatement(ast, file) {
        const elementName = getElementName(file.filename);
        if (file.filename.indexOf('container.js') !== -1) {
          Object.keys(ast.container).map((i) => {
            if (ast.container[i].type === 'ForStatement') {
              process.esDocs[elementName].loops.push({
                type: 'ForStatement',
                test: `${generator(ast.container[i].init, {}, ast.container[i].init).code} ${generator(ast.container[i].test, {}, ast.container[i].test).code} ${generator(ast.container[i].update, {}, ast.container[i].update).code}`,
                comments: commentToSourceMatching(comments, ast),
                line: ast.node.loc.start.line
              });
            }
          });
        }
      },
      ForInStatement(ast, file) {
        const elementName = getElementName(file.filename);
        if (file.filename.indexOf('container.js') !== -1) {
          Object.keys(ast.container).map((i) => {
            if (ast.container[i].type === 'ForInStatement') {
              process.esDocs[elementName].loops.push({
                type: 'ForInStatement',
                test: `${generator(ast.container[i].left, {}, ast.container[i].left).code.replace(';', '')} in ${generator(ast.container[i].right, {}, ast.container[i].right).code}`,
                comments: commentToSourceMatching(comments, ast),
                line: ast.node.loc.start.line
              });
            }
          });
        }
      },
      ForOfStatement(ast, file) {
        const elementName = getElementName(file.filename);
        if (file.filename.indexOf('container.js') !== -1) {
          Object.keys(ast.container).map((i) => {
            if (ast.container[i].type === 'ForOfStatement') {
              process.esDocs[elementName].loops.push({
                type: 'ForOfStatement',
                test: `${generator(ast.container[i].left, {}, ast.container[i].left).code.replace(';', '')} of ${generator(ast.container[i].right, {}, ast.container[i].right).code}`,
                comments: commentToSourceMatching(comments, ast),
                line: ast.node.loc.start.line
              });
            }
          });
        }
      },
      WhileStatement(ast, file) {
        const elementName = getElementName(file.filename);
        if (file.filename.indexOf('container.js') !== -1) {
          process.esDocs[elementName].loops.push({
            type: 'WhileStatement',
            test: generator(ast.container.test, {}, ast.container.test),
            comments: commentToSourceMatching(comments, ast),
            line: ast.node.loc.start.line
          });
        }
      }
    }
  };
});

// Used to collect all metrcis and docs from element .jsx and example.jsx files
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

  const getAtomicLevel = (path) => {
    if (path.indexOf('atoms') !== -1) {
      return 'atoms';
    }
    if (path.indexOf('modifiers') !== -1) {
      return 'modifiers';
    }
    if (path.indexOf('molecules') !== -1) {
      return 'molecules';
    }
    if (path.indexOf('organisms') !== -1) {
      return 'organisms';
    }
    if (path.indexOf('templates') !== -1) {
      return 'templates';
    }

    return false;
  };

  // https://babeljs.io/docs/en/6.26.3/babel-types for all available babel AST types
  // pre: used to make targeted updates to the collected data during dev builds
  // visitor: used as the actual data collection all build types
  // post: used as cleanup point for any collected data
  return {
    name: 'JSXDocs',
    pre(state) {
      // Targeted reset for dev builds
      const elementName = path.basename(state.hub.file.opts.filename).split('.')[0];
      if (process.jsxDocs[elementName]) {
        process.jsxDocs[elementName].Using = {};
        process.jsxDocs[elementName].Reusing = {};
      }
    },
    visitor: {
      Program(ast, file) {},
      Class(ast, file) {
        if (ast.node.superClass.object.name === 'React') {
          const elementName = ast.node.id.name;
          const classProperties = ast.node.body.body;

          // If you build it, they will come.
          if (!process.jsxDocs[getElementName(file.filename)]) {
            process.jsxDocs[getElementName(file.filename)] = {
              Level: undefined,
              Examples: 0,
              Tags: {},
              Using: {},
              Reusing: {}
            };
          }

          process.jsxDocs[getElementName(file.filename)].Level = getAtomicLevel(file.filename);
          process.jsxDocs[getElementName(file.filename)].Tags[elementName] = {
            description: getComment(ast.container),
            props: getPropTypes(classProperties, elementName)
          };
        }
      }
    },
    post(state) {
      traverse(state.ast, {
        ImportDeclaration: (ast) => {
          const value = ast.node.source.value.toLowerCase();
          const levels = ['atoms', 'molecules', 'organisms', 'templates'];

          if (
            value.indexOf('.css') === -1
            && value.indexOf('.js') === -1
            && value.indexOf('.container') === -1
            && value.indexOf('.example') === -1
          ) {
            // Determins used element types and levels (root or sub and atomic levels)
            Object.keys(ast.container).map((i) => {
              const node = ast.container[i];
              if (!node.source) { return false; }

              const sourceFilename = path.basename(ast.hub.file.opts.filename).split('.')[0];
              const sourceValue = node.source.value;

              if (sourceFilename.indexOf('@guide') !== -1) { return false; }
              if (ast.hub.file.opts.filename.indexOf('guide') !== -1) { return false; }

              if (
                sourceValue &&
                sourceValue.indexOf('@guide') === -1 &&
                sourceValue.indexOf('@vars') === -1 &&
                sourceValue.indexOf('@src') === -1 &&
                sourceValue.indexOf('.json') === -1 &&
                sourceValue.indexOf('.jpg') === -1 &&
                sourceValue.indexOf('.svg') === -1 &&
                sourceValue.indexOf('.png') === -1 &&
                sourceValue.indexOf('.gif') === -1 &&
                sourceValue.indexOf('.ico') === -1 &&
                sourceValue.indexOf('.woff') === -1 &&
                sourceValue.indexOf('.woff2') === -1 &&
                sourceValue.indexOf('.ttf') === -1 &&
                sourceValue.indexOf('.eot') === -1 &&
                sourceValue.indexOf('!') === -1) {
                const importedFilename = path.basename(sourceValue).split('.')[0];

                Object.keys(node.specifiers).map((j) => {
                  if (!process.jsxDocs[sourceFilename]) { return false; }
                  if (sourceFilename === importedFilename) { return false; }

                  if (node.specifiers[j].type === 'ImportDefaultSpecifier') {
                    // Direct import of element
                    const importedElementName = node.specifiers[j].local.name;
                    // if (process.jsxDocs[sourceFilename].uses[importedElementName]) { return false; }
                    if (importedElementName === importedFilename ) {
                      process.jsxDocs[sourceFilename].Using[importedElementName] = {
                        tagPath: sourceValue,
                        tagType: 'root',
                        tagLevel: getAtomicLevel(sourceValue)
                      };
                    }
                  }

                  if (node.specifiers[j].type === 'ImportSpecifier') {
                    // Mupltiple import of element and sub elements
                    const importedElementName = node.specifiers[j].imported.name;
                    // if (process.jsxDocs[sourceFilename].uses[importedElementName]) { return false; }
                    if (importedElementName === importedFilename) {
                      process.jsxDocs[sourceFilename].Using[importedElementName] = {
                        tagPath: sourceValue,
                        tagType: 'root',
                        tagLevel: getAtomicLevel(sourceValue)
                      };
                    } else {
                      process.jsxDocs[sourceFilename].Using[importedElementName] = {
                        tagPath: sourceValue,
                        tagType: 'sub',
                        tagLevel: getAtomicLevel(sourceValue)
                      };
                    }
                  }

                  return false;
                });
              }

              return false;
            });
          }
        },
        CallExpression: (ast) => {
          /* Capture getExample() usage metrics */
          if (ast.node.callee) {
            if (ast.node.callee.property) {
              if (ast.node.callee.property.name === 'getExample') {
                if (ast.node.arguments) {
                  const sourceFilename = path.basename(ast.hub.file.opts.filename).split('.')[0];

                  const reusedExampleFileName = ast.node.arguments[0].name;
                  const resuedExampleIndex = ast.node.arguments[1].value;

                  process.jsxDocs[sourceFilename].Reusing[reusedExampleFileName] = {
                    exampleIndex: resuedExampleIndex
                  }
                }
              }
            }
          }
        },
        ExportDefaultDeclaration: (ast) => {
          /* Captures element's example.jsx file metrics */
          const { filename } = ast.hub.file.opts;
          if (filename.indexOf('.example') !== -1) {
            const elementName = path.basename(filename).split('.')[0];
            if (process.jsxDocs[elementName]) {
              process.jsxDocs[elementName].Examples = ast.node.declaration.elements[0].properties[0].value.elements.length;
            }
          }
        }
      })
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

    this.excludes = ['node_modules', 'example.jsx', 'test.jsx', '!', 'guide'];
    this.includes = ['js', 'jsx', 'css', 'svg', 'jpg', 'png', 'gif', 'atoms', 'molecules', 'modifiers', 'organisms'];
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
          this.stats.js = [];
          this.stats.css = process.cssMetrics;

          const source = `
            var __stats__ = ${JSON.stringify(this.stats)};
            var __esDocs__ = ${JSON.stringify(process.esDocs)};
            var __jsxDocs__ = ${JSON.stringify(process.jsxDocs)};
            \n ${compilation.assets[i].source()};
          `;

          compilation.assets[i] = {
            source: function () {
              return source;
            },
            size: function () {
              return source.length;
            }
          };
        }
      });
    });
  }
}

module.exports = {
  JSXDocs,
  ESDocs,
  Bundle
};
