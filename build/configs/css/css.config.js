/*
  Main configuration entry for all CSS files.
  Please note, all CSS code is ran through postcss and postcss plugins.

  Two phases to CSS bundling, preBundle and postBundle. Some postcss plugins like importing and exporting
  happen at preBundle (file by file), while other postcss plugins get ran at the postBundle phase (bundled sheet).
*/

const path = require('path');
const Package = require('../../../package.json');
const POSTCSSInOut = require('postcss-in-out');
const Alias = require('../webpack/alias.config.js');
const Plugins = require('./css.postcss.plugins.js');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nested = require('postcss-nested');
const custom = require('postcss-custom-selectors');
const imports = require('postcss-import');

// start enhanced-resolve setup DO NOT CHANGE! (allows alias namespaces within postcss)
const ResolverFactory = require('enhanced-resolve/lib/ResolverFactory');
const NodeJsInputFileSystem = require('enhanced-resolve/lib/NodeJsInputFileSystem');
const CachedInputFileSystem = require('enhanced-resolve/lib/CachedInputFileSystem');
const fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), 60000);

// all css files get ran through these processes
module.exports = {
  config: [{
    'test': /\.css$/,
    'use': [
      MiniCssExtractPlugin.loader, // (see: https://www.npmjs.com/package/mini-css-extract-plugin)
      {
        'loader': 'css-loader', // (see: https://www.npmjs.com/package/css-loader)
        'options': {}
      }
    ]
  }],
  plugins: [
    new StyleLintPlugin({
      files: `./src/elements/**/**/*.css`,
      configFile: path.resolve(__dirname, '.csslintrc')
    }),
    new POSTCSSInOut({
      preBuild: [
        imports({                       // Bring resolve context to @import / url() usage (see: build/config/alias.config.js)
          resolve: (id, basedir) => {
            return ResolverFactory.createResolver({
              alias: Alias.config,
              useSyncFileSystemCalls: true,
              fileSystem
            }).resolveSync({}, basedir, id);
          }
        }),
        Plugins.exporting(),     // Pre-parse color variables
        custom()                 // Allows for @custom selectors
      ],
      postBuild: [
        nested(),                // Allows for nested selectors
        Plugins.rems(),          // Allows for CSS rem()
        Plugins.variables(),     // Allows var(--variables)
        Plugins.mixins(),        // Allows for CSS @mixins
        nested(),                // Allows for nested mixin selected to be fixed up
        Plugins.percentage(),    // Allows quick conversion of number to percentage
        Plugins.colors(),        // Allows for color(hex or var(), darken | lighten)
        Plugins.extend(),        // Allows for CSS @extend
        Plugins.media(),         // Allows for custom media queries
        Plugins.roots(),         // Cleans up leftover :root declarations.
        Plugins.comments(),      // Cleans up comments.
        (Package.optimize.css)   // Minification of our final CSS results.
          ? Plugins.minify()
          : () => {}
      ]
    }),
    new MiniCssExtractPlugin({                  // used to compile our css file.
      filename: `.${Package.directories.assetPath}/css/[name].css`,
      chunkFilename: './[name].css'
    })
  ]
};
