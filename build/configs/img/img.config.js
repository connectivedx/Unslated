const SvgStorePlugin = require('webpack-svgstore-plugin');

// all image types get ran through these process
module.exports = {
  config: [{
    'test': /\.(jpe?g|png|gif|svg)$/i,
    'use': [
      {
        'loader': 'file-loader', // (see: https://www.npmjs.com/package/file-loader)
        'options': {
          'name': '[name].[ext]',
          'outputPath': 'assets/img/'
        }
      },
      {
        'loader': 'image-webpack-loader', // (see: https://www.npmjs.com/package/image-webpack-loader)
        'query': {
          'bypassOnDebug': true,
          'gifsicle': {
            'interlaced': false
          },
          'optipng': {
            'optimizationLevel': 7
          },
          'svgo': {
            'options': {
              'output': './dist/img/'
            },
            'plugins': [
              { 'cleanupAttrs': true },
              { 'cleanupEnableBackground': true },
              { 'cleanupIDs': true },
              { 'cleanupListOfValues': true },
              { 'collapseGroups': true },
              { 'convertTransform': true },
              { 'minifyStyles': true },
              { 'removeAttrs': true },
              { 'removeComments': true },
              { 'removeDesc': true },
              { 'removeDimensions': true },
              { 'removeDoctype': true },
              { 'removeEditorNSData': true },
              { 'removeEmptyAttrs': true },
              { 'removeEmptyContainers': true },
              { 'removeEmptyText': true },
              { 'removeHiddenElems': true },
              { 'removeMetadata': true },
              { 'removeNonInheritableGroupAttrs': true },
              { 'removeRasterImages': true },
              { 'removeUnknownsAndDefaults': true },
              { 'removeUnusedNS': true },
              { 'removeUselessDefs': true },
              { 'removeUselessStrokeAndFill': true },
              { 'removeXMLNS': false },
              { 'removeXMLProcInst': true },
              { 'sortAttrs': true },
              { 'removeViewBox': false }
            ]
          }
        }
      }
    ]
  }],
  plugins: [
    new SvgStorePlugin()
  ]
};