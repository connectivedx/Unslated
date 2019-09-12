/*
  Alias config resolves common file paths and plugins for development.
  (see: https://webpack.js.org/configuration/resolve/#resolve-alias)
*/

const path = require('path');
const Webpack = require('webpack');

module.exports = {
  config: {
    '@root':  path.resolve(__dirname, '../../../'),
    '@src': path.resolve(__dirname, '../../../src/'),
    '@dest': path.resolve(__dirname, '../../../dest/'),
    '@vars': path.resolve(__dirname, '../../../src/variables/'),
    '@build': path.resolve(__dirname, '../../../build/'),
    '@guide': path.resolve(__dirname, '../../../build/guide/'),
    '@atoms': path.resolve(__dirname, '../../../src/elements/atoms/'),
    '@pages': path.resolve(__dirname, '../../../src/pages/'),
    '@elements': path.resolve(__dirname, '../../../src/elements/'),
    '@molecules': path.resolve(__dirname, '../../../src/elements/molecules/'),
    '@organisms': path.resolve(__dirname, '../../../src/elements/organisms/'),
    '@modifiers': path.resolve(__dirname, '../../../src/elements/modifiers/'),
    '@templates': path.resolve(__dirname, '../../../src/elements/templates/'),
    '@tools': path.resolve(__dirname, '../../guide/src/tools/'),
    '@guideElements': path.resolve(__dirname, '../../guide/src/elements/'),
    '@guideAtoms': path.resolve(__dirname, '../../guide/src/elements/atoms/'),
    '@guideAssets': path.resolve(__dirname, '../../guide/assets/'),
    '@guideMolecules': path.resolve(__dirname, '../../guide/src/elements/molecules/'),
    '@guideModifiers': path.resolve(__dirname, '../../guide/src/elements/modifiers/'),
    '@guideOrganisms': path.resolve(__dirname, '../../guide/src/elements/organisms/'),
    '@sly': path.resolve(__dirname, '../../../src/elements/modifiers/Sly/Sly'),
    Utils: path.resolve(__dirname, '../../../src/utilities.jsx'),
    GuideUtils: path.resolve(__dirname, '../../guide/guide.utilities.jsx')
  },
  plugins: [
    new Webpack.ProvidePlugin({
      Utils: 'Utils',
      GuideUtils: 'GuideUtils'
    })
  ]
};
