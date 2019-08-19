/*
  Main configuration entry for all js(x) files.
*/

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
          'plugins': [
            '@babel/plugin-proposal-object-rest-spread', // (see: https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread)
            '@babel/plugin-proposal-class-properties', // (see: https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)
            '@babel/plugin-transform-react-display-name' // (see: https://www.npmjs.com/package/babel-plugin-add-react-displayname)
          ]
        }
      }, {
        'loader': 'eslint-loader',
        'options': {
          'cache': true,
          'formatter': require('eslint-friendly-formatter'),
          'configFile': path.resolve(__dirname, '.eslintrc')
        }
      }
    ]
  }],
	plugins: [
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, '../../../src/data/'),
        from: path.resolve(__dirname, '../../../src/data/*.*'), // for IIS servers
        to: `.${global.directories.assetPath}/data/`
      }
    ])
  ]
};
