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
      this.icons = [];
      this.symbols = '';

      // Grab a collection of icons based on filters option
      Object.keys(compilation.modules).map(j => {
        const path = compilation.modules[j].resource;
        if (!path) { return; }
        let name = path.replace(/\\/g, '/');
        if (name.indexOf('Icon/assets') !== -1 && name.indexOf('.svg') !== -1) {
          name = name.split('/')[name.split('/').length - 1];
          name = name.split('.')[0];
          this.icons.push({
            name,
            path
          });
        }
      }).filter((n) => n);

      // Use found icons above to collect svg into symbols
      Object.keys(compilation.assets).map(i => {
        // update hash in assets.js (replaces hash used in src/elements/atoms/Icon/Icon.Container.js)
        if(i.indexOf('assets-') !== -1 || i.indexOf('assets.js') !== -1) {
          // Production builds runs with ._value
          if (compilation.assets[i]._value) {
            compilation.assets[i]._value = compilation.assets[i]._value.replace(/iconset-(.*)\.svg/g, this.newHash);
          }

          // Development builds runs with ._source
          if (compilation.assets[i]._source) {
            Object.keys(compilation.assets[i]._source.children).map(j => {
              let child = compilation.assets[i]._source.children[j];
              if (typeof child !== 'string') {
                if (!child._value) { return; }
                child._value = child._value.replace(/iconset-(.*)\.svg/g, this.newHash);
              } else {
                child = child.replace(/iconset-(.*)\.svg/g, this.newHash);
              }
            }).filter((n) => n);
          }

          // We have cached development source ._cachedSource... not in my house!
          if (compilation.assets[i]._cachedSource) {
            triggerRebuild();
          }
        }

        // Convert raw svg source into symbols for sprite
        Object.keys(this.icons).map(k => {
          if (i.indexOf('.svg') === -1) { return; } // only intrested in svg assets
          const iconName = this.icons[k].name;
          const assetName = i.split('/')[i.split('/').length - 1].replace(/(.*)\.(.*)/, '$1');
          if (assetName === iconName) {
            if (!compilation.assets[i]._value) { return; }
            let contents = compilation.assets[i]._value.toString('utf8');
            if (contents.indexOf('<style') !== -1) {
              console.warn('\x1b[40m');
              console.warn('\x1b[41m', `WARNING src/elements/atoms/Icons/assets/${assetName}.svg:\n<style> block found in this SVG file. Please relocate class based styles to inline attribute within svg file.`)
              console.warn('\x1b[40m');
            }
            contents = contents.replace(/<svg/g, '<symbol id="icon-'+this.icons[k].name+'"');
            contents = contents.replace(/<\/svg>/g, '</symbol>');
            contents = contents.replace('xmlns="http://www.w3.org/2000/svg"', '');
            contents = contents.replace(/<style>(.*)<\/style>/g, '<style><![CDATA[$1]]></style>');
            if (!contents) { return; }
            this.symbols += contents;
          }
        });
      }).filter((n) => n);

      compilation.assets[this.options.filename.replace(/iconset-(.*)\.svg/g, this.newHash)] = {
        source: () => `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute; width: 0; height: 0">${this.symbols}</svg>`,
        size: () => this.symbols.length
      };
    });
  }
}

module.exports = WebpackSvgSpritely;
