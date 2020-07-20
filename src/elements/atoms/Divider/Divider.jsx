/** Divider element is a dedicated component to give visual spacing between componentry. */

export class Divider extends React.Component {
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
    variant: PropTypes.oneOf(['horizontal', 'vertical']),
    /** Defines how wide it is across the screen */
    length: PropTypes.oneOf(['large', 'medium', 'medium-small', 'small']),
    /** Defines the thickness of the divider */
    thickness: PropTypes.oneOf(['large', 'medium', 'small']),
    /** Defines the color of the line */
    color: PropTypes.oneOf(['black', 'gray', 'red', 'green']),
    /** Children passed through */
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'hr',
    variant: 'horizontal',
    length: 'large',
    thickness: 'medium',
    color: 'black'
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      tagName,
      className,
      variant,
      children,
      orientation,
      length,
      thickness,
      color,
      ...attrs
    } = this.props;

    let Tag = tagName;

    if (variant === 'veritcal') {
      Tag = 'div';
    }

    const classStack = Utils.createClassStack([
      'divider',
      `divider--${variant}`,
      `divider--color-${color}`,
      `divider--length-${length}`,
      `divider--thickness-${thickness}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        role="presentation"
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export default Divider;
