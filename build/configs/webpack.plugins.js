/*
  Here lives all of Unslated's core custom webpack plugins.
  Please note these plugins use the latest ^4.X tap plugin compiler and complation hooks. (see: https://webpack.js.org/api/compiler-hooks/)
*/
const fs = require('fs');
const path = require('path');
const Package = require('../../package.json');
const POSTCSS = require('postcss');
const POSTCSSPlugins = require('./css/css.postcss.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pretty = require('pretty');
const docgen = require('react-docgen');
const ReactDOMServer = require('react-dom/server');

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

  apply(compiler) {
    // Now we hook into our global.components object we made in our entry file (see: build/static.jsx)
    compiler.hooks.afterEmit.tap('StaticBundle', (compilation) => {
      require('../../dist/static.js'); // require bundled version of entry file
      const components = global.components; // grab global compontents object we hoisted in our entry file (see: build/static.jsx)

      Object.keys(components).map((i) => {
        const example = components[i];
        if (example.staticPath) {
          // first make static dest directories (if not already)
          const filelessPath = example.staticPath.substring(0, example.staticPath.lastIndexOf("/"));
          const pathArray = path.resolve(__dirname, `../../${Package.statics.dest}/${filelessPath}`).split('/');
          let pathBuildup = '';

          for (let i = 0; i < pathArray.length; i++) {
            pathBuildup += `/${pathArray[i]}`;
            if (!fs.existsSync(pathBuildup)){
              fs.mkdirSync(pathBuildup);
            }
          }

          // second write files to newly created dest directories
          fs.writeFile(
            `${Package.statics.dest}/${example.staticPath}`,
            pretty(`
              <!-- DO NOT EDIT!!! -- THIS FILE IS AUTO GENERATED -- DO NOT EDIT!!! -->

              ${ReactDOMServer.renderToStaticMarkup(example.source)}
            `),
            (e) => {
              if (e) {
                return false;
              }
          });
        }
      });
    });

    // Cleanup ./dist/static.js bundle leftover file
    compiler.hooks.done.tap('StaticBundle', (compilation) => {
      if (this.buildType === 'production') {
        fs.unlink(path.resolve(__dirname, '../../dist/static.js'), (err) => { if (err) { console.log(err); }});
      }
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
              object[i].indexOf('sync') !== -1) {
                delete parent[index]; // if found to still true, we delete it.
          }
        }else if (typeof object[i] === 'object') {
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
        chunks: this.filterStats(stats.toJson().chunks, this.chunkFilters)
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
            this.guideSource = complation.assets[i]._value;
          }
        });
      });

      // Injects latest build stats to guide.js
      compiler.hooks.done.tap({name:'StatsCompile'}, stats => {
        this.writeStats(
          `${Package.directories.dest}${Package.directories.assetPath}/js/guide.js`,
          stats,
          this.guideSource
        );
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
            data.html = data.html.replace('<script', '<script src="/node_modules/.bin/webpack.stats.js"></script><script');
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
