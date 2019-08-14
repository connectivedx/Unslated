/*
  Main configuration entry for all html files.
*/

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackPlugins = require('../webpack/webpack.plugins.js');

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
    }),
    // new DynamicCdnWebpackPlugin()
    new WebpackPlugins.CDNModules({
      'chartjs': '//unpkg.com/chart.js@2.8.0/dist/Chart.min.js',
      'prismcss': '//unpkg.com/prismjs@1.17.1/themes/prism.css',
      'prismjs': '//unpkg.com/prismjs@1.17.1/prism.js',
      'prismjson': '//unpkg.com/prismjs@1.17.1/components/prism-json.min.js',
      'prismjsx': '//unpkg.com/prismjs@1.17.1/components/prism-jsx.min.js',
      'react': '//unpkg.com/react@16.8.0/umd/react.production.min.js',
      'react-dom': '//unpkg.com/react-dom@16.8.0/umd/react-dom.production.min.js',
      'react-dom/server': '//unpkg.com/react-dom@16.8.0/umd/react-dom-server.browser.production.min.js',
      'react-router-dom': '//unpkg.com/react-router-dom@5.0.1/umd/react-router-dom.min.js',
      'prop-types': '//unpkg.com/prop-types@15.7.2/prop-types.min.js'
    })
  ]
};
