/*
  Build terminal statistics configuration
  (see: https://webpack.js.org/configuration/stats/)
*/
const { MetricsBundle } = require('./webpack.plugins.js');

module.exports = {
  config: {
    stats: {
      all: false,
      modules: true,
      maxModules: 40,
      errors: true,
      warnings: true,
      moduleTrace: true,
      errorDetails: true
    }
  },
  plugins: [
    new MetricsBundle()
  ]
};
