const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const package = require('../../../package.json');

// all html files get ran through these processes
module.exports = {
  config: [{
    'test': /\.html$/, // for .html files
    'exclude': /node_modules/,
    'include': [
      path.resolve(__dirname, '../../../src'),
      path.resolve(__dirname, '../../../build'),
    ],
    'use': {
      'loader': 'html-loader', // (see: https://www.npmjs.com/package/html-loader)
      'options': { 'minimize': true } // run html files through minification
    }
  }],
  plugins: [
    new HtmlWebPackPlugin({ // used to compile our html files/
      'title': 'woot',
      'template': './src/index.html',
      'filename': './index.html',
      'favicon': './src/elements/atoms/Icon/assets/favicon.ico',
    })
  ]
};
