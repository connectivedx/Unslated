// Simple little plugin that takes colors within a :export selector and copies them over to a :root selector.
// This allows for importing of the colors file into JS files as a object of colors, but also still use colors in our stylesheets.

// Order of operation matters here:
// 1) collect all :export declirations that contain breakpoints into an object for later use.
// 2) insert a new :root and dump the color collection into newly created :root.
// 3) return results and rejoice.

const postcss = require('postcss');
const colors = [];
module.exports = postcss.plugin('postcss-colors', (options) => {
  options = options || {
    preserve: false
  };
  return (root) => {

    root.walkRules(':export', (rule) => {
      rule.walkDecls(decl => {
        const variable = decl.prop;
        const value = decl.value;
        if (variable.indexOf('--color') !== -1) {
          colors[variable] = value;
        }
      });
      rule.append('--color-exports: true;');
      root.append(':root {}');
      Object.keys(colors).map(index => {
        root.last.append([index, ':', colors[index], ';'].join(''));
      });
    });
  };
});