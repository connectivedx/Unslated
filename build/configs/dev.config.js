/*
  Main configuration entry for bundling CSS, Fonts, HTML, Images and JavaScript.
  This main configuration entry is responsible for both production assets and component guide assets.
*/

// devDependencies
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const Package = require('../../package.json');

// build configuration files
const js = require('./js/js.config.js');                // all js file related build configurations
const css = require('./css/css.config.js');             // all css file related build configurations
const img = require('./img/img.config.js');             // all img/svg related build configurations
const html = require('./html/html.config.js');          // all html related build configurations
const font = require('./font/font.config.js');          // all font related build configurations
const alias = require('./webpack/alias.config.js');     // all file path alias helper configurations
const stats = require('./webpack/stats.config.js');     // all terminal stats configurations
const server = require('./webpack/server.config.js');   // all webpack-dev-server configurations

// main config object
const config = {
  entry: {
    assets: './build/assets.jsx', // entry point for production assets
    guide: './build/guide.jsx'    // entry point for style guide assets
  },
  output: {
    path: path.resolve(__dirname, `../../dist`),  // sets default location for all compiled files
    publicPath: '/',                              // sets a default public location (required by react-routes)
    filename: `${Package.directories.assetPath}/js/[name].js`,             // sets filename of bundled .js file (relative to output.path config)
    pathinfo: false
  },
  module: {
    rules: [
      ...css.config,  // see build/config/css/css.config.js
      ...js.config,   // see build/config/js/js.config.js
      ...html.config, // see build/configs/htlm/html.config.js
      ...img.config,  // see build/config/img/img.config.js
      ...font.config  // see build/config/font/font.config.js
    ]
  },
  plugins: [
    ...css.plugins,   // see build/config/css/css.config.js
    ...js.plugins,    // see build/config/js/js.config.js
    ...html.plugins,  // see build/configs/htlm/html.config.js
    ...img.plugins,   // see build/config/img/img.config.js
    ...font.plugins,  // see build/config/font/font.config.js
    ...alias.plugins, // see build/config/alias.config.js
    ...stats.plugins  // see build/configs/stats.config.js
  ],
  ...stats.config,    // see build/configs/webpack/stats.config.js
  ...server.config,   // see build/configs/webpack/server.config.js
  resolve: {
    alias: alias.config,                           // resolve alias namespaces (see build/configs/alias.config.js)
    extensions: ['.js', '.jsx', '.json', '.css'],  // limits alias to these file types (order matters here; css last)
    enforceExtension: false                        // allows importing of files without file's extension usage
  },
  performance: {
    maxAssetSize: 170000,
    assetFilter: (asset) => {
      return asset.match('assets.js');
    }
  }
};

// Prod vs. Dev config customizing
module.exports = (env, argv) => {
  if (!fs.existsSync(path.resolve(__dirname, '../../dist/index.html'))) {
    execSync('npm run guide'); // fix for cold guide builds
  }

  return config;
};
