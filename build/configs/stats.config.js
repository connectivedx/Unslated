// Bundling stats config
// Tune terminal stats, bundle minification and devServer configs.
module.exports = {
  config: {
    optimization: {
      // Minimizes our bundled JS
      minimize: false // dev = false, prod = true (See webpack.config.js for production overload)
    },
    performance: { hints: false }, // disables / enables bundle size warnings
    stats: {
      all: false,
      modules: true,            // enable / disable all module bundle stats
      maxModules: 2,            // limits number of modules stats
      errors: true,             // enable / disable bundle error messages
      warnings: true,           // enable / disable bundle warning messages
      moduleTrace: true,        // enable / disable bundle module tracing
      errorDetails: true        // enable / disable bundle error details    
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false
        },
        '/speeds': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false
        }        
      }
    }
  },
  plugins: []
};
