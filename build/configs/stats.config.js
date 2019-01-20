// Bundling stats config
// Tune terminal stats, bundle minification and devServer configs.

const path = require('path');
const Webpack = require('webpack');
const PerformanceStats = require('../guide/plugins/webpack.performance.stats.js');
//const Package = require('../../package.json');

module.exports = {
  config: {
    optimization: {
      // Minimizes our bundled JS
      minimize: false // dev = false, prod = true (See webpack.config.js for production overload)
    },
    performance: { hints: false }, // disables / enables bundle size warnings
    stats: {
      all: false,
      modules: true, // enable / disable all module bundle stats
      maxModules: 2, // limits number of modules stats
      errors: true, // enable / disable bundle error messages
      warnings: true, // enable / disable bundle warning messages
      moduleTrace: true, // enable / disable bundle module tracing
      errorDetails: true, // enable / disable bundle error details
      modulesSort: 'issuer',
      warningsFilter: (warning) => {
        if (warning.indexOf('Tapable.plugin is deprecated') !== -1) {
          return false;
        }
        return true;
      }     
    }, 
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false
        }
      }
    }
  },
  plugins: [
    new PerformanceStats() // Stats plugin to collect objects for style guide.
  ]
};
