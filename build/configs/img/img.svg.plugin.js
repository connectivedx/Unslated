const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const generateHash = () => crypto.createHash('md5').update(new Date().toLocaleTimeString()).digest('hex');

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
      this.newHash = ['iconset-', generateHash(), '.svg'].join('');

      // Grab a collection of icons based on filters option
      Object.keys(compilation.modules).map(j => {
        const resource = compilation.modules[j].resource;
        if (!resource) { return; }
        if (resource.indexOf('src') !== -1 && resource.indexOf('.svg') !== -1) {
          this.icons.push(resource.split('\\')[resource.split('\\').length - 1].split('.')[0]); // get filename off file path.
        }
      });

      // Use found icons above to collect svg into symbols
      Object.keys(compilation.assets).map(i => {
        // update hash in assets.js (replaces hash used in src/elements/atoms/Icon/Icon.Container.js)
        if(i.indexOf('assets-') !== -1 || i.indexOf('assets.js') !== -1) {
          if (compilation.assets[i]._value) {
            compilation.assets[i]._value = compilation.assets[i]._value.replace(/iconset-(.*)\.svg/g, this.newHash);
          }

          if (compilation.assets[i]._source) {
            Object.keys(compilation.assets[i]._source.children).map(j => {
              let child = compilation.assets[i]._source.children[j];
              if (typeof child !== 'string') {
                console.log('Production build?');
                if (!child._value) { return; }
                child._value = child._value.replace(/iconset-(.*)\.svg/g, this.newHash);        
              } else {
                console.log('Dev build?');
                child = child.replace(/iconset-(.*)\.svg/g, this.newHash);                            
              }
            });
          }
        }

        // Convert raw svg source into symbols for sprite
        Object.keys(this.icons).map(k => {
          if (i.indexOf('.svg') !== -1 && i.indexOf(this.icons[k]) !== -1) {
            if (!compilation.assets[i]._value) { return; }
            let contents = compilation.assets[i]._value.toString('utf8')
            contents = contents.replace(/<svg/g, '<symbol id="icon-'+this.icons[k]+'"');
            contents = contents.replace(/<\/svg>/g, '</symbol>');
            contents = contents.replace('xmlns="http://www.w3.org/2000/svg"', '');
            contents = contents.replace(/<style>(.*)<\/style>/g, '<style><![CDATA[$1]]></style>');
            if (!contents) { return; }
            this.symbols += contents;
          }
        });
      });

      compilation.assets[this.options.filename.replace(/iconset-(.*)\.svg/g, this.newHash)] = {
        source: () => '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute; width: 0; height: 0">'+this.symbols+'</svg>',
        size: () => this.symbols.length
      };
    });
  }
}

module.exports = WebpackSvgSpritely;
