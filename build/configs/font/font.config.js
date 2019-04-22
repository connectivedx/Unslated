// all font files get ran through these processes
const path = require('path');
const package = require('../../../package.json');

module.exports = {
  config: [{
    'test': /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    'exclude': /node_modules/,
    'include': [
      path.resolve(__dirname, '../../../src'),
      path.resolve(__dirname, '../../../build'),
    ],
    'loader': 'file-loader',
    'options': {
      'name': '[name].[ext]',
      'outputPath': `.${package.directories.assetPath}/fonts/`
    }
  }],
  plugins: []
};
