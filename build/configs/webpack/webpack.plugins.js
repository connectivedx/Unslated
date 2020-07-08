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
      path.resolve(__dirname, `../../../${Package.statics.dest}/${example.exports}`),
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
        if (example.exports) {
          example.exports = example.exports.replace(/\\/g, '/');
          const fileless = example.exports.substring(0, example.exports.lastIndexOf("/"));
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
  WebpackHooks,
};
