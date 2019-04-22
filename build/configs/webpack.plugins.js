/*
  Here lives all of Unslated's core webpack custom plugins.
  Please note these plugins use the latest ^4.X tap plugin compiler and complation hooks. (see: https://webpack.js.org/api/compiler-hooks/)
*/
const POSTCSS = require('postcss');
const POSTCSSPlugins = require('./css/css.postcss.config.js');


/*
  POSTCSS's postBundle plugins to bundled guide.css and asset.css files
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

module.exports = {
  ProcessCSSPostBundle: ProcessCSSPostBundle
};
