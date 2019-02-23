// Simple little plugin that clears away no longer needed :root declarations

const postcss = require('postcss');

module.exports = postcss.plugin('postcss-vars', (options) => {
  options = options || {};

  return root => {
    root.walkRules(':root', rule => {
      if (rule.parent.source.input.file.indexOf('colors.css') !== -1) { return; }
      rule.remove();
    });
  };
});
