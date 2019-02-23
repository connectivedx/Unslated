// Terminal stats config (see: https://webpack.js.org/configuration/stats/)

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
  plugins: []
};
