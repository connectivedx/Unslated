/*
  Main configuration entry for bundling CSS, Fonts, HTML, Images and JavaScript.
  This main configuration entry is responsible for both production assets and component guide assets.
*/

// devDependencies
const fs = require('fs-extra');
const path = require('path');
const Package = require('../../package.json');
const { WebpackHooks } = require('./webpack/webpack.plugins');

// build configuration files
const js = require('./js/js.config.js');                // all js file related build configurations
const css = require('./css/css.config.js');             // all css file related build configurations
const img = require('./img/img.config.js');             // all img/svg related build configurations
const font = require('./font/font.config.js');          // all font related build configurations
const alias = require('./webpack/alias.config.js');     // all file path alias helper configurations
const stats = require('./webpack/stats.config.js');     // all terminal stats configurations

// main config object
const config = {
  entry: {
    assets: './build/assets.jsx'
  },
  output: {
    path: path.resolve(__dirname, `../../dist`), // sets default location for all compiled files
    publicPath: Package.directories.publicPath,  // sets a default public location (required by react-routes)
    filename: `${Package.directories.assetPath}/js/[name].js`,            // sets filename of bundled .js file (relative to output.path config)
    pathinfo: false
  },
  module: {
    rules: [
      ...css.config,  // see build/config/css/css.config.js
      ...js.config,   // see build/config/js/js.config.js
      ...img.config,  // see build/config/img/img.config.js
      ...font.config  // see build/config/font/font.config.js
    ]
  },
  plugins: [
    ...css.plugins,   // see build/config/css/css.config.js
    ...js.plugins,    // see build/config/js/js.config.js
    ...img.plugins,   // see build/config/img/img.config.js
    ...font.plugins,  // see build/config/font/font.config.js
    ...alias.plugins,  // see build/config/alias.config.js,
    new WebpackHooks({
      beforeCompile: () => {
        // Clean dist location
        fs.remove(
          path.resolve(__dirname, `../../dist`),
          err => {
            if (err) {
              return console.error(err);
            }
          }
        );
      },
      done: () => {
        // If output location is not dist, we copy results from dist
        if (Package.directories.dest !== 'dist') {
          // Clean configured output location
          fs.remove(
            path.resolve(__dirname, `../../${Package.directories.dest}/${Package.directories.assetPath}/img`),
            (cleanError) => {
              if (cleanError) { console.log(cleanError); }
              // Copy from /dist to configured output location
              fs.copy(
                path.resolve(__dirname, `../../dist`),
                path.resolve(__dirname, `../../${Package.directories.dest}`),
                (copyError) => {
                  if (copyError) { console.log(copyError); }
                  // Clean away web.config
                  fs.remove(
                    path.resolve(
                      __dirname,
                      `../../${Package.directories.dest}/web.config`
                    )
                  );
                }
              );
            }
          );
        }
      }
    })
  ],
  ...stats.config,    // see build/configs/webpack/stats.config.js
  resolve: {
    alias: alias.config,                           // resolve alias namespaces (see build/configs/alias.config.js)
    extensions: ['.js', '.jsx', '.json', '.css'],  // limits alias to these file types (order matters here; css last)
    enforceExtension: false                        // allows importing of files without file's extension usage
  },
  performance: {
    maxAssetSize: 170000,
    assetFilter: (asset) => {
      if (asset.match('guide.js')) {
        return false;
      }

      return asset.match('assets.js');
    }
  },
  devtool: false,
  optimization: {
    minimize: Package.optimize.js
  }
};

// Prod config customizing
module.exports = (env, argv) => {
  // Set SVG Spritely url to publicPath for production builds
  Object.keys(config.plugins).map((i) => {
    const imgPlugin = config.plugins[i];
    if (imgPlugin.constructor.name === 'WebpackSvgSpritely') {
      imgPlugin.options.url = `${Package.directories.publicPath}${Package.directories.assetPath}/img/${imgPlugin.options.filename}`;
    }
  });

  return config;
};
