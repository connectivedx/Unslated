//
// See build/guide/guide.utilities.jsx for any GuideUtils methods used below.
//
import colors from '!!style-loader!css-loader!@vars/colors';
import { List, List__item } from '@atoms/List/List';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';

// AccessibilityLevel
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

  const createBadges = (type) => (
    Object.keys(weights).map((key) => (
      <div key={key} className={`AccessibilityLevel__badge AccessibilityLevel__badge--${type} ${((weights[key] !== 'normal' || level !== 'AA') ? 'hide' : '')} AccessibilityLevel__badge--${weights[key]}`}>
        {GuideUtils.WCAGTest((type === 'secondary') ? contrastSecondary : contrastPrimary, weights[key].split('--')[0], level)}
      </div>
    ))
  );

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

const cards = Object.keys(GuideUtils.cleanColorVariables(colors)).map((key) => {
  if (colors[key] === 'true') { return false; }

  const colorUnits = GuideUtils.getColorUnits(colors[key]);

  if (!colorUnits.hex) { return false; }

  return (
    <List__item key={key}>
      <div>
        <AccessibilityLevel
          contrastPrimary={GuideUtils.getColorContrast(colors['--color-text--primary'], colorUnits.hex)}
          contrastSecondary={GuideUtils.getColorContrast(colors['--color-text--secondary'], colorUnits.hex)}
          level="AA"
        />
        <AccessibilityLevel
          contrastPrimary={GuideUtils.getColorContrast(colors['--color-text--primary'], colorUnits.hex)}
          contrastSecondary={GuideUtils.getColorContrast(colors['--color-text--secondary'], colorUnits.hex)}
          level="AAA"
        />

        <div style={{ backgroundColor: colors[key], height: '120px' }} />

        <div>
          {colorUnits.hex}
        </div>
      </div>
      <div>{key.replace('--color-', '')}</div>
    </List__item>
  );
});

const page = () => (
  <div>
    <Rhythm>
      <Heading level="h1">Project colors</Heading>
      <p>Below is a comprehensive quick view of all project colors against both AA and AAA accessiiblity contrast tests. Each color is tested for both black and white contrast levels against font color, size and weights.</p>
      <div className="AccessibilityLevel__control">
        <label className="AccessibilityLevel__controls accessibility__controls-level">WCAG Level
          <select>
            <option value="AccessibilityLevel--double" defaultValue>AA</option>
            <option value="AccessibilityLevel--triple">AAA</option>
          </select>
        </label>
        <label className="AccessibilityLevel__controls accessibility__controls-weight">Font Size / Weight
          <select>
            <option value="AccessibilityLevel__badge--normal" defaultValue>normal (14pt)</option>
            <option value="AccessibilityLevel__badge--large--bold">large-bold (18pt)</option>
            <option value="AccessibilityLevel__badge--large">large (18pt)</option>
          </select>
        </label>
      </div>
    </Rhythm>
    <List className="colors" variant="blank">{ cards }</List>
  </div>
);

export default page();
