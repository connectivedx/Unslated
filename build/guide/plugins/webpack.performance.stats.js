const fs = require('fs');
const Webpack = require('webpack');

const removeNulls = (obj) => {
  let isArray = obj instanceof Array;
  for (let k in obj){
    if (obj[k] === null) isArray ? obj.splice(k,1) : delete obj[k];
    else if (typeof obj[k] === 'object') removeNulls(obj[k]);
  }
};

const removeParts = (object, filters, index, parent) => {
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
        removeParts(object[i], filters, i, object); //if after all the above we still find object, we continue.
      }    
    }
  }
  catch (err) { 
    console.log('Error in webpack performance plugin:');
    console.log(err); 
  }

  // not all objects in the array are arrays, so object.splice vs. delete object was not an option.
  // so, lets clear out any `null` keys left over from delete usage.
  return JSON.parse(JSON.stringify(object).replace(/null,/g, ''));
};


class StatsPlugin {
  // Alex helps track down location of build errors.
  apply(compiler) {    
    compiler.hooks.done.tap({name:'StatsPlugin'}, stats => {
      fs.writeFile("./node_modules/.bin/webpack.stats.json", 
        JSON.stringify({
          assets: removeParts(stats.toJson().assets, ['chunks', 'chunkNames', 'emitted']),
          chunks: removeParts(stats.toJson().chunks, [
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
          ])
        }, null, 4)
      );
    });
  }
}

module.exports = StatsPlugin;