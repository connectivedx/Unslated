/** Heading should be used in place of headers. */

export class Heading extends React.Component {
  static propTypes = {
    /** Tag overload */ 
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Size prop */
    weight: PropTypes.oneOf(['bold', 'medium', 'thin']),
    /** Level prop */
    level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    /** Children nodes being passed through */
    children: PropTypes.node
  };

  static defaultProps = {
    weight: 'bold',
    level: 'h1'
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
      tagName,
      className,
      variant,
      children,
      weight,
      level,
      ...attrs
    } = this.props;

    const Tag = tagName || level || 'h1';

    let classStack = Utils.createClassStack([
      'heading',
      `heading--${weight}`,
      `heading--${level}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}

export default Heading;


