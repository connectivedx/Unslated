/*
  Main configuration entry for bundling CSS, Fonts, HTML, Images and JavaScript.
  This main configuration entry is responsible for both production assets and component guide assets.
*/

// config dependencies
require('./webpack/paths.config');
const path = require('path');
const Webpack = require('webpack');
const Package = require('../../package.json');
const WebpackPlugins = require('./webpack/webpack.plugins.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// config files
const js = require('./js/js.config.js');        // all js file related build configurations
const css = require('./css/css.config.js');     // all css file related build configurations
const img = require('./img/img.config.js');     // all img/svg related build configurations
const html = require('./html/html.config.js');  // all html related build configurations
const font = require('./font/font.config.js');  // all font related build configurations
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
    path: path.resolve(__dirname, `../../${global.directories.dest}`),   // sets default location for all compiled files
    publicPath: global.directories.publicPath,                           // sets a default public location (required by react-routes)
    filename: `.${global.directories.assetPath}/js/[name].js`,           // sets filename of bundled .js file (relative to output.path config)
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
  resolve: {
    alias: alias.config,                           // resolve alias namespaces (see build/configs/alias.config.js)
    extensions: ['.js', '.jsx', '.json', '.css'],  // limits alias to these file types (order matters here; css last)
    enforceExtension: false                        // allows importing of files without file's extension usage
  },
  ...stats.config,               // see build/configs/stats.config.js
  ...server.config,              // see build/configs/server.config.js
  performance: {
    maxAssetSize: 170000,
    assetFilter: (asset) => {
      return asset.match('assets.js');
    }
  }
};

// Prod vs. Dev config customizing
module.exports = (env, argv) => {
  // DEV BUILDS
  if (argv.mode === 'development') {
    config.devServer.historyApiFallback = true; // Webpack-dev-server & react-routes requirement
    config.output.filename = config.output.filename.replace('.js', '-[hash].js'); // Main entrie cache pop
  }

  // PRODUCTION BUILDS
  if (argv.mode === 'production') {
    if (!argv.guide) {
      // Remove guide from production builds
      delete config.entry.guide;
    } else {
      // Remove assets from guide builds
      delete config.entry.assets;
    }

    // Production builds do not need devtool support
    config.devtool = false;

    // Production builds JS minification (see: package.json -> optimize)
    config.optimization = {
      minimize: Package.optimize.JS
    };

    // Cleans our dist folder upon production builds
    config.plugins.push(
      new HardSourceWebpackPlugin(),
      new CopyWebpackPlugin([ // react-routes rewrite files for hosting guide on remote a web server.
        {
          from: path.resolve(__dirname, `../scaffolding/${(Package.remote.type !== 'IIS') ? '.htaccess' : 'web.config'}`), // for IIS servers
          to: config.output.path
        }
      ])
    );

    if (argv.guide !== 'true') {
      config.plugins.push(
        new CleanWebpackPlugin(
          [config.output.path], // reuse config output path from above
          {
            'root': path.resolve(config.output.path, '../') // focus plugins root out of build/config/
          }
        )
      );
    }
  }

  // GUIDE BUILDS
  if (argv.guide || argv.mode === 'development') {
    config.plugins.push(
      new WebpackPlugins.StatsBundle(argv.mode) // Capture webpack bundling stats object into guide.
    );
  }

  return config;
};
