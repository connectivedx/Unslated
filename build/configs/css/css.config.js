const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcss = require('./css.postcss.config.js');
const package = require('../../../package.json');

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
            ...postcss.plugins
          ]
        }
      }
    ]
  }, {
    'test': /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    'loader': 'file-loader',
    'options': {
      'name': '[name].[ext]',
      'outputPath': ['.', package.directories.assetPath, '/fonts/'].join('')
    }
  }],
  plugins: [
    new MiniCssExtractPlugin({ // used to compile our css file.
      filename: ['.', package.directories.assetPath, '/css/[name].css'].join(''),
      chunkFilename: './[name].css'
    })
  ]
};
