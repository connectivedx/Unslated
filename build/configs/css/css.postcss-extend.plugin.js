// Simple little plugin that allows the use of @extend class|id|selector to extend another section of CSS.

const postcss = require('postcss');
const colors = [];
module.exports = postcss.plugin('postcss-extend', (options) => {
  options = options || {
    preserve: false
  };
  return (root) => {
    const extendParams = [];

    // first gather all our param extends
    root.walkAtRules((extendRule) => {
      if (extendRule.name.trim() === 'extend') { 
        const remover = () => {
          extendRule.remove();
        };

        const lookupSelector = extendRule.params.trim();
        const extended = [];

        root.walkRules((lookupRule) => {
          const matchingSelector = lookupRule.selector.trim();
          if (matchingSelector === lookupSelector) { 
            const nodes = lookupRule.nodes;
            Object.keys(nodes).map(key => {
              extended[nodes[key].prop] = nodes[key].value;
            });
          }
        });

        const cssRules = Object.keys(extended).map(index => {
         return [index, ':', extended[index]].join('');
        }).join(';');

        extendRule.replaceWith(cssRules);
      }
    });
  };
});