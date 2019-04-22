const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');
const path = require('path');
const package = require('../../../package.json');

// all js(x) files get ran through these build processes
module.exports = {
	config: [{
    'test': /\.(jsx|js)$/,
    'exclude': /node_modules/,
    'include': [
      path.resolve(__dirname, '../../../src'),
      path.resolve(__dirname, '../../../build'),
    ],
    'use': [
      {
        'loader': 'babel-loader?cacheDirectory', // (see: https://www.npmjs.com/package/babel-loader)
        'options': {
          'compact': false,
          'presets': ['env', 'react'],
          'plugins': [
            'transform-object-rest-spread', // (see: https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread)
            'transform-class-properties', // (see: https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)
            'add-react-displayname' // (see: https://www.npmjs.com/package/babel-plugin-add-react-displayname)
          ]
        }
      },{
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
    new Webpack.ProvidePlugin({
      'React': 'react', // (see: https://reactjs.org/)
      'ReactDOM': 'react-dom', // (see: https://reactjs.org/docs/react-dom.html)
      'PropTypes': 'prop-types' // (see: https://reactjs.org/docs/render-props.html)
    }),
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, '../../../src/data/'),
        from: path.resolve(__dirname, '../../../src/data/*.*'), // for IIS servers
        to: ['.', package.directories.assetPath, '/data/'].join('')
      }
    ])
  ]
};
