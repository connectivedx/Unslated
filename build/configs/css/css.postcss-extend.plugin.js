// Simple little plugin that allows the use of @extend class|id|selector to extend another section of CSS.

const postcss = require('postcss');

module.exports = postcss.plugin('postcss-extend', (options) => {
  options = options || {
    preserve: false
  };

  return (root) => {
    root.walkAtRules('extend', extendRule => {
      const lookupSelector = extendRule.params.trim();
      root.walkRules(lookupRule => {
        const matchingSelector = lookupRule.selector.trim();

        if (matchingSelector.indexOf(lookupSelector) !== -1) {

          const combined = matchingSelector.replace(lookupSelector, extendRule.parent.selector);
          lookupRule.selector += [',', combined].join('');
        }
      });

      extendRule.remove();
    });
  };
});