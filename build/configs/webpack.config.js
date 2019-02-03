// config dependencies
const path = require('path');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackStatsPlugin = require('../guide/plugins/webpack.stats.js');
const package = require('../../package.json');

// config files
const js = require('./js/js.config.js');        // all js file related build configurations
const css = require('./css/css.config.js');     // all css file related build configurations
const img = require('./img/img.config.js');     // all img/svg related build configurations
const html = require('./html/html.config.js');  // all html related build configurations
const font = require('./font/font.config.js');  // all font related build configurations
const alias = require('./alias.config.js');     // all file path alias helper configurations
const stats = require('./stats.config.js');     // all terminal stats configurations
const server = require('./server.config.js');   // all webpack-dev-server configurations

// main config object
const config = {
  entry: {
    assets: './build/assets.js', // entry point for production assets
    guide: './build/guide.js'    // entry point for style guide assets
  },
  output: {
    path: path.resolve(__dirname, ['../../',package.directories.dest].join('')),  // sets default location for all compiled files
    publicPath: package.directories.publicPath,                                       // sets a default public location (required by react-routes)
    filename: ['.', package.directories.assetPath, '/js/[name].js'].join('')                                             // sets filename of bundled .js file (relative to output.path config)
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
    ...css.plugins,        // see build/config/css/css.config.js
    ...js.plugins,         // see build/config/js/js.config.js
    ...html.plugins,       // see build/configs/htlm/html.config.js
    ...img.plugins,        // see build/config/img/img.config.js
    ...font.plugins,       // see build/config/font/font.config.js
    ...alias.plugins,      // see build/config/alias.config.js
    ...stats.plugins       // see build/configs/stats.config.js    
  ],
  resolve: {
    alias: alias.config,                           // resolve alias namespaces (see build/configs/alias.config.js)
    extensions: ['.js', '.jsx', '.json', '.css'],  // limits alias to these file types (order matters here; css last)
    enforceExtension: false                        // allows importing of files without file's extension usage
  },
  ...stats.config,               // see build/configs/stats.config.js
  ...server.config,              // see build/configs/server.config.js
  optimization: {
    minimize: false              // minimize output (set to false for dev builds)
  },
  performance: {
    hints: false                 // bundle size warnings  
  }
};

// Prod vs. Dev config customizing
module.exports = (env, argv) => {

  // DEV BUILDS
  if (argv.mode === 'development') {
    // Webpack-dev-server / React Router support
    config.devServer = {
      historyApiFallback: true, // react-routes requirement
      ...config.devServer       // entry point for devServer configus (see: stats.config.js)
    };

    // Dev builds need to have main entries cache poped with hash
    config.output.filename = config.output.filename.replace('.js', '-[hash].js');

    // Entrypoint for stats plugins
    config.plugins.push(
      new WebpackStatsPlugin(argv.mode)
    );
  }

  // PROD BUILDS
  if (argv.mode === 'production') {
    // Produciton builds turn JS minification on.
    // Remove this line if production builds ought not to be minified.
    config.optimization.minimize = true;
    
    // Cleans our dist folder upon production builds
    config.plugins.push(
      new CleanWebpackPlugin(
        [config.output.path], // reuse config output path from above
        {
          'root': path.resolve(config.output.path, '../') // focus plugins root out of build/config/
        }
      ),
      new WebpackStatsPlugin(argv.mode)
    );

    // react-routes rewrite files for hosting guide on remote a web server.
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../scaffolding/web.config'), // for IIS servers
          to: config.output.path
        }
      ])
    );  
  }

  return config;
};
