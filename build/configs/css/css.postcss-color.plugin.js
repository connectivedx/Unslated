// Takes a color() function with hex color and alters the hex color.

const postcss = require('postcss');
module.exports = postcss.plugin('postcss-color', (options) => {
  options = options || {};

  const HexToRGB = (color) => {
    color = color.replace('#', '');
    if (color.length < 6) {
      color += color;
    }

    return [
      parseInt(color.substr(0, 2), 16),
      parseInt(color.substr(2, 2), 16),
      parseInt(color.substr(4, 2), 16)
    ];
  };

  const RGB_Linear_Shade = (color, percent) => {
    let intParse = parseInt;
    let intRound = Math.round;

    let e = (intParse(color[0]) === 0) ? 1 : color[0];
    let f = (intParse(color[1]) === 0) ? 1 : color[1];
    let g = (intParse(color[2]) === 0) ? 1 : color[2];
    let h = (intParse(color[3]) === 0) ? 1 : color[3];

    let q = percent < 0;
    let t = q ? 0 : 255 * percent;
    q = q ? 1 + percent : 1 - percent;
    return [
      'rgb',
      (h ? 'a(' : '('),
      intRound(intParse(e) * (q + t)),
      ',',
      intRound(intParse(f) * (q + t)),
      ',',
      intRound(intParse(g) * (q + t)),
      (h ? ',' + h : ')')
    ].join('');
  }

  return (root) => {
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        if (decl.value.indexOf('color(') !== -1) {
          const colors = decl.value.match(/color\((.*?)\)/g);
          Object.keys(colors).map((index) => {
            const arguments = colors[index].replace(/^color\((.*?)\)$/, '$1').split(',');
            const color = (arguments[0].length < 7) ? (arguments[0] + arguments[0].replace('#', '')) : arguments[0];
            const brightness = (parseInt(arguments[1]) / 100);

            decl.value = decl.value.replace(colors[index], RGB_Linear_Shade(HexToRGB(color), brightness));
          });
        }
      });
    });
  };
});
