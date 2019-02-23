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
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return [Math.round(bytes / (1024 ** i), 2), ' ', sizes[i]].join('');
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

            /* fetch(file).then((res) => {
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
                  time: [(receiveTime - sendTime), 'ms'].join('')
                };
              }

              callback(faces);
            }); */

            return false;
          });

          const grabContent = (url, key, time) => fetch(url)
            .then((res) => res.blob())
            .then((face) => {
              faces[key].size = bytesToSize(face.size);
              faces[key].type = face.type;
              faces[key].time = [((new Date()).getTime() - time), 'ms'].join('');
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
            time: [(receiveTime - sendTime), 'ms'].join('')
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
    return hex.length === 1 ? ['0', hex].join('') : hex;
  };

  return ['#', hexConvert(color[0]), hexConvert(color[1]), hexConvert(color[2])].join('');
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
  CORE: Recursive gathering of folders from a directory
*/

const readDirectory = (context) => {
  const collection = [];
  context.keys().forEach((key) => {
    collection[key] = context(key);
    return true;
  });

  return collection;
};

/*
  CORE: Gathering pages
*/

const getPages = (page = false) => {
  const allPages = readDirectory(require.context('../../src/pages/', true, /\.jsx$/));
  const collection = [];
  Object.keys(allPages).map((key) => {
    if (page) {
      if (key.indexOf(page) === -1) { return false; }
    }
    collection[key] = allPages[key].default;
    return false;
  }).filter((n) => n);

  if (page) {
    return collection[Object.keys(collection)[0]];
  }

  return collection;
};


/*
  CORE: Gathering tools
*/

const getTools = (tool = false) => {
  const allTools = readDirectory(require.context('./tools/', true, /\.jsx$/));
  const collection = {};
  Object.keys(allTools).map((key) => {
    if (tool) {
      if (key.indexOf(tool) === -1) { return false; }
    }
    collection[key] = allTools[key].default;
    return false;
  }).filter((n) => n);

  if (tool) {
    return collection[Object.keys(collection)[0]];
  }

  return collection;
};


/*
  CORE: Gathering specific JSX file's documentation
*/

const getJSXDocumentation = (name) => {
  const allJSXDocs = require.context(
    '!!docgen-loader?htmlDescription!../../src/elements/',
    true,
    /\.jsx/
  );
  const keys = allJSXDocs.keys();
  let i = keys.length;
  while (i--) {
    if (keys[i].indexOf('test') === -1 || keys[i].indexOf('example') !== -1) {
      if (keys[i].indexOf(name) !== -1) {
        return allJSXDocs(keys[i]);
      }
    }
  }
  return false;
};

const getJSDocumentation = (name) => {
  const allJSDocs = require.context(
    '!!./plugins/webpack.jsdocgen.loader?htmlDescription!../../src/elements/',
    true,
    /^.*\.(js)$/
  );

  const keys = allJSDocs.keys();
  let i = keys.length;
  while (i--) {
    if (keys[i].indexOf(name) !== -1) {
      return allJSDocs(keys[i]);
    }
  }
  return false;
};

/*
  CORE: Gathering all or single element from elements directory
*/

const getElements = (element = false) => {
  const allElements = readDirectory(require.context(
    '../../src/elements/',
    true,
    /^((?!test|example).)*jsx$/
  ));

  const collection = {};
  Object.keys(allElements).map((key) => {
    if (element) {
      if (key.indexOf(element) === -1) { return false; }
    }
    collection[key] = allElements[key];
    return false;
  }).filter((n) => n);
  if (element) {
    return collection[Object.keys(collection)[0]];
  }
  return collection;
};

/*
  CORE: Gathering all or single example from elements directory
*/

const getExamples = (element = false) => {
  const allExamples = readDirectory(require.context('../../src/elements/', true, /\.example.jsx$/));
  return Object.keys(allExamples).map((key) => {
    const path = ['../../src/elements', key.split('.').slice(0, -1).slice(0, -1).pop(), '.jsx'].join('');

    // you shall not pass!... without a path.
    if (!path) { return false; }

    // are we getting all elements examples, or single elements examples?
    if (element) {
      if (key.indexOf(element) === -1) { return false; }
    }

    const data = {
      name: key.split('/').slice(-1)[0].split('.')[0],
      atomic: key.replace('./', '').split('/')[0],
      url: ['examples', key.split('.').slice(0, -1).slice(0, -1).pop()].join(''),
      examples: [...allExamples[key].default][0].examples,
      element: getElements(key.split('/').slice(-1)[0].split('.')[0])
    };

    if (getJSXDocumentation(data.name)) {
      if (getJSXDocumentation(data.name).length) {
        data.jsxdocs = { ...getJSXDocumentation(data.name)[0] };
      }
    } else {
      data.jsxdocs = undefined;
    }

    if (getJSDocumentation(data.name)) {
      if (getJSDocumentation(data.name).length) {
        data.jsdocs = getJSDocumentation(data.name);
      }
    } else {
      data.jsdocs = undefined;
    }

    return data;
  });
};


module.exports = {
  getPages,
  getTools,
  getExamples,
  getFontMetrics,
  getJSXDocumentation,
  bytesToSize,
  WCAGTest,
  getColorUnits,
  getColorContrast,
  getColorLuminanace,
  RGBToHex,
  HexToRGB,
  cleanColorVariables
};
