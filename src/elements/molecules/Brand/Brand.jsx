import Icon from '@atoms/Icon/Icon';

/** It's the brand, man. It can be a brand icon only (compact), or a full brand mark with icon and name label. */
export class Brand extends React.Component {
  static propTypes = {
    /** Class stacking */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Style variant */
    variant: PropTypes.oneOf(['default', 'compact']),
    /** Children nodes being passed through */
    className: PropTypes.string    
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
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'brand',
      `brand--${variant}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        <Icon name="close" className="brand__icon" />
        {
          variant === 'default' &&
          <span className="brand__label">
            GenericBrand
          </span>
        }
      </Tag>
    );
  }
}

export default Brand;
