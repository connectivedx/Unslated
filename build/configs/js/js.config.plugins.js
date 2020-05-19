/*
  Here lives all of Unslated's custom Webpack plugins.
  Please note, the majority of plugins have been hand crafted to be ran under a abstract syntax tree.
*/
const path = require('path');
const { parse, walk, find } = require('abstract-syntax-tree');
const fs = require('fs');

/*
  Helper plugin to compile our project metric stats into guide.js
*/

class MetricsBundle {
  constructor() {
    this.stats = this.setMetricsObject();
    this.excludes = ['node_modules', '!', 'jsx', 'guide'];
    this.includes = ['js', 'css', 'svg', 'jpg', 'png', 'gif', 'atoms', 'molecules', 'modifiers', 'organisms'];
  }

  setMetricsObject(options = { reset: false }){
    const metrics = {
      files: [],
      css: [],
      js: {
        const: 0,
        lets: 0,
        methods: {
          all: 0,
          functions: 0,
          arrows: 0
        },
        expressions: {
          all: 0,
          assignments: 0,
          calls: 0,
          members: 0
        }
      },
    };

    if (options.reset) {
      metrics.files = this.stats.files;
    }

    return metrics;
  }

  filter(url) {
    if (!this.excludes.some(substring => url.includes(substring))) {
      if (this.includes.some(substring => url.includes(substring))) {
        return true;
      }
    }

    return false;
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('StatsCompile', (factory) => {
      factory.hooks.module.tap('StatsCompile', (module) => {
        const url = module.userRequest;
        if (this.filter(url)) {
          this.stats.files.push({
            'name': module.userRequest.replace(path.resolve(__dirname, '../../../'), ''),
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
          if (this.filter(i)) {
            this.stats.files.push({
              "name": i,
              "size": asset._source.children.join('').length
            });
          }
        }
      });
    });

    compiler.hooks.emit.tap('StatsCompile', (compilation) => {
     // Explore each chunk (build output):
      compilation.chunks.forEach(chunk => {
        // Explore each module within the chunk (built inputs):
        chunk.getModules().forEach(module => {
          if (module.userRequest) {
            if (module.userRequest.indexOf('.container.js') !== -1) {
              try {
                const ast = parse(module._source._value);
                const variables = find(ast, 'VariableDeclaration');              // const i = 1; let i = 1;
                const arrowMethods = find(ast, 'ArrowFunctionExpression');       // () => {}
                const functionMethods = find(ast, 'FunctionExpression');         // function() {}
                const AssignmentExpressions = find(ast, 'AssignmentExpression'); // i = 1; i++; i += 1;
                const CallExpressions = find(ast, 'CallExpression');             // func();
                const MemberExpressions = find(ast, 'MemberExpression')          // some.method();


                Object.keys(variables).map((i) => {
                  if (variables[i].kind === 'let') { this.stats.js.lets++; }
                  if (variables[i].kind === 'const') { this.stats.js.const++; }
                });

                this.stats.js.methods.all += arrowMethods.length + functionMethods.length;
                this.stats.js.methods.functions += functionMethods.length;
                this.stats.js.methods.arrows += arrowMethods.length;
                this.stats.js.expressions.all += (AssignmentExpressions.length + CallExpressions.length + MemberExpressions.length);
                this.stats.js.expressions.assignments += AssignmentExpressions.length;
                this.stats.js.expressions.calls += CallExpressions.length;
                this.stats.js.expressions.members += MemberExpressions.length;
              } catch (err) {
                // console.log(err);
              }
            }
          }
        });
      });

      Object.keys(compilation.assets).map((i) => {
        if (i.indexOf('guide.js') !== -1) {

          this.stats.css = JSON.parse(global.cssMetrics);
          const source = `var __stats__ = ${JSON.stringify(this.stats)};\n ${compilation.assets[i].source()}`;

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

      this.stats = this.setMetricsObject({ reset: true });
    });
  }
}

module.exports = {
  MetricsBundle
};
