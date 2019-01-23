// Takes custom :export and transpiles them into :root for further var POSTCSS processing.

const postcss = require('postcss');
const colors = [];
module.exports = postcss.plugin('postcss-colors', (options) => {
  options = options || {};

  return (root) => {
    root.walkRules(':export', (rule) => {
      rule.selector = ':root';
      rule.append('--css-exports: true;');
    });
  };
});