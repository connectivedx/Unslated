import colors from '@vars/colors';
import chroma from 'chroma-js';
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

// Builds color object for chroma module
const getChromaColor = (color) => {
  const chromaObj = {
    hex: '',
    rgb: { r: '', g: '', b: '' },
    hsl: { h: '', s: '', l: '' }
  };

  const isHex = (color.indexOf('#') !== -1);
  const isRGB = (color.indexOf('rgb') !== -1);
  const isHLS = (color.indexOf('hls') !== -1);

  /* if color is a simple hex */
  if (isHex) {
  	// applies color as a hex to chromaObj.hex
    chromaObj.hex = color;

    // converts hex into rgb and applies to chromaObj.rgb
    [...chromaObj.rgb] = chroma(color).rgb();

    // converts hex into hls and applies to chromaObj.hls
    [...chromaObj.hsl] = chroma(color).hsl();

  /* if color is rbg(a) */
  } else if (isRGB) {
  	// rgb object
    const rgba = color.split('(')[1].split(')')[0].split(',');

    // rgb parts variables
    const red = parseInt(rgba[0], 10);
    const green = parseInt(rgba[1], 10);
    const blue = parseInt(rgba[2], 10);
    const alpha = ((parseInt(rgba[3], 10) * 255).toFixed() / 1).toString(16);

    // applies rgb(a) to chromaObj.rgb
    [...chromaObj.rgb] = rgba;

    // converts rgb into hex, and applies hex to chromaObj.hex (with or without alpha)
    if (alpha) {
      chromaObj.hex = ([
      	chroma(chroma(red, green, blue).hex()), 
      	(alpha < 10) ? `0${alpha}` : alpha
      ].join(''));
    } else {
      chromaObj.hex = chroma(red, green, blue).hex();
    }

    // capture HSL colors as fallback
    [...chromaObj.hsl] = chroma(chromaObj.hex).hsl();
  }

  return chromaObj;
};

// Flags colors based on WCAG ratio, size and level specs
const WCAGTest = (ratio, size, level) => {
  console.log(ratio, size, level);
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
  if (key.match('alpha')) { return; }

	const color = getChromaColor(colors[key]);
	if (!color.hex) { return; }

	return <List__item key={key}>
		<div>
      <AccessibilityLevel 
      	contrastPrimary={chroma.contrast(color.hex, colors['--color-text--primary'])} 
      	contrastSecondary={chroma.contrast(color.hex, colors['--color-text--secondary'])} 
      	level="AA" 
      />
      <AccessibilityLevel 
      	contrastPrimary={chroma.contrast(color.hex, colors['--color-text--primary'])}
      	contrastSecondary={chroma.contrast(color.hex, colors['--color-text--secondary'])}
      	level="AAA"
      />

			<div style={{backgroundColor: colors[key], width: '120px', height: '120px' }} />

			<div>
				{colors[key]}
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
