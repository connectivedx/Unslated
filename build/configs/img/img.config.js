/*
  Main configuration entry for all image and svg files.
*/

const path = require('path');
const WebpackSvgSpritely = require('webpack-svg-spritely');

// all image types get ran through these process
module.exports = {
  config: [{
    'test': /\.(jpe?g|png|gif|svg)$/i,
    'exclude': /node_modules/,
    'include': [
      path.resolve(__dirname, '../../../src'),
      path.resolve(__dirname, '../../../build'),
    ],
    'use': [
      {
        'loader': 'file-loader', // (see: https://www.npmjs.com/package/file-loader)
        'options': {
          'name': '[name].[ext]',
          'outputPath': `.${global.directories.assetPath}/img/` // see package.json
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
              'output': `${global.directories.dest}${global.directories.assetPath}/img/` // see package.json
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
    // Builds our icon svg sprite file (see: https://www.npmjs.com/package/webpack-svg-spritely)
    new WebpackSvgSpritely({
      output: '/assets/img',
      entry: 'assets'
    })
  ]
};
