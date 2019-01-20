/**
  Defines a container with a specified max-width.
*/

export class Wrapper extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /* Class stacking */
    className: PropTypes.string,
    /* Size prop */
    size: PropTypes.oneOf(['narrow', 'default', 'wide']),
    /** Children nodes being passed through */
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    tagName: 'div',
    size: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      size,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'wrapper',
      `wrapper--${size}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}

export default Wrapper;
