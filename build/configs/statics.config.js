/*
  Main configuration entry for exporting JSX examples.
  This configuration entry does not bundle any assets, instead it is a entry point to export custom code
  out of a normal production build process.
*/

// devDependencies
const path = require('path');
const Webpack = require('webpack');
const { StaticBundle } = require('./webpack/webpack.plugins.js');

// build configuration files
const img = require('./img/img.config.js');       // all image related build configurations
const alias = require('./webpack/alias.config.js');     // all file path alias helper configurations

// main config object
const config = {
  entry: {
    static: './build/static.jsx', // entry point for production assets
  },
  output: {
    path: path.resolve(__dirname, '../../node_modules/.bin/'),                           // sets default location for all compiled files
    filename: '../../node_modules/.bin/unslated.[name].js',  // sets filename of bundled .js file (relative to output.path config)
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
            'loader': 'babel-loader', // (see: https://www.npmjs.com/package/babel-loader)
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
    new StaticBundle()                     // see build/configs/webpack.plugins.js
  ],
  resolve: {
    alias: alias.config,                   // resolve alias namespaces (see build/configs/alias.config.js)
    extensions: ['.js', '.jsx', '.json'],  // limits alias to these file types (order matters here; css last)
    enforceExtension: false                // allows importing of files without file's extension usage
  },
  performance: false,
  optimization: {
    minimize: false
  }
};

module.exports = (env, argv) => {
  return config;
};
