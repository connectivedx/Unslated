/*
  Here lives all of Unslated's custom Webpack plugins.
  Please note, the majority of plugins have been hand crafted to be ran under a abstract syntax tree.
*/

const fs = require('fs');
const path = require('path');
const { declare } = require('@babel/helper-plugin-utils');

const MetricsJS = declare((api, opts) => {
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
    name: "metrics-bundle",
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
  Helper plugin to compile our project metric stats into guide.js
*/
class MetricsBundle {
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
          const source = `var __stats__ = ${JSON.stringify(this.stats)};\n ${compilation.assets[i].source()}`;

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
  MetricsJS,
  MetricsBundle
};
