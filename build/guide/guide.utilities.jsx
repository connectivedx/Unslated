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

const getPages = () => {
  const pages = readDirectory(require.context('../../src/pages/', true, /\.jsx$/));

  if (pages) {
    return pages;
  }

  return true;
};


/*
  CORE: Gathering examples from elements directory
*/

const getExamples = () => {
  const allExamples = readDirectory(require.context('../../src/elements/', true, /\.example.jsx$/));
  return [
    Object.keys(allExamples).map((key) => {
      const name = key.split('/').slice(-1)[0].split('.')[0];
      const url = ['examples', key.split('.').slice(0, -1).slice(0, -1).pop()].join('');
      const { ...doc } = allExamples[key].default[0].docs;
      const atomic = key.replace('./', '').split('/')[0];
      const examples = [...allExamples[key].default][0];

      return {
        url,
        atomic,
        name,
        examples: examples.examples,
        docs: doc[0] || {
          displayName: name,
          description: (atomic === 'modifiers')
            ? 'Modifiers are CSS or JS based design patterns that are both simple, and reusable across the project.'
            : atomic
        }
      };
    })
  ];
};


module.exports = {
  getPages,
  getExamples,
  bytesToSize,
  WCAGTest,
  getColorUnits,
  getColorContrast,
  getColorLuminanace,
  RGBToHex,
  HexToRGB,
  cleanColorVariables
};
