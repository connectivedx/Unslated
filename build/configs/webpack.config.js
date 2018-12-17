// config dependencies
const path = require('path');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// config files
const js = require('./js/js.config.js');       // all js file related build configurations
const css = require('./css/css.config.js');    // all css file related build configurations
const img = require('./img/img.config.js');    // all img/svg related build configurations
const html = require('./html/html.config.js'); // all html related build configurations
const alias = require('./alias.config.js');    // all file path alias helper configurations

// main config object
const config = {
  entry: {
    assets: './build/assets.js',
    guide: './build/guide.js'
  },
  output: {
    path: path.resolve(__dirname, '../../dist'), // sets default location for all compiled files
    publicPath: '/',                             // sets a default public location (required by react-routes)
    filename: './assets/js/[name].js'           // sets filename of bundled .js file (relative to output.path config)
  },
  module: { 
    rules: [
      ...js.config,   // see build/config/js/js.config.js
      ...html.config, // see build/configs/htlm/html.config.js
      ...css.config,  // see build/config/css/css.config.js
      ...img.config   // see build/config/img/img.config.js
    ]
  },
  plugins: [
    ...js.plugins,    // see build/config/js/js.config.js
    ...html.plugins,  // see build/configs/htlm/html.config.js
    ...css.plugins,   // see build/config/css/css.config.js
    ...img.plugins,   // see build/config/img/img.config.js
    ...alias.plugins  // see build/config/alias.config.js
  ],
  resolve: {
    alias: alias.config, // resolve alias namespaces to webpack resolver (see build/configs/alias.config.js)
    extensions: ['.js', '.jsx', '.json', '.css'], // limit alias to these file types (order matters here; css last)
    enforceExtension: false // allows importing of files without file's extension 
  },
  optimization: {
    minimize: false // allows js bundles to be minified or not. Default is off, but production builds turns this on below.
  }
};

// config export
// pre-export config object customize based on a build types (production or development).
module.exports = (env, argv) => {
  // Try to keep build types limited to the default 'development' and 'production'.

  // CUSTOMIZE DEVELOPMENT BUILDS
  if (argv.mode === 'development') {
    // Configures a fallback for webpack-dev-server in order to use react-routes
    config.devServer = { historyApiFallback: true };
  }

  // CUSTOMIZE PRODUCTION BUILDS
  if (argv.mode === 'production') {
    // Produciton builds turn JS minification on.
    // Remove this line if production builds ought not to be minified.
    config.optimization.minimize = true;
    
    // Pushes the CleanWebPackPluging into our config.plugins object to clean our dist folder
    config.plugins.push(
      new CleanWebpackPlugin(
        [config.output.path],
        {
          'root': path.resolve(config.output.path, '../') // re-focus CleanWebpackPlugin's root out of build/config/
        }
      )
    );

    // Pushes the CopyWebpackPlugin into our config.plugins object to copy over url_rewrite files
    // These web.config files and .htaccess files are used when production build files are hosted on a real server
    // without these files (respectively), the guide.js's use of react-router will not work.
    const serverUrlRewriteTypes = ['web.config', '.htaccess'];
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../scaffolding/web.config'), // for IIS servers
          to: config.output.path
        }
        //{
        //  from: path.resolve(__dirname, '../scaffolding/.htaccess'), // For apache servers
        //  to: config.output.path
        //}
      ])
    );
  }

  // finally exports config object
  return config;
};
