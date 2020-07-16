/**
  Simple abstraction of the basic <strong>H1-H6</strong> tags with responsive typography support.<br/><br/>
  <strong>Please note:</strong> The difference between the Heading atom and RichText headings are the BEM classing.<br/>
  Heading atom gets BEM classing opportunities, while RichText headings are to be treated as a tags only approach.
*/

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
    weight: 'medium',
    level: 'h1'
  };

  /** Element level options */
  static options = {
    core: true
  };

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

    // If foreign tag, this indicates to AT that element should be treated like a heading
    if (tagName) {
      attrs.role = 'heading';
      attrs['aria-level'] = level.replace(/[a-zA-Z]/g, '');
    }

    const classStack = Utils.createClassStack([
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
