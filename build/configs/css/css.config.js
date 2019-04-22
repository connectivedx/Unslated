const WebpackPlugins = require('../webpack.plugins.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const POSTCSSConfig = require('./css.postcss.config.js');
const Package = require('../../../package.json');

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
    new WebpackPlugins.ProcessCSSPostBundle(),  // after bundle created, run postcss plugins.
    new MiniCssExtractPlugin({                  // used to compile our css file.
      filename: `.${Package.directories.assetPath}/css/[name].css`,
      chunkFilename: './[name].css'
    })
  ]
};
