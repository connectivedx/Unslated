// Alias namespace config (see: https://webpack.js.org/configuration/resolve/#resolve-alias)
// Used to quickly resolve file paths during imports in JS, JSX and CSS files.

const path = require('path');
const Webpack = require('webpack');

module.exports = {
  config: {
    '@root':  path.resolve(__dirname, '../../'),
    '@src': path.resolve(__dirname, '../../src/'),
    '@dest': path.resolve(__dirname, '../../dest/'),
    '@vars': path.resolve(__dirname, '../../src/variables/'),
    '@build': path.resolve(__dirname, '../../build/'),
    '@guide': path.resolve(__dirname, '../../build/guide/'),
    '@atoms': path.resolve(__dirname, '../../src/elements/atoms/'),
    '@pages': path.resolve(__dirname, '../../src/pages/'),
    '@elements': path.resolve(__dirname, '../../src/elements/'),
    '@molecules': path.resolve(__dirname, '../../src/elements/molecules/'),
    '@organisms': path.resolve(__dirname, '../../src/elements/organisms/'),
    '@modifiers': path.resolve(__dirname, '../../src/elements/modifiers/'),
    '@templates': path.resolve(__dirname, '../../src/elements/templates/'),
    '@sly': path.resolve(__dirname, '../../src/elements/modifiers/Sly/Sly'),
    Utils: path.resolve(__dirname, '../../src/utilities.jsx'),
    GuideUtils: path.resolve(__dirname, '../../build/guide/guide.utilities.jsx')
  },
  plugins: [
    new Webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      ReactDOMServer: 'react-dom/server',
      PropTypes: 'prop-types',
      Utils: 'Utils',
      GuideUtils: 'GuideUtils'
    })
  ]
};
