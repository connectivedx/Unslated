const Alias = require('../alias.config.js');
const Plugins = require('./css.postcss.plugins.js');
const nested = require('postcss-nested');
const custom = require('postcss-custom-selectors');
const mixins = require('postcss-mixins');
const imports = require('postcss-import');
const mediaPacker = require('css-mqpacker');
const minification = require('cssnano');

// start enhanced-resolve setup DO NOT CHANGE! (allows alias namespaces within postcss)
const ResolverFactory = require('enhanced-resolve/lib/ResolverFactory');
const NodeJsInputFileSystem = require('enhanced-resolve/lib/NodeJsInputFileSystem');
const CachedInputFileSystem = require('enhanced-resolve/lib/CachedInputFileSystem');
const fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), 60000);

/*
  No native support to combine css files before POSTCSS plugins.
  Because of this, we split the plugin usage into pre and post bundle sets of pluins.

  Using a custom webpack plugin (afterEmit hook), we perform postBundle plugin set on combined css
  (see: build/config/webpack.plugins.js for more information)
*/

// Warning: the below methods have an order of operation that matters!!
module.exports = {
  preBundle: [
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
    nested()                        // Allows for nested selectors
  ],
  postBundle: [
    Plugins.rems(),          // Allows for CSS rem()
    Plugins.media(),         // Allows for custom media queries
    Plugins.variables(),     // Allows var(--variables)
    Plugins.colors(),         // Allows for color(hex or var(), darken | lighten)
    custom(),                       // Allows for @custom selectors
    Plugins.extend(),        // Allows for CSS @extend
    mixins(),                       // Allows for CSS @mixins
    Plugins.roots(),         // Cleans up leftover :root declarations.
    mediaPacker(),                  // Allows for the consolidation of @media queries
    // minification()                  // Minification of our final CSS results.
  ]
};
