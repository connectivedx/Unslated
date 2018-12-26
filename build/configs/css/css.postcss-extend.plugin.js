// Simple little plugin that allows the use of @extend class|id|selector to extend another section of CSS.
// This works by searching for requested selecor, and then taking requested @extend's parent selector and combining it with requested selector.
// There are two methods available with extend

// @extend - basic extends of one very specific selector.
// @extend-all - deep extends of all matching selector instances (including requested's children selectors).

const postcss = require('postcss');
module.exports = postcss.plugin('postcss-extend', (options) => {
  options = options || {
    preserve: false
  };

  return (root) => {
    // Shared method to do the actual work of extending one selector(s) onto another
    const extendSelectors = (extendRule, lookupRule, lookupSelector, matchingSelector) => {
      // CSS can have comma delminated selectors.
      // We must split them up into unique selectors prior to extending.
      const selectors = extendRule.parent.selector.split(',');
      Object.keys(selectors).map(index => {
        lookupRule.selector += (',' + matchingSelector.replace(lookupSelector, selectors[index].trim()));
      });
    };

    root.walkAtRules(extendRule => {
      if(extendRule.name.indexOf('extend') === -1) { return; }
      const lookupSelector = extendRule.params.trim();
      root.walkRules(lookupRule => {
        const matchingSelector = lookupRule.selector.trim();
        if (extendRule.name.indexOf('extend-all') === -1) { 
          // extend
          if (matchingSelector === lookupSelector) {
            extendSelectors(extendRule, lookupRule, lookupSelector, matchingSelector);
          }
        } else { 
          // extend-all
          if (matchingSelector.indexOf(lookupSelector) !== -1) {
            extendSelectors(extendRule, lookupRule, lookupSelector, matchingSelector);
          }
        }
      });

      extendRule.remove(); // once we are done extending, we already remove the extend rule
    });
  };
});