// start enhanced-resolve setup (alias namespaces within postcss)
const alias = require('../alias.config.js'); // get alias namespaces (@src, @dist, @atoms etc.)
const postcss = require('postcss');
const ResolverFactory = require('enhanced-resolve/lib/ResolverFactory');
const NodeJsInputFileSystem = require('enhanced-resolve/lib/NodeJsInputFileSystem');
const CachedInputFileSystem = require('enhanced-resolve/lib/CachedInputFileSystem');

const CACHED_DURATION = 60000;
const fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), CACHED_DURATION);

const resolver = ResolverFactory.createResolver({
  alias: alias.config,
  useSyncFileSystemCalls: true,
  fileSystem
});
// end enhanced-resolve setup

// Add / Remove POSTCSS plugins below:

// The plugins listed below have order of operation! In most cases, making sure you leave
// cssnano as your last plugin call is all you need to remember when add new plugins,
// however always read newly added plugin docs to make sure they don't carry their own order of operation requirements.
// standard
const preset = require('postcss-preset-env');
const imports = require('postcss-import');
const nested = require('postcss-nested');
const extend = require('postcss-extend');
const mixins = require('postcss-mixins');
const variables = require('postcss-custom-properties');
const minification = require('cssnano');
const media = require('./css.postcss-media.plugin.js');
const mediaPacker = require('css-mqpacker');


module.exports = {
  plugins: [
    preset(), // PostCSS Preset Env lets you transpose modern CSS into backwards compatable CSS
    imports({ // Allows for @import and our entry point for namespace alias config
      resolve: (id, basedir) => {
        return resolver.resolveSync({}, basedir, id);
      }
    }),
    variables({ // Allows for CSS variables
      'variables': {
        'preserve': false
      }
    }),
    media(),
    nested(), // Allows for nested selectors
    mixins(), // Allows for CSS mixins
    extend(), // Allows for CSS @extend
    mediaPacker(), // Allows for the consolidation of @media queries 
    minification(), // Minification of our final CSS results.
  ]
};