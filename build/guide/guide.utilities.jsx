/*
  !!!!!!!!!!THIS IS ONLY FOR GUIDE PARTIALS!!!!!!!!!!
  !!!!!!!!!DO NO USE METHODS HERE IN ASSETS.JS!!!!!!!

  IMPORTANT NOTE: Never remove any methods marked "CORE:" as they are dependencies for the framework.
*/

/*
  CORE: Helper method to convert raw int into bytes, kb or kb for display.
*/

const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) { return '0 Byte'; }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / (1024 ** i), 2)} ${sizes[i]}`;
};

/*
  CORE: Helper method to gather local or remote font-file metrics.
*/

const getFontMetrics = (callback) => {
  // Gather Fonts Metrics
  const rules = document.styleSheets[0].cssRules;
  const faces = [];

  // const faceFiles = [];
  Object.keys(rules).map((index) => {
    const rule = rules[index];
    const { type } = rule;

    // Remotly imported font-face files
    if (type === 3) {
      fetch(rule.href).then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.text();
      })
        .then((text) => {
          const importRules = text.split('}');

          Object.keys(importRules).map((j) => {
            if (!importRules[j].match(/font-family: (.*?);/gm)) { return false; }
            const name = importRules[j].match(/font-family: (.*?);/gm)[0].replace(/font-family: (.*?);/g, '$1');
            const file = importRules[j].match(/url\((.*?)\)/gm)[0].replace(/url\((.*?)\)/g, '$1');
            const weight = importRules[j].match(/local\((.*?)\)/gm)[0].replace(/local\((.*?)\)/g, '$1');
            const time = (new Date()).getTime();

            faces[name] = {
              weight,
              file,
              time
            };

            return false;
          });

          const grabContent = (url, key, time) => fetch(url)
            .then((res) => res.blob())
            .then((face) => {
              faces[key].size = bytesToSize(face.size);
              faces[key].type = face.type;
              faces[key].time = `${((new Date()).getTime() - time)}ms`;
            });

          Promise
            .all(Object.keys(faces).map((key) => grabContent(faces[key].file, key, (new Date()).getTime())))
            .then(() => callback(faces));
        });
    }

    // Locally hosted font-face files
    if (type === 5) {
      const name = rule.cssText.replace(/(.*?)font-family:(.*?);(.*?)}/g, '$2').trim();
      const file = rule.cssText.match(/url\((.*?)\)/gm)[0].replace(/url\((.*?)\)/g, '$1').replace(/"(.*?)"/g, '$1');
      const weight = rule.cssText.match(/local\((.*?)\)/gm)[0].replace(/local\((.*?)\)/g, '$1');
      const sendTime = (new Date()).getTime();

      fetch(file).then((res) => {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }
        return res.blob();
      }).then((fontTest) => {
        if (!faces[name]) {
          const receiveTime = (new Date()).getTime();
          faces[name] = {
            weight,
            file,
            size: bytesToSize(fontTest.size),
            type: fontTest.type,
            time: `${(receiveTime - sendTime)}ms`
          };
        }

        callback(faces);
      });
    }
    return false;
  });
};

/*
  CORE: Helps clean color variables upon import
*/

const cleanColorVariables = (colors) => {
  Object.keys(colors).map((key) => {
    if (colors[key].indexOf('var') !== -1) {
      const variable = colors[key].replace('var(', '').replace(')', '');
      colors[key] = colors[variable];
    }
    return true;
  });
  return colors;
};

/*
  CORE: Converts HEX to RGB
*/

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

/*
  CORE: Converts RGB color to HEX
*/

const RGBToHex = (color) => {
  const hexConvert = (rgb) => {
    const hex = rgb.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${hexConvert(color[0])}${hexConvert(color[1])}${hexConvert(color[2])}`;
};

/*
  CORE: Returns the luminance score of a color (must be rgb value);
*/

const getColorLuminanace = (r, g, b) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : ((v + 0.055) / 1.055) ** 2.4;
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/*
  CORE: Returns the contrast score of one color against project's primary colors
*/

const getColorContrast = (controlcolor, testcolor) => {
  const controlRGB = HexToRGB(controlcolor);
  const testRGB = HexToRGB(testcolor);

  let result = (getColorLuminanace(testRGB[0], testRGB[1], testRGB[2]) + 0.05) / (getColorLuminanace(controlRGB[0], controlRGB[1], controlRGB[2]) + 0.05);
  if (result < 1) result = 1 / result;
  return result;
};

/*
  CORE: Builds and returns an object that contains hex, and rgb color units of a given color (can supply hex or rgb)
*/

const getColorUnits = (color) => {
  const chromaObj = {
    hex: '',
    rgb: { r: '', g: '', b: '' },
    hsl: { h: '', s: '', l: '' }
  };

  const isHex = (color.indexOf('#') !== -1);
  const isRGB = (color.indexOf('rgb') !== -1);
  const isHLS = (color.indexOf('hls') !== -1);

  /* if color is a simple hex */
  if ((isHex || !isHex) && !isRGB && !isHLS) {
    // applies color as a hex to chromaObj.hex
    chromaObj.hex = color;

    // converts hex into rgb and applies to chromaObj.rgb
    [...chromaObj.rgb] = HexToRGB(color);

    // converts hex into hls and applies to chromaObj.hls
    // [...chromaObj.hsl] = chroma(color).hsl();

  /* if color is rbg(a) */
  } else if (isRGB) {
    // rgb object
    const rgb = color.split('(')[1].split(')')[0].split(',');

    // rgb parts variables
    const red = parseInt(rgb[0], 10);
    const green = parseInt(rgb[1], 10);
    const blue = parseInt(rgb[2], 10);

    // applies rgb(a) to chromaObj.rgb
    [...chromaObj.rgb] = rgb;

    // converts rgb into hex, and applies hex to chromaObj.hex (with or without alpha)
    chromaObj.hex = RGBToHex([red, green, blue]);

    // capture HSL colors as fallback
    // [...chromaObj.hsl] = chroma(chromaObj.hex).hsl();
  }

  return chromaObj;
};

/*
  CORE: Flags colors based on WCAG ratio, size and level specs
*/

const WCAGTest = (ratio, size, level) => {
  switch (level) {
    case 'A':
      return 'PASS';
    case 'AA':
      if (size === 'large' && ratio > 3) {
        return 'PASS';
      }

      if (size === 'large--bold' && ratio > 3) {
        return 'PASS';
      }

      if (size === 'normal' && ratio > 4.5) {
        return 'PASS';
      }

      return 'FAIL';

    case 'AAA':
      if (size === 'large' && ratio > 4.5) {
        return 'PASS';
      }

      if (size === 'large--bold' && ratio > 4.5) {
        return 'PASS';
      }

      if (size === 'normal' && ratio > 7) {
        return 'PASS';
      }

      return 'FAIL';

    default:
      if (size === 'large' && ratio > 3) {
        return 'PASS';
      }

      if (size === 'normal' && ratio > 4.5) {
        return 'PASS';
      }

      return 'FAIL';
  }
};


/*
  CORE: Formats XML type languages for guide example(s) GuideUtils.XMLFormat(string);
  Please note, this can't be used on JSX syntax as it normalizes the tags to being lowercase
*/

const XMLParser = (node, level) => {
  let textNode;
  const indentBefore = new Array(level++ + 1).join('  ');
  const indentAfter = new Array(level - 1).join('  ');

  for (let i = 0; i < node.children.length; i++) {
    if (level !== 1) {
      textNode = document.createTextNode(`\n ${indentBefore}`);
      node.insertBefore(textNode, node.children[i]);
    }

    XMLParser(node.children[i], level);

    if (node.lastElementChild === node.children[i] && level !== 1) {
      textNode = document.createTextNode(`\n ${indentAfter}`);
      node.appendChild(textNode);
    }
  }

  return node;
};

const XMLFormat = (string) => {
  const div = document.createElement('div');
  div.innerHTML = string.replace((/ {2}|\r\n|\n|\r/gm), '').trim();
  return XMLParser(div, 0).innerHTML.replace(/^\s+|\s+$/g, '');
};


/*
  CORE: Converts a react JSX element to JSX RAW source and formats it for guide example(s).
  Pleaes note, this is the opposite of ReactDOMServer.renderStaticMarkup
*/

const JSXFormat = (element, options) => {
  // private methods
  const getName = (el) => {
    const { type } = el;
    if (type.displayName) {
      return type.displayName;
    }
    if (type.name) {
      return type.name;
    }
    if (typeof type === 'string') {
      return type;
    }
    return 'Unknown';
  };

  const isDefaultProp = (el, prop, value) => {
    if (!el.type.defaultProps) {
      return false;
    }
    return el.type.defaultProps[prop] === value;
  };

  const getProps = (el, config) => Object.keys(el.props || {}).map((prop) => {
    let val = el.props[prop];

    if (prop === 'children' || isDefaultProp(el, prop, val)) {
      return '';
    }

    if (typeof val === 'string') {
      return ` ${prop}=${JSON.stringify(val)}`;
    }

    if (React.isValidElement(val)) {
      val = JSXFormat(val, config); // eslint-disable-line
    }

    if (typeof val === 'object') {
      val = JSON.stringify(val);
    }

    if (typeof val === 'function') {
      val = `${(val.name || ' function')}()`;
    }

    return ` ${prop}={${val}}`;
  }).join('');

  const getChild = (el, config) => {
    if (React.isValidElement(el)) {
      return JSXFormat(el, config); // eslint-disable-line
    }

    if (el == null || el === false) {
      return '';
    }

    return String(el);
  };

  const getChildren = (el, config) => {
    const { children } = el.props;
    if (!children) { return ''; }

    const nodes = [];

    React.Children.forEach(children, (child) => {
      nodes.push(getChild(child, config)); // eslint-disable-line
    });

    return `\n${nodes.filter(Boolean).join('\n').replace(/^(?!\s*$)/gm, ' '.repeat(2))}\n`;
  };

  // get props
  const props = getProps(element);

  // get name
  let name = getName(element);

  if (!name) {
    if (options.displayName) {
      name = options.displayName;
    }
  }

  if (!name) { name = 'Unknown'; }

  // get children
  const children = getChildren(element, options);
  if (children.length > 0) {
    return `<${name}${props}>${children}</${name}>`;
  }

  return `<${name}${props} />`;
};

module.exports = {
  bytesToSize,
  cleanColorVariables,
  getColorContrast,
  getColorLuminanace,
  getColorUnits,
  getFontMetrics,
  JSXFormat,
  XMLFormat,
  HexToRGB,
  RGBToHex,
  WCAGTest
};
