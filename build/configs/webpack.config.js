// config dependencies
const path = require('path');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// config files
const js = require('./js/js.config.js');        // all js file related build configurations
const css = require('./css/css.config.js');     // all css file related build configurations
const img = require('./img/img.config.js');     // all img/svg related build configurations
const html = require('./html/html.config.js');  // all html related build configurations
const alias = require('./alias.config.js');     // all file path alias helper configurations
const stats = require('./stats.config.js');     // all minification and stats configurations

// main config object
const config = {
  entry: {
    assets: './build/assets.js', // entry point for production assets
    guide: './build/guide.js'    // entry point for style guide assets
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),  // sets default location for all compiled files
    publicPath: '/',                              // sets a default public location (required by react-routes)
    filename: './assets/js/[name].js'             // sets filename of bundled .js file (relative to output.path config)
  },
  module: { 
    rules: [
      ...css.config,  // see build/config/css/css.config.js
      ...js.config,   // see build/config/js/js.config.js
      ...html.config, // see build/configs/htlm/html.config.js
      ...img.config   // see build/config/img/img.config.js
    ]
  },
  plugins: [
    ...css.plugins,        // see build/config/css/css.config.js
    ...js.plugins,         // see build/config/js/js.config.js
    ...html.plugins,       // see build/configs/htlm/html.config.js
    ...img.plugins,        // see build/config/img/img.config.js
    ...alias.plugins,      // see build/config/alias.config.js
    ...stats.plugins       // see build/configs/stats.config.js
  ],
  resolve: {
    alias: alias.config,                           // resolve alias namespaces (see build/configs/alias.config.js)
    extensions: ['.js', '.jsx', '.json', '.css'],  // limits alias to these file types (order matters here; css last)
    enforceExtension: false                        // allows importing of files without file's extension usage
  },
  ...stats.config          // see build/configs/stats.config.js
};

// Prod vs. Dev config customizing
module.exports = (env, argv) => {

  // DEV BUILDS
  if (argv.mode === 'development') {
    config.devServer = {
      historyApiFallback: true, // react-routes requirement
      ...config.devServer       // entry point for devServer configus (see: stats.config.js)
    };
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
      )
    );

    // Supporting react-routes rewrite files for hosting guide on remote web server.
    // web.config === IIS web servers (default)
    // .htaccess === Apache web servers
    const serverUrlRewriteTypes = ['web.config', '.htaccess'];
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../scaffolding/web.config'), // for IIS servers
          to: config.output.path
        }
      ])
    );  
  }

  // finally exports config object
  return config;
};
