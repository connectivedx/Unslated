// all font files get ran through these processes
const path = require('path');

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
          'outputPath': `.${global.directories.assetPath}/fonts/`
        }
      }
    ]
  }],
  plugins: []
};
