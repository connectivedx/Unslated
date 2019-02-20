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


// AccessibilityLevel
export class AccessibilityLevel extends React.Component {
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

export default Guide__colors;
