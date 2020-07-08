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
    variant: PropTypes.oneOf(['default', 'modal']),
    /** Children passed through */
    children: PropTypes.node,
    /** Allows you to specify if alert is a modal or inline */
    modal: PropTypes.bool,
    /** Use local storage */
    persistant: PropTypes.bool
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'alert',
      `alert--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
        role="alert"
      >
        {children}
      </Tag>
    );
  }
}

export default Alert;
