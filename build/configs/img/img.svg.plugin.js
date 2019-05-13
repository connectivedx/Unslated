const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const generateHash = () => crypto.createHash('md5').update(new Date().toLocaleTimeString()).digest('hex');

// manaul re-trigger of webpack-dev-server after having deleted an element
const triggerRebuild = () => {
  fs.readFile(path.resolve(__dirname, '../../../src/elements/atoms/Root/Root.css'), 'utf8', (err, data) => {
    if (err) throw err;
    fs.writeFile (path.resolve(__dirname, '../../../src/elements/atoms/Root/Root.css'), data, (err) => {
      if (err) throw err;
    });
  });
};

const recursiveSubStringReplace = (source, pattern, replacement) => {
  const recursiveReplace = (objSource) => {
    if (typeof objSource === 'string') {
      return objSource.replace(pattern, replacement);
    }
    if (typeof objSource === 'object') {
      if (objSource === null) {
        return null;
      }
      Object.keys(objSource).forEach(function (property) {
        objSource[property] = recursiveReplace(objSource[property]);
      });
      return objSource;
    }
  }

  return recursiveReplace(source);
};

// this.options.filename.replace(/iconset-(.*)\.svg/g, this.newHash)
const bundleResults = (compilation, filename, symbols) => compilation.assets[filename] = {
  source: () => `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute; width: 0; height: 0">${symbols}</svg>`,
  size: () => symbols.length
};

class WebpackSvgSpritely {
  constructor(options) {
    this.options = options;
    this.outputOptions;
    this.newHash;
    this.icons = [];
    this.symbols;
  }

  apply(compiler) {
    compiler.hooks.emit.tap('WebpackSvgSpritely', compilation => {
      // reset variables
      this.newHash = ['iconset-', generateHash(), '.svg'].join(''); // in with the new
      this.symbols = '';

      // Grab a collection of icons based on filters option
      this.icons = Object.keys(compilation.modules).map(j => {
        const path = compilation.modules[j].resource;
        if (!path) { return; }
        if (path.indexOf('Icon') !== -1
          && path.indexOf('assets') !== -1
          && path.indexOf('.svg') !== -1
        ) {
          let name = path.replace(/\\/g, '/');
          const parts = name.split('/');
          name = parts[parts.length - 1];
          name = name.split('.')[0];
          return {
            name,
            path
          };
        }
      }).filter((n) => n);

      // Use found icons above to collect svg into symbols
      this.symbols = Object.keys(compilation.assets).map(i => {
        // update hash in assets.js (replaces hash used in src/elements/atoms/Icon/Icon.Container.js)
        if(i.indexOf('assets-') !== -1 || i.indexOf('assets.js') !== -1) {
          // Reach into bundle and replace instance of iconset-[hash] with actual bundle hash (works under both dev and prod builds)
          recursiveSubStringReplace(compilation.assets[i], /iconset-(.*)\.svg/g, this.newHash);

          // We have cached development source ._cachedSource. (not in my house!)
          if (compilation.assets[i]._cachedSource) {
            triggerRebuild();
          }
        }

        // Convert raw svg source into symbols for sprite
        let collection = '';
        Object.keys(this.icons).map(k => {
          if (i.indexOf('.svg') === -1) { return; } // only intrested in svg assets
          const iconName = this.icons[k].name;
          const assetName = i.split('/')[i.split('/').length - 1].replace(/(.*)\.(.*)/, '$1');
          if (assetName === iconName) {
            if (!compilation.assets[i]._value) { return; }
            let contents = compilation.assets[i]._value.toString('utf8');
            contents = contents.replace(/<svg/g, '<symbol id="icon-'+this.icons[k].name+'"');
            contents = contents.replace(/<\/svg>/g, '</symbol>');
            contents = contents.replace('xmlns="http://www.w3.org/2000/svg"', '');
            contents = contents.replace(/<style>(.*)<\/style>/g, '<style><![CDATA[$1]]></style>');
            if (!contents) { return; }
            collection += contents;
          }
        }).filter((n) => n);

        return collection;
      }).filter((n) => n);

      bundleResults(
        compilation,
        this.options.filename.replace(/iconset-(.*)\.svg/g, this.newHash),
        this.symbols
      );
    });
  }
}

module.exports = WebpackSvgSpritely;
