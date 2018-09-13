/**
RichText creates a container where our tag CSS styles are added automatically to the appropriate HTML elements.  
This is used to wrap user editable RTE fields from a CMS source.
*/

export class RichText extends React.Component {
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

    const classStack = Utils.createClassStack([
      'richtext',
      `richtext--${variant}`,
      className
    ]);

    return (
      <div className={classStack} {...attrs}>
        {children}
      </div>
    );
  }
}

export default RichText;
