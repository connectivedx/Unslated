const path = require('path');
const Webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// all html files get ran through these processes
module.exports = {
  config: [{
    'test': /\.html$/, // for .html files
    'use': { 
      'loader': 'html-loader', // (see: https://www.npmjs.com/package/html-loader)
      'options': { 'minimize': true } // run html files through minification
    }
  }],
  plugins: [
    new HtmlWebPackPlugin({ // used to compile our html files/
      'template': './src/index.html',
      'filename': './index.html'
    })
  ]
};