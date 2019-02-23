// Guide Colors
export class Guide__colors extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'section',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'guide__colors',
      `guide__colors--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

// Guide Colors accessibility levels
export class Guide__colors_level extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    tagName: 'div',
    level: 'AA',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      contrastPrimary,
      contrastSecondary,
      level,
      ...attrs
    } = this.props;

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
  }
}

// Guide Colors Card
export class Guide__colors_card extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node,
    /** Color */
    color: PropTypes.string,
    /** Name */
    name: PropTypes.string,
    /** Primary test color */
    primary: PropTypes.string,
    /** Secondary test color */
    secondary: PropTypes.string,
    /** Colors unit (hex, rgb, rgba) */
    unit: PropTypes.string
  };

  static defaultProps = {
    tagName: 'section',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      primary,
      secondary,
      color,
      name,
      unit,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'guide__colors-card',
      `guide__colors-card--${variant}`,
      className
    ]);

    return (
      <React.Fragment>
        <Tag
          className={classStack}
          {...attrs}
        >
          <Guide__colors_level
            contrastPrimary={
              GuideUtils.getColorContrast(
                primary,
                unit
              )
            }
            contrastSecondary={
              GuideUtils.getColorContrast(
                secondary,
                unit
              )
            }
            level="AA"
          />
          <Guide__colors_level
            contrastPrimary={
              GuideUtils.getColorContrast(
                primary,
                unit
              )
            }
            contrastSecondary={
              GuideUtils.getColorContrast(
                secondary,
                unit
              )
            }
            level="AAA"
          />

          <div
            style={{
              backgroundColor: color,
              height: '120px'
            }}
          />
          <div>
            {unit}
          </div>
        </Tag>
        <div>
          {name}
        </div>
      </React.Fragment>
    );
  }
}

export default Guide__colors;
