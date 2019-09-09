/*
  Main configuration entry for all font files.
*/

const path = require('path');
const Package = require('../../../package.json');

module.exports = {
  config: [{
    'test': /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    'exclude': /node_modules/,
    'include': [
      path.resolve(__dirname, '../../../src'),
      path.resolve(__dirname, '../../../build'),
    ],
    'use': [
      {
        'loader': 'file-loader',
        'options': {
          'name': '[name].[ext]',
          'outputPath': `.${Package.directories.assetPath}/fonts/`
        }
      }
    ]
  }],
  plugins: []
};
