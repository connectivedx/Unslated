/** 
  ELEMENT DESCRIPTION HERE
*/

export class {{name}} extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /* Class stacking */
    className: PropTypes.string,
    /* Style variants */
    variant: PropTypes.oneOf(['default']),
    /* Children passed through */
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  state = {
    isActive: false
  }

  /** toggle is a helper method to switch the isActive state between a boolean true or false */
  toggle = () => {
    this.setState({ isActive: !this.state.isActive });
  }

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      '{{cssName}}',
      `{{cssName}}--${variant}`,
      this.state.isActive && 'is-active',
      className
    ]);

    return (
      <Tag
        onClick={this.toggle}
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export default {{name}};
