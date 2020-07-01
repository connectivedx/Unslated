/*
  Here lives all of Unslated's custom Webpack plugins.
  Please note, the majority of plugins have been hand crafted to be ran under a abstract syntax tree.
*/

const fs = require('fs');
const path = require('path');
const { declare } = require('@babel/helper-plugin-utils');
const types = require('@babel/types');
const traverse = require('@babel/traverse').default;

const getElementName = (pathing) => path.basename(path.resolve(__dirname, pathing)).split('.')[0];


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

  const getMethodParams = (containers) => (containers)
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

  return {
    name: 'JSXDocs',
    pre(state) {},
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
              Tags: {},
              Using: {}
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
        }
      })
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

const JSXMetrics = declare((api, opts) => {
  process.jsxMetricsReset = () => {
    return {
      elements: {
        all: 0,
        root: 0,
        sub: 0
      },
      props: {
        all: 0,
        string: 0,
        element: 0,
        func: 0,
        node: 0,
        oneOf: 0,
        oneOfType: 0,
        isRequired: 0
      },
      usage: {
        all: 0,       // total elements used within the project
        sub: 0,       // total sub elements being used
        root: 0,      // total main elements being used
        atoms: 0,     // total atom elements being used
        molecules: 0, // total molecule elements being used
        organisms: 0, // total organism elements being used
        templates: 0  // total template elements being used
      },
      examples: {
        all: 0,       // total examples within project
        exported: 0,  // total examples being exported to IO
        reused: 0,    // total examples being ran through Utils.getExample();
        atoms: 0,     // total atom examples
        molecules: 0, // total molecule examples
        organisms: 0, // total organism examples
        templates: 0  // total template examples
      }
    }
  };

  process.jsxMetrics = process.jsxMetricsReset();

  // https://babeljs.io/docs/en/6.26.3/babel-types for all available babel AST types
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
    name: 'JSXMetrics',
    visitor: {
      Program(ast, file) {
        this.cache++;
      },
      Class(ast, file) {
        if (ast.node.superClass.object.name === 'React') {
          const fileName = getElementName(file.filename);
          const elementName = ast.node.id.name;
          const classProperties = ast.node.body.body;
          const props = getPropTypes(classProperties, elementName);

          process.jsxMetrics.elements.all++;

          if (fileName === elementName) {
            process.jsxMetrics.elements.root++;
          } else {
            process.jsxMetrics.elements.sub++;
          }

          process.jsxMetrics.props.all += props.length;

          Object.keys(props).map((i) => {
            if (props[i].type === 'string') {
              process.jsxMetrics.props.string++;
            }
            if (props[i].type === 'element') {
              process.jsxMetrics.props.element++;
            }
            if (props[i].type === 'function') {
              process.jsxMetrics.props.func++;
            }
            if (props[i].type === 'node') {
              process.jsxMetrics.props.node++;
            }
            if (props[i].type === 'oneOf') {
              process.jsxMetrics.props.oneOf++;
            }
            if (props[i].type === 'oneOfType') {
              process.jsxMetrics.props.oneOfType++;
            }
            if (props[i].type === 'isRequired') {
              process.jsxMetrics.props.isRequired++;
            }
          });

          /*// If you build it, they will come.
          if (!process.jsxDocs[getElementName(file.filename)]) {
            process.jsxDocs[getElementName(file.filename)] = {};
          }

          process.jsxDocs[getElementName(file.filename)][elementName] = {
            description: getComment(ast.container),
            props: getPropTypes(classProperties, elementName)
          };*/
        }
      },
      Declaration(ast, file) {
        if (types.isImportDeclaration(ast)) {
          const value = ast.node.source.value.toLowerCase();
          if (
            value.indexOf('.css') === -1
            && value.indexOf('.js') === -1
            && value.indexOf('.container') === -1
            && value.indexOf('.example') === -1
          ) {
            // Determins used element types and levels (root or sub and atomic levels)
            Object.keys(ast.container).map((i) => {
              const node = ast.container[i];
              const sourceFilename = path.basename(ast.hub.file.opts.filename).split('.')[0];
              if (ast.hub.file.opts.filename.indexOf('guide') !== -1) { return false; }

              if (node.type === 'ImportDeclaration' && sourceFilename.indexOf('@guide') === -1) {
                if (node.source) {
                  const sourceValue = node.source.value;
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
                      if (node.specifiers[j].type === 'ImportDefaultSpecifier') {
                        // Direct import of element
                        const importedElementName = node.specifiers[j].local.name;
                        if (importedElementName === importedFilename) {
                          process.jsxMetrics.usage.root++;
                        }
                      }

                      if (node.specifiers[j].type === 'ImportSpecifier') {
                        // Mupltiple import of element and sub elements
                        const importedElementName = node.specifiers[j].imported.name;
                        if (importedElementName === importedFilename) {
                          process.jsxMetrics.usage.root++;
                        } else {
                          process.jsxMetrics.usage.sub++;
                        }
                      }

                      if (['ImportDefaultSpecifier', 'ImportSpecifier'].indexOf(node.specifiers[j].type) !== -1) {
                        process.jsxMetrics.usage.all++;

                        if (value.indexOf('atoms') !== -1) {
                          process.jsxMetrics.usage.atoms++;
                        }

                        if (value.indexOf('molecules') !== -1) {
                          process.jsxMetrics.usage.molecules++;
                        }

                        if (value.indexOf('organisms') !== -1) {
                          process.jsxMetrics.usage.organisms++;
                        }

                        if (value.indexOf('templates') !== -1) {
                          process.jsxMetrics.usage.templates++;
                        }
                      }
                    });
                  }
                }
              }
            });
          }
        }
      },
      Expression(ast, file) {
        if (ast.node.name === 'Utils') {
          if (ast.container.property.name.indexOf('getExample') !== -1) {
            process.jsxMetrics.examples.reused++;
          }
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
          this.stats.js = process.jsMetrics;
          this.stats.jsx = process.jsxMetrics;
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

          // The great memory leak prevention reset (DO NOT REMOVE!)
          process.jsMetrics = process.jsMetricsReset();
          process.jsxMetrics = process.jsxMetricsReset();
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
  JSXMetrics,
  Bundle
};
