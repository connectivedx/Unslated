/**
  Icons represent an instance of <use xlink:href="#icon" /> which inserts a referance to the svg symbol in its place.
  Icons are named and defined in the <IconSet> tag.
*/

export class Icon extends React.Component {
  static propTypes = {
    /** Class stacking */
    className: PropTypes.string,
    /** Size prop */
    size: PropTypes.oneOf(['normal', 'small', 'large', 'wide']),
    /** Style variant */
    variant: PropTypes.oneOf(['default', 'dark', 'light']),
    /** Icon file's name */
    name: PropTypes.string.isRequired
  };

  static defaultProps = {
    size: 'normal',
    variant: 'default'
  };

  /** Element level options */
  static options = {
    core: true
  };

  render = () => {
    const {
      className,
      size,
      variant,
      name,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'icon',
      `icon--${name}`,
      `icon--${size}`,
      `icon--${variant}`,
      className
    ]);

    return (
      <svg className={classStack} {...attrs}>
        <use xlinkHref={`#icon-${name}`} />
      </svg>
    );
  }
}

export default Icon;
