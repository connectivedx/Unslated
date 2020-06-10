/*
  Main configuration entry for all js(x) files.
*/

const path = require('path');
const Package = require('../../../package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ESDocs, JSXDocs, Metrics, Bundle } = require('./js.config.plugins.js');

const babelPlugins = [
  '@babel/plugin-proposal-object-rest-spread', // (see: https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread)
  '@babel/plugin-proposal-class-properties', // (see: https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)
  '@babel/plugin-transform-react-display-name' // (see: https://www.npmjs.com/package/babel-plugin-add-react-displayname)
];

const babelOptions = {
  'cache': false,
  'formatter': require('eslint-friendly-formatter'),
  'configFile': path.resolve(__dirname, '.eslintrc')
};

// all js(x) files get ran through these build processes
module.exports = {
	config: [{
    'test': /\.(jsx|js)$/,
    'exclude': [path.resolve(__dirname, '../../../node_modules')],
    'use': [
      {
        'loader': 'babel-loader?cacheDirectory', // (see: https://www.npmjs.com/package/babel-loader)
        'options': {
          'compact': false,
          'presets': ['@babel/preset-env', '@babel/preset-react'],
          'plugins': babelPlugins
        }
      }
    ]
  }, {
    'test': /\.js$/,
    'exclude': [path.resolve(__dirname, '../../../node_modules')],
    'use': [
      {
        'loader': 'babel-loader?cacheDirectory', // (see: https://www.npmjs.com/package/babel-loader)
        'options': {
          'plugins': [
            ESMetrics,
            ESDocs
          ]
        }
      }, {
        'loader': 'eslint-loader',
        'options': babelOptions
      }
    ]
  }, {
    'test': /\.jsx$/,
    'exclude': [path.resolve(__dirname, '../../../node_modules')],
    'use': [
      {
        'loader': 'babel-loader?cacheDirectory', // (see: https://www.npmjs.com/package/babel-loader)
        'options': {
          'presets': ['@babel/preset-react'],
          'plugins': [
            JSXDocs,
            ...babelPlugins
          ]
        }
      }, {
        'loader': 'eslint-loader',
        'options': babelOptions
      }
    ]
  }],
	plugins: [
    new Bundle(), // bundles docs and metrics and into guide.js
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, '../../../src/data/'),
        from: '**/*.*', // for IIS servers
        to: `${Package.directories.assetPath}/data/`          // relative to Package.directories.dest
      }
    ])
  ]
};
