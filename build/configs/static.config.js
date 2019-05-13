// config dependencies
const path = require('path');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPlugins = require('./webpack.plugins.js');
const Package = require('../../package.json');

// config files
const alias = require('./alias.config.js');     // all file path alias helper configurations
const img = require('./img/img.config.js');     // all image related build configurations

// main config object
const config = {
  entry: {
    static: './build/static.jsx', // entry point for production assets
  },
  output: {
    path: path.resolve(__dirname, `../../${Package.directories.dest}`),   // sets default location for all compiled files
    publicPath: Package.directories.publicPath,                           // sets a default public location (required by react-routes)
    filename: `.${Package.directories.dest}/[name].js`,                   // sets filename of bundled .js file (relative to output.path config)
    pathinfo: false
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        'exclude': [path.resolve(__dirname, '../../node_modules')],
        'use': [
          {
            'loader': 'babel-loader?cacheDirectory', // (see: https://www.npmjs.com/package/babel-loader)
            'options': {
              'compact': false,
              'presets': ['@babel/preset-env', '@babel/preset-react'],
              'plugins': [
                '@babel/plugin-proposal-object-rest-spread', // (see: https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread)
                '@babel/plugin-proposal-class-properties',   // (see: https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)
                '@babel/plugin-transform-react-display-name' // (see: https://www.npmjs.com/package/babel-plugin-add-react-displayname)
              ]
            }
          }
        ]
      },
      ...img.config                        // see build/config/img/img.config.js
    ]
  },
  plugins: [
    ...alias.plugins,                      // see build/configs/alias.config.js
    new WebpackPlugins.StaticBundle()      // see build/configs/webpack.plugins.js
  ],
  resolve: {
    alias: alias.config,                   // resolve alias namespaces (see build/configs/alias.config.js)
    extensions: ['.js', '.jsx', '.json'],  // limits alias to these file types (order matters here; css last)
    enforceExtension: false                // allows importing of files without file's extension usage
  },
  optimization: {
    minimize: false,                       // minimize output (set to false for dev builds)
  },
  performance: {
    hints: false                           // bundle size warnings
  }
};

module.exports = (env, argv) => {
  /* Here we have the opportunity to alter the config as needed prior to sending it off to webpack */
  return config;
};
