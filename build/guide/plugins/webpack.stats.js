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

const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Global object that continues to be updated across builds until webpack-dev-server has been shut down.
const buildStats = {
  time: 0,
  count: 0,
  errors: 0
};

// Helper method used to help filter away large sections of unwanted stats data.
const filterStats = (object, filters, index, parent) => {
  // simple try catch to prevent killing
  // build processes before or after this plugin
  try {
    for(i in object) {
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
        filterStats(object[i], filters, i, object); //if after all the above we still find object, we continue.
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
};

class StatsCompile {
  constructor (buildType) {
    this.buildType = buildType;
    this.guideSource = {};

    this.assetFilters = ['chunks', 'chunkNames', 'emitted'];
    this.chunkFilters = ['id', 'identifier', 'issuer', 'issuerName', 'issuerPath', 'issuerId', 'reasons', 'chunks', 'parents', 'siblings', 'children', 'childrenByOrder', 'failed', 'depth', 'optimizationBailout', 'providedExports', 'warnings', 'errors', 'prefetched', 'built', 'index', 'index2', 'source', 'usedExports', 'origins', 'filteredModules'];
  }

  // Helper method to write our stats into guide.js or middle man webpack.stats.js
  writeStats(path, stats, source) {
    buildStats.count++; // increase our global build count
    buildStats.time = stats.toJson().time; // capture current build's bundle time

    if (stats.hasErrors()) {
      buildStats.errors++;
    }

    fs.writeFile(path, 
      'var __stats__ = ' + JSON.stringify({
        builds: { ...buildStats },
        assets: filterStats(stats.toJson().assets, this.assetFilters),
        chunks: filterStats(stats.toJson().chunks, this.chunkFilters)
      }) + ';' + source,
    (err) => { if (err) { console.log(err); } });
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
        this.writeStats('./dist/assets/js/guide.js', stats, this.guideSource);
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
      compiler.hooks.done.tap({name:'StatsCompile'}, stats => {
        this.writeStats('./node_modules/.bin/webpack.stats.js', stats);
      });
    }
  }
}

module.exports = StatsCompile;