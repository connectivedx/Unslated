// Alias namespace config
// Used to quickly resolve file paths during imports in JS, JSX and CSS files.

const path = require('path');
const Webpack = require('webpack');
const package = require('../../package.json');

module.exports = {
  config: {
    '@root': path.resolve(__dirname, '../../'),
    '@build': path.resolve(__dirname, '../../build/'),
    '@guide': path.resolve(__dirname, '../../build/guide/'),
    '@src':  path.resolve(__dirname, '../../src/'),
    '@dest': path.resolve(__dirname, '../../dest/'),
    '@elements': path.resolve(__dirname, '../../src/elements/'),
    '@vars': path.resolve(__dirname, '../../src/variables/'),
    '@atoms': path.resolve(__dirname, '../../src/elements/atoms/'),
    '@molecules': path.resolve(__dirname, '../../src/elements/molecules/'),
    '@organisms': path.resolve(__dirname, '../../src/elements/organisms/'),
    '@modifiers': path.resolve(__dirname, '../../src/elements/modifiers/'),
    '@templates': path.resolve(__dirname, '../../src/elements/templates/'),
    '@pages': path.resolve(__dirname, '../../src/pages/'),
    Utils: path.resolve(__dirname, '../../build/utilities.jsx'),
    GuideUtils: path.resolve(__dirname, '../../build/guide/guide.utilities.jsx')
  },
  plugins: [
    new Webpack.ProvidePlugin({
      'React': 'react',
      'PropTypes': 'prop-types',
      Utils: 'Utils',
      GuideUtils: 'GuideUtils'
    }),
    new Webpack.DefinePlugin({
      'AssetPath': JSON.stringify(package.directories.assetPath)
    })    
  ]
};
