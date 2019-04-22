/*
  Here lives all of Unslated's core webpack custom plugins.
  Please note these plugins use the latest ^4.X tap plugin compiler and complation hooks. (see: https://webpack.js.org/api/compiler-hooks/)
*/
const fs = require('fs');
const _package = require('../../package.json');
const path = require('path');
const postcss = require('postcss');
const POSTCSSConfig = require('./css/css.postcss.config.js');


/*
  POSTCSS's postBundle plugins to bundled guide.css and asset.css files
*/
class ProcessCSSPostBundle {
  constructor () {
  }

  process(file) {
    const path = `${_package.directories.dest}${_package.directories.assetPath}/css/${file}.css`;
    fs.readFile(path, {encoding: 'utf8'}, (err, contents) => {
      contents = contents.replace(/\\/g, '');
      postcss([...POSTCSSConfig.postBundle])
        .process(contents, {
          from: path,
          to: path
        })
        .then(result => {
          fs.writeFile(path, result.css, () => true)
        })
    });
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('ProcessCSSPostBundle', compilation => {
      this.process('assets');
      this.process('guide');
    });
  }
}

module.exports = {
  ProcessCSSPostBundle: ProcessCSSPostBundle
};
