const postcss = require('postcss');
const path = require('path');

module.exports = postcss.plugin('postcss-rems', (options) => {
  options = options || {};
  let baseSize = undefined;

  return root => {
    root.walkRules(':root', rule => {
      rule.walkDecls(decl => {
        if (decl.prop === '--type-size--default') {
          baseSize = parseInt(decl.value, 10);
        }
      })
    })

    root.walkDecls(decls => {
      if (decls.value.indexOf('rem(') !== -1) {

        let instances = decls.value.match(/rem\(.*?\)/g);
        let i = instances.length;       
        while (i--) {
          try {
            let rawUnit = parseInt(instances[i].replace(/(.*)\((.*)\)/g, '$2'), 10);
            console.log(rawUnit);
            decls.value = decls.value.replace(instances[i], `${rawUnit / baseSize}rem`);
            console.log(decls.value);
          } catch (err) { console.log(err); }
        }
      }
    })
  }
});