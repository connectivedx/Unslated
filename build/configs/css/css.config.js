/*
  Main configuration entry for all CSS files.
  Please note, all CSS code is ran through postcss and postcss plugins.

  Two phases to CSS bundling, preBundle and postBundle. Some postcss plugins like importing and exporting
  happen at preBundle (file by file), while other postcss plugins get ran at the postBundle phase (bundled sheet).
*/

const path = require('path');
const POSTCSSConfig = require('./css.postcss.config.js');
const WebpackPlugins = require('../webpack/webpack.plugins.js');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// all css files get ran through these processes
module.exports = {
  config: [{
    'test': /\.css$/,
    'use': [
      MiniCssExtractPlugin.loader, // (see: https://www.npmjs.com/package/mini-css-extract-plugin)
      {
        'loader': 'css-loader', // (see: https://www.npmjs.com/package/css-loader)
        'options': {}
      }, {
        'loader': 'postcss-loader', // (see: https://www.npmjs.com/package/postcss-loader)
        'options': {
          'ident': 'postcss',
          'plugins': (loader) => [
            ...POSTCSSConfig.preBundle
          ]
        }
      }
    ]
  }],
  plugins: [
    new StyleLintPlugin({
      files: `./src/elements/**/**/*.css`,
      configFile: path.resolve(__dirname, '.csslintrc')
    }),
    new WebpackPlugins.ProcessCSSPostBundle(),  // after bundle created, run postcss plugins.
    new MiniCssExtractPlugin({                  // used to compile our css file.
      filename: `.${global.directories.assetPath}/css/[name].css`,
      chunkFilename: './[name].css'
    })
  ]
};
