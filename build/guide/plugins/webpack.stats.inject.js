class StatsInject {
  // Alex helps track down location of build errors.
  apply(compiler) {    
    compiler.hooks.afterCompile.tap({name:'StatsInject'}, complation => {
      console.log(complation.assets);
    });
  }
}

module.exports = StatsInject;