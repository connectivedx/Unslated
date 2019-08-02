/*
  Here lives all of Unslated's core custom webpack plugins.
  Please note these plugins use the latest ^4.X tap plugin compiler and complation hooks. (see: https://webpack.js.org/api/compiler-hooks/)
*/
const fs = require('fs-extra');
const path = require('path');
const rimraf = require("rimraf");
const pretty = require('pretty');
const docgen = require('react-docgen');
const Package = require('../../../package.json');
const POSTCSS = require('postcss');
const { parse } = require('node-html-parser');
const POSTCSSPlugins = require('../css/css.postcss.config.js');
const ReactDOMServer = require('react-dom/server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let findAllComponentDefinitions = require('react-docgen/dist/resolver/findAllComponentDefinitions');
if ( findAllComponentDefinitions.hasOwnProperty('default') ) {
  findAllComponentDefinitions = findAllComponentDefinitions.default
}

/*
  Helper plugin to process css files after being combined by mini-css-extract-plugin
*/
class ProcessCSSPostBundle {
  constructor () {
  }

  process(children, callback) {
    const collection = Object.keys(children).map((j) => {
      let child = children[j];
      if (typeof child === 'object') {
        return child._value;
      }
      return child;
    }).join('');

    return POSTCSS([...POSTCSSPlugins.postBundle])
      .process(collection, {
        from: '',
        to: ''
      })
      .then(result => {
        callback(result.css);
      })
  }

  apply(compiler) {
    compiler.hooks.emit.tap('ProcessCSSPostBundle', compilation => {
      Object.keys(compilation.assets).map((i) => {
        if (i.indexOf('assets.css') !== -1 || i.indexOf('guide.css') !== -1) {
          this.process(compilation.assets[i]._source.children, (results) => {
            compilation.assets[i]._source.children = [results];
          });
        }
      });
    });
  }
}

class StaticBundle {
  constructor() {
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
      path.resolve(__dirname, `${Package.statics.dest}/${example.staticPath}`),
      pretty(`
        <!--/* DO NOT EDIT!!! -- THIS FILE IS AUTO GENERATED -- DO NOT EDIT!!! */-->
        <!--/* (see: ${this.getSourcePath(example.name, compilation)}) */-->

        ${DOM.toString()}
      `),
      (e) => {
        if (e) {
          return false;
        }
      }
    );
  }

  apply(compiler) {
    // Now we hook into our global.components object we made in our entry file (see: build/static.jsx)
    compiler.hooks.afterEmit.tap('StaticBundle', (compilation) => {
      require(path.resolve(__dirname, `${Package.statics.dest}/static.js`)); // require bundled version of entry file

      Object.keys(global.components).map((i) => {
        const example = global.components[i];
        if (example.staticPath) {
          // first make static dest directories (if not already)
          example.staticPath = example.staticPath.replace(/\\/g, '/');

          const fileless = example.staticPath.substring(0, example.staticPath.lastIndexOf("/"));
          const dest = path.resolve(__dirname, `${Package.statics.dest}${fileless}`).replace(/\\/g, '/');

          fs.ensureDirSync(dest);

          // second write files to newly created dest directories
          this.writeHtmlFile(example, compilation);
        }
      });
    });

    // Cleanup ./dist/static.js bundle leftover file
    compiler.hooks.done.tap('StaticBundle', (compilation) => {
      fs.unlink(
        path.resolve(__dirname,
        `./${Package.statics.dest}/static.js`),
        (staticErr) => {
          if (staticErr) { console.log(staticErr); }
          rimraf(path.resolve(__dirname, `./${Package.statics.dest}/img/`), (imgErr) => {
            if (imgErr) { console.log(imgErr); }
          });
        }
      );
    });
  }
}

/**
  This plugin takes webpack's stats data object and injects it
  into Unslates workflow. (see: https://webpack.js.org/api/stats/)

  Because Webpack only offers the stats data object inside the 'done' tap hook; production and development builds
  have their own method at bringing in stats.

  PRODUCITON BUILDS:
  1) Capture guide.js bundled contents into class variable.
  2) Hook into webpack 'done', and filter down/inject stats object into guide.js

  DEVELOPMENT BUILDS
  1) Inject script block into index.html that points to emitted stats.js file under node_modules/.bin/
  2) Hooks into webpack 'done', and filters down/writes stats object out to node_modules/.bin/webpack.stats.js

  (Because we don't run watch in unslated, we don't have the opportunity to hook into webpack-dev-server's memory
  and inject stats object into guide.js, thus DEVELOPMENT builds must use a disk file as outlined above.)
*/
class StatsBundle {
  constructor (buildType) {
    this.buildType = buildType;
    this.guideSource = {};

    this.buildStats = {
      time: 0,
      count: 0,
      errors: 0
    };

    this.assetFilters = [
      'chunks',
      'chunkNames',
      'emitted'
    ];

    this.chunkFilters = [
      'id',
      'entry',
      'hash',
      'rendered',
      'initial',
      'cacheable',
      'optional',
      'identifier',
      'issuer',
      'issuerName',
      'issuerPath',
      'issuerId',
      'reasons',
      'chunks',
      'parents',
      'siblings',
      'children',
      'childrenByOrder',
      'failed',
      'depth',
      'optimizationBailout',
      'providedExports',
      'warnings',
      'errors',
      'prefetched',
      'built',
      'index',
      'index2',
      'source',
      'usedExports',
      'origins',
      'filteredModules'
    ];
  }

  filterStats(object, filters, index, parent) {
    // simple try catch to prevent killing
    // build processes before or after this plugin
    try {
      for(let i in object) {
        // if this object's key is a match for filters, we delete it.
        if (filters.includes(i)) {
          delete object[i];
        }

        // if this object is a string with a key of "name", we check it
        if (typeof object[i] === 'string' && i === 'name') {
          if (object[i].indexOf('node_module') !== -1 ||
            object[i].indexOf('(webpack)') !== -1 ||
            object[i].indexOf('sync') !== -1 ||
            object[i].indexOf('.jsx') !== -1 ||
            object[i].indexOf('.svg') !== -1 ||
            object[i].indexOf('.jpg') !== -1 ||
            object[i].indexOf('.gif') !== -1 ||
            object[i].indexOf('.png') !== -1 ||
            object[i].indexOf('.bmp') !== -1 ||
            object[i].indexOf('.json') !== -1 ||
            object[i].indexOf('.csv') !== -1 ||
            object[i].indexOf('.json') !== -1 ||
            object[i].indexOf('.css') !== -1
          ) {
            if (
              object[i].indexOf('css-loader') === -1 &&
              object[i].indexOf('postcss-loader') === -1
            ) {
              delete parent[index]; // if found to still true, we delete it.
            }
          }
        } else if (typeof object[i] === 'object') {
          this.filterStats(object[i], filters, i, object); //if after all the above we still find object, we continue.
        }
      }
    }
    catch (err) {
      console.log('Error in webpack stats plugin:');
      console.log(err);
    }

    // not all objects in the array are arrays, so object.splice vs. delete object was not an option.
    // so, lets clear out any `null` keys left over from delete usage.
    return JSON.parse(JSON.stringify(object).replace(/null,/g, '').replace(/,null/g, ''));
  }

  // Helper method to write our stats into guide.js or middle man webpack.stats.js
  writeStats(path, stats, source) {
    this.buildStats.count++; // increase our global build count
    this.buildStats.time = stats.toJson().time; // capture current build's bundle time

    if (stats.hasErrors()) {
      this.buildStats.errors++;
    }

    fs.writeFile(path,
      'var __stats__ = ' + JSON.stringify({
        builds: { ...this.buildStats },
        assets: this.filterStats(stats.toJson().assets, this.assetFilters),
        chunks: this.filterStats(stats.toJson().chunks[0], this.chunkFilters) // chunks[0] === assets and chunks[1] === guide
      }) + ';' + source,
    (err) => { if (err) { console.log(err); } return false; });
  }

  apply(compiler) {
    ///////////////////////
    // PRODUCTION BUILDS //
    ///////////////////////
    if (this.buildType === 'production') {
      // Get guide.js contents for later use
      compiler.hooks.afterEmit.tap({name:'StatsCompile'}, complation => {
        Object.keys(complation.assets).map(i => {
          if (i.indexOf('guide.js') !== -1) {
            if (Package.optimize.js) {
              this.guideSource = complation.assets[i]._value;
            }
            /*fs.writeFile(path.resolve(__dirname, '../../../dump.txt'), JSON.stringify(complation.assets[i]),
            (err) => { if (err) { console.log(err); } return false; });*/

          }
        });
      });

      // Injects latest build stats to guide.js
      compiler.hooks.done.tap({name:'StatsCompile'}, stats => {

        fs.readFile(`${global.directories.dest}${global.directories.assetPath}/js/guide.js`, 'utf8', (err, guideSource) => {
          this.writeStats(
            `${global.directories.dest}${global.directories.assetPath}/js/guide.js`,
            stats,
            guideSource
          );
        });
      });
    }

    ////////////////////////
    // DEVELOPMENT BUILDS //
    ////////////////////////
    if (this.buildType === 'development') {
      // Injects a /webpack.stats.js script block into HtmlWebpackPlugin index.html
      compiler.hooks.compilation.tap({name:'StatsCompile'}, (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
          'StatsCompile',
          (data, cb) => {
            data.html = data.html.replace('</head>', '<script src="/node_modules/.bin/webpack.stats.js"></script></head>');
            cb(null, data);
          }
        )
      });

      // Injects stats into middle man webpack.stats.js file
      compiler.hooks.done.tap({name:'StatsCompile'}, (stats) => {
        this.writeStats('./node_modules/.bin/webpack.stats.js', stats);
      });
    }
  }
}

module.exports = {
  StatsBundle,
  StaticBundle,
  ProcessCSSPostBundle
};
