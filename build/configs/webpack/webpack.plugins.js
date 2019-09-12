/*
  Here lives all of Unslated's core custom webpack plugins.
  Please note these plugins use the latest ^4.X tap plugin compiler and complation hooks. (see: https://webpack.js.org/api/compiler-hooks/)
*/
const fs = require('fs-extra');
const path = require('path');
const Package = require('../../../package.json');
const { parse } = require('node-html-parser');
const ReactDOMServer = require('react-dom/server');

/*
  Helper plugin to do static exports of examples
*/
class StaticBundle {
  constructor() {
    this.entryFile = path.resolve(__dirname, '../../../node_modules/.bin/unslated.static.js');
  }

  getSourcePath(name, compilation) {
    const modules = compilation.modules;
    let path = '';
    Object.keys(modules).map((i) => {
      if (!modules[i].resource) { return false; }
      if (modules[i].resource.indexOf(name) !== -1) {
        path = modules[i].resource;
      }
    });

    return path.replace(/\\/g, '/').split('/src')[1];
  }

  writeHtmlFile(example, compilation) {
    const Html = ReactDOMServer
      .renderToStaticMarkup(example.source)
      .replace(/is="sly"/g, '')
      .replace(/data-sly-unwrap=""/g, 'data-sly-unwrap')
      .replace(/></g, '>\r<')
      .replace(/&quot;/g, '"')
      .replace(/&#34;/g, '"')
      .replace(/&#x27;/g, '\'')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, '\'')
      .replace(/&gt;/g, '>');
      const DOM = parse(Html);

    // Remove any elements flagged to NOT be rendered in production views
    if (DOM.querySelector('[data-sly-exports="false"]')) {
      const nodes = DOM.querySelectorAll('[data-sly-exports="false"]');
      let nodeLength = nodes.length;
      while (nodeLength--) {
        nodes[nodeLength].childNodes = [];
        nodes[nodeLength].tagName = '';
      }
    }

    if (DOM.querySelector('[data-sly-exports="true"]')) {
      const nodes = DOM.querySelectorAll('[data-sly-exports="true"]');
      let nodeLength = nodes.length;
      while (nodeLength--) {
        nodes[nodeLength].tagName = '';
      }
    }

    fs.writeFile(
      path.resolve(__dirname, `../../../${Package.statics.dest}/${example.staticPath}`),
      `<!--/* DO NOT EDIT!!! -- THIS FILE IS AUTO GENERATED -- DO NOT EDIT!!! */-->\n<!--/* (see: ${this.getSourcePath(example.name, compilation)}) */-->\n${DOM.toString()}`,
      (e) => {
        if (e) {
          return false;
        }
      }
    );
  }

  apply(compiler) {
    // After emitting static.js, lets load it up and loop over examples to export
    compiler.hooks.afterEmit.tap('StaticBundle', (compilation) => {
      require(this.entryFile); // require bundled version of entry file

      Object.keys(global.components).map((i) => {
        const example = global.components[i];
        if (example.staticPath) {
          example.staticPath = example.staticPath.replace(/\\/g, '/');
          const fileless = example.staticPath.substring(0, example.staticPath.lastIndexOf("/"));
          const dest = path.resolve(__dirname, `../../../${Package.statics.dest}${fileless}`).replace(/\\/g, '/');

          fs.ensureDirSync(dest);
          this.writeHtmlFile(example, compilation);
        }
      });
    });

    // Cleanup ./dist/static.js bundle leftover file
    compiler.hooks.done.tap('StaticBundle', (compilation) => {
      fs.unlink(
        this.entryFile,
        (staticErr) => {
          if (staticErr) { console.log(staticErr); }
        }
      );
    });
  }
}

/*
  Helper plugin to compile our project metric stats into guide.js
*/
class MetricsBundle {
  constructor () {
    this.stats = {
      builds: {
        count: 0,
        errors: 0,
        time: 0
      },
      data: []
    };

    this.excludes = ['node_modules', '!', 'jsx', 'guide'];
    this.includes = ['js', 'css', 'svg', 'jpg', 'png', 'gif', 'atoms', 'molecules', 'modifiers', 'organisms'];
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
          this.stats.data.push({
            "name": module.userRequest.replace(path.resolve(__dirname, '../../../'), ''),
            "size": fs.statSync(module.userRequest)['size']
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
            this.stats.data.push({
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
          const source = `var __stats__ = ${JSON.stringify(this.stats)};\n ${compilation.assets[i].source()}`;
          compilation.assets[i] = {
            source: function () {
              return source;
            },
            size: function () {
              return source.length;
            }
          }
        }
      });
    });
  }
}

/*
  Helper plugin to copy production builds to configured output location
*/

class WebpackHooks {
  constructor(hooks) {
    this.hooks = hooks;
  }

  apply(compiler) {
    Object.keys(this.hooks).map((i) => {
      compiler.hooks[i].tap('WebpackHooks', (data) => {
        this.hooks[i]();
      });
    });
  }
}

module.exports = {
  StaticBundle,
  MetricsBundle,
  WebpackHooks,
};
