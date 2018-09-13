/** Image should be used in place of the <img /> tag */

export class Image extends React.Component {
  static propTypes = {
    /** Class stacking */
    className: PropTypes.string,
    /** Style variant */
    variant: PropTypes.oneOf(['default', 'auto']),
    /** Alt attribute is required */
    alt: PropTypes.string.isRequired,
    /** Src attribute is required */
    src: PropTypes.string.isRequired
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
      className,
      variant,
      alt,
      src,
      ...attrs
    } = this.props;

    let classStack = Utils.createClassStack([
      'image',
      `image--${variant}`,
      className
    ]);

    return (
      <img
        alt={alt}
        src={src}
        className={classStack}
        {...attrs}
      />
    );
  }
}

export default Image;
