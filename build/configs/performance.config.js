// Bundling performance and optimization config
// Configuration settings used to tune output minification and bundle stats.

module.exports = {
  config: {
    optimization: {
      minimize: false // main js files (assets.js/guide.js). (production builds use minification; see webpack.config.js)
    },
    performance: { hints: false }, // disables / enables bundle size warnings
    stats: {
      all: false, // enables / disabled all webpack bundle stats
      modules: true, // enable / disable all module bundle stats
      maxModules: 4, // limits number of modules stats
      errors: true, // enable / disable bundle error messages
      warnings: true, // enable / disable bundle warning messages
      moduleTrace: true, // enable / disable bundle module tracing
      errorDetails: true, // enable / disable bundle error details
      modulesSort: 'issuer'     
    }, 
    devServer: {
      stats: {
        stats: 'errors-only' // enable / disable dev server stats
      }
    }
  }
};
