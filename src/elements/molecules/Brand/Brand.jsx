import Icon from '@atoms/Icon/Icon';

/**
  It's the brand, man. It can be a brand icon only, or a full brand mark with icon and name slogan.
*/
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
    /** Defines branding slogan text */
    slogan: PropTypes.string,
    /** Children nodes being passed through */
    className: PropTypes.string
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  /** Element level options */
  static options = {
    core: true
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      slogan,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'brand',
      `brand--${variant}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        <Icon name="brand" className="brand__icon" />
        {
          variant === 'default' && <span className="brand__label">{slogan}</span>
        }
      </Tag>
    );
  }
}

export default Brand;
