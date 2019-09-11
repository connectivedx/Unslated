/**
  Rhythm is used to define vertical spacing between elements because CSS reset is used.
  Adds margin-top to child elements, except for the first element.
*/

export class Rhythm extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Defines Rhythem spacing size */
    size: PropTypes.oneOf(['none', 'default', 'small', 'medium', 'large']),
    /** Applies Rhythem to all nested levels */
    deep: PropTypes.bool,
    /** Children nodes being passed through */
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    tagName: 'div',
    size: 'default',
    deep: false
  };

  /** Element level options */
  static options = {
    core: true
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      size,
      deep,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      deep
        ? `rhythm--deep-${size}`
        : `rhythm--${size}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}

export default Rhythm;
