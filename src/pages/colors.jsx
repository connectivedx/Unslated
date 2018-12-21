import colors from '!!style-loader!css-loader!@vars/colors';
import { List, List__item } from '@atoms/List/List';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';

// Replaces var(--color-name) with value prior to sampling.
const cleanVariables = (colors) => {
	Object.keys(colors).map(key => {
		if (colors[key].indexOf('var') !== -1) {
			const variable = colors[key].replace('var(', '').replace(')', '');
			colors[key] = colors[variable];
		}
	});
	return colors;
};

const getLuminanace = (r, g, b) => {
    let a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

const HexToRGB = (color) => {
  color = color.replace('#', '');
  if (color.length < 6) {
    color = color + color;
  }

  return [
    parseInt(color.substr(0,2), 16),
    parseInt(color.substr(2,2), 16),
    parseInt(color.substr(4,2), 16)
  ];
}

const RGBToHex = (color) => {
  const hexConvert = (rgb) => {
    let hex = rgb.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  return "#" + hexConvert(color[0]) + hexConvert(color[1]) + hexConvert(color[2]);
};

const getContrast = (controlcolor, testcolor) => {
  const controlRGB = HexToRGB(controlcolor);
  const testRGB = HexToRGB(testcolor);

  let result = (getLuminanace(testRGB[0], testRGB[1], testRGB[2]) + 0.05) / (getLuminanace(controlRGB[0], controlRGB[1], controlRGB[2]) + 0.05);
  if (result < 1) result = 1 / result;
  return result;
}

// Builds hex, and rgb color units for testing purposes

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
  if (isHex || !isHex && !isRGB && !isHLS) {
  	// applies color as a hex to chromaObj.hex
    chromaObj.hex = color;

    // converts hex into rgb and applies to chromaObj.rgb
    [...chromaObj.rgb] = HexToRGB(color);

    // converts hex into hls and applies to chromaObj.hls
    //[...chromaObj.hsl] = chroma(color).hsl();

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
    //[...chromaObj.hsl] = chroma(chromaObj.hex).hsl();
  }

  return chromaObj;
};

// Flags colors based on WCAG ratio, size and level specs
const WCAGTest = (ratio, size, level) => {
  switch (level) {
    case 'A':
      return 'PASS';
    case 'AA':
      if (size === 'large' && ratio > 3) {
        return 'PASS';
      } else if (size === 'large--bold' && ratio > 3) {
        return 'PASS';
      } else if (size === 'normal' && ratio > 4.5) {
        return 'PASS';
      }
      return 'FAIL';

    case 'AAA':
      if (size === 'large' && ratio > 4.5) {
        return 'PASS';
      } else if (size === 'large--bold' && ratio > 4.5) {
        return 'PASS';
      } else if (size === 'normal' && ratio > 7) {
        return 'PASS';
      }
      return 'FAIL';

    default:
      if (size === 'large' && ratio > 3) {
        return 'PASS';
      } else if (size === 'normal' && ratio > 4.5) {
        return 'PASS';
      }
      return 'FAIL';
  }
};

// AccessibilityLevel element performs our tests methods above
const AccessibilityLevel = (props) => {
  const {
    tagName: Tag,
    className,
    variant,
    children,
    contrastPrimary,
    contrastSecondary,
    level,
    ...attrs
  } = props;

  const classStack = Utils.createClassStack([
    'AccessibilityLevel',
    `AccessibilityLevel--${variant}`,
    level === 'A' && 'AccessibilityLevel--single hide',
    level === 'AA' && 'AccessibilityLevel--double',
    level === 'AAA' && 'AccessibilityLevel--triple hide',
    className
  ]);

  const weights = ['normal', 'large--bold', 'large'];

  const createBadges = (type) => {
		return Object.keys(weights).map((key, value) => {
			return (<div key={key} className={`AccessibilityLevel__badge AccessibilityLevel__badge--${type} ${((weights[key] !== 'normal' || level !== 'AA')? 'hide' : '')} AccessibilityLevel__badge--${weights[key]}`}>
	      {WCAGTest((type === 'secondary') ? contrastSecondary : contrastPrimary, weights[key].split('--')[0], level)}
	    </div>);
		});
  };

  return (
    <Tag className={classStack} {...attrs}>
    	{createBadges('primary')}
    	{createBadges('secondary')}
    </Tag>
  );
};

AccessibilityLevel.defaultProps = {
  tagName: 'div',
  level: 'AA',
  variant: 'default'
};

AccessibilityLevel.propTypes = {
  tagName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  className: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
  contrastPrimary: PropTypes.number.isRequired,
  contrastSecondary: PropTypes.number.isRequired,
  level: PropTypes.string
};


const cards = Object.keys(cleanVariables(colors)).map(key => {
	if (colors[key] === 'true') { return; }
  //if (key.match('alpha')) { return; }

	const colorUnits = getColorUnits(colors[key]);

	if (!colorUnits.hex) { return; }

	return <List__item key={key}>
		<div>
      <AccessibilityLevel 
      	contrastPrimary={getContrast(colors['--color-text--primary'], colorUnits.hex)} 
      	contrastSecondary={getContrast(colors['--color-text--secondary'], colorUnits.hex)} 
      	level="AA" 
      />
      <AccessibilityLevel 
      	contrastPrimary={getContrast(colors['--color-text--primary'], colorUnits.hex)}
      	contrastSecondary={getContrast(colors['--color-text--secondary'], colorUnits.hex)}
      	level="AAA"
      />

			<div style={{backgroundColor: colors[key], width: '120px', height: '120px' }} />

			<div>
				{colorUnits.hex}
			</div>
		</div>
		<div>{key.replace('--color-', '')}</div>
	</List__item>
});

const page = () => (
  <div>
    <Rhythm>
      <select className="AccessibilityLevel__controls accessibility__controls-level">
        <option value="AccessibilityLevel--double" defaultValue>AA</option>
        <option value="AccessibilityLevel--triple">AAA</option>
      </select>
      <select className="AccessibilityLevel__controls accessibility__controls-weight">
        <option value="AccessibilityLevel__badge--normal" defaultValue>normal (14pt)</option>
        <option value="AccessibilityLevel__badge--large--bold">large-bold (18pt)</option>
        <option value="AccessibilityLevel__badge--large">large (18pt)</option>
      </select>
    </Rhythm>  
    <List className="colors" variant="blank">{ cards }</List>
  </div>
);

export default page;
