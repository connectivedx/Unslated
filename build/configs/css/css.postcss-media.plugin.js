// Due to postcss-custom-media plugin just not wokring anylonger
// this is a quick little plugin to still support custom media queries


// Order of operation matters here:
// 1) collect all :export declirations that contain breakpoints into an object for later use.
// 2) replace all instances of @media (--var-name) with collection matches.
// 3) return results and rejoice.

const postcss = require('postcss');
const queries = [];

module.exports = postcss.plugin('postcss-custom-media', (options) => {
  options = options || {
    preserve: false
  };
  return (root) => {

    root.walkRules(':export', (rule) => {
      rule.walkDecls(decl => {
        const variable = decl.prop;
        const value = decl.value;
        if (value.indexOf('only screen and') !== -1 ||
          value.indexOf('screen and') !== -1 ||
          value.indexOf('only print and') !== -1 ||
          value.indexOf('print and') !== -1) {
          queries[variable] = value;
        }
      });
    });

    root.walkAtRules('media', (rule) => {
      const variable = rule.params.replace(/\((.*)\)/g, '$1');
      Object.keys(queries).map(key => {
        if (key === variable) {
          rule.params = queries[key];
        }
      });
    });
  };
});
