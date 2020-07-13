/**
  ELEMENT DESCRIPTION HERE
*/

export class Alert extends React.Component {
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
    variant: PropTypes.oneOf(['inline', 'modal']),
    /** Children passed through */
    children: PropTypes.node,
    /** Allows you to specify if alert is a modal or inline */
    modal: PropTypes.bool,
    /** Use local storage */
    persistent: PropTypes.bool
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'inline',
    persistent: false
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      persistent,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'alert',
      `alert--${variant}`,
      className
    ]);

    if (persistent) {
      attrs['data-persistent'] = true;
    }

    if (variant === 'inline') {
      attrs.role = 'inline';
    }

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

export default Alert;
