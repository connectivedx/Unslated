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
const rems = require('./css.postcss-rem.plugin.js');
const media = require('./css.postcss-media.plugin.js');
const nested = require('postcss-nested');
const extend = require('./css.postcss-extend.plugin.js');
const custom = require('postcss-custom-selectors');
const mixins = require('postcss-mixins');
const imports = require('postcss-import');
const variables = require('./css.postcss-vars.plugin.js');
const exporting = require('./css.postcss-exports.plugin.js');
const mediaPacker = require('css-mqpacker');
const removeRoots = require('./css.postcss-roots.plugin.js');
const respondType = require('postcss-responsive-type');
const minification = require('cssnano');

// Warning: the below methods have an order of operation that matters!!
module.exports = {
  plugins: [
    imports({       // Allows for @import and our entry point for namespace alias config
      resolve: (id, basedir) => {
        return resolver.resolveSync({}, basedir, id);
      }
    }),
    rems(),         // Allows for CSS rem()
    media(),        // Allows for custom media queries
    exporting(),    // Pre-parse color variables
    variables(),    // Allows var(--variables)
    custom(),       // Allows for @custom selectors    
    respondType(),  // Allows for responsive typography
    nested(),       // Allows for nested selectors
    extend(),       // Allows for CSS @extend
    mixins(),       // Allows for CSS @mixins
    removeRoots(),  // Cleans up leftover :root declarations.
    mediaPacker(),  // Allows for the consolidation of @media queries
    minification(), // Minification of our final CSS results.
  ]
};
