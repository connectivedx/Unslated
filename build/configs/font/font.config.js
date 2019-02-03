// all font files get ran through these processes
const package = require('../../../package.json');

module.exports = {
  config: [{
    'test': /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    'loader': 'file-loader',
    'options': {
      'name': '[name].[ext]',
      'outputPath': ['.', package.directories.assetPath, '/fonts/'].join('')
    }
  }],
  plugins: []
};
