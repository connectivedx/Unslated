/** Link should be used in place of the <a> tag. */

export class Link extends React.Component {
  static propTypes = {
    /** Class stacking */
    className: PropTypes.string,
    /** Style variant */
    variant: PropTypes.string,
    /** Children nodes being passed through */
    children: PropTypes.node
  };

  static defaultProps = {
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
      children,
      className,
      variant,
      ...attrs
    } = this.props;

    let classStack = Utils.createClassStack([
      'link',
      `link--${variant}`,,
      className
    ]);

    return (
      <a className={classStack} {...attrs}>
        {children}
      </a>
    );
  }
}

export default Link;
