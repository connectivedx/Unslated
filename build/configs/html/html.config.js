/*
  Main configuration entry for all html files.
*/

const path = require('path');
const Package = require('../../../package.json');
const WebpackCDNInject = require('webpack-cdn-inject');
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
      'title': `${Package.name} ${Package.version}`,
      'template': 'src/index.html',
      'filename': 'index.html',
      'favicon': Package.favicon.src
    }),
    new WebpackCDNInject({
      head: [
        '//unpkg.com/prismjs@1.17.1/themes/prism.css'
      ],
      body: [
        '//unpkg.com/mdn-polyfills/Object.assign.js',
        '//unpkg.com/mdn-polyfills/String.prototype.repeat.js',
        '//unpkg.com/mdn-polyfills/Array.prototype.forEach.js',
        '//unpkg.com/chart.js@2.8.0/dist/Chart.min.js',
        '//unpkg.com/prismjs@1.17.1/prism.js',
        '//unpkg.com/prismjs@1.17.1/components/prism-json.min.js',
        '//unpkg.com/prismjs@1.17.1/components/prism-jsx.min.js',
        '//unpkg.com/react@16.8.0/umd/react.development.js',                          // DO NOT USE MIN VERSION OR PRODUCTION VERSION!! WILL NOT LOG PROP ERROS
        '//unpkg.com/react-dom@16.8.0/umd/react-dom.production.min.js',
        '//unpkg.com/react-dom@16.8.0/umd/react-dom-server.browser.production.min.js',
        '//unpkg.com/react-router-dom@5.0.1/umd/react-router-dom.min.js',
        '//unpkg.com/prop-types@15.7.2/prop-types.js'                                 // DO NOT USE MIN VERSION!!! WILL NOT LOG PROP ERRORS
      ]
    })
  ]
};
