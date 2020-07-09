/**
  Link should be used in place of the <a> tag.
*/

export class Link extends React.Component {
  static propTypes = {
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variant */
    variant: PropTypes.string,
    /** Children nodes being passed through */
    children: PropTypes.node,
    /** Defines the address endpoint for link */
    href: PropTypes.string.isRequired
  };

  static defaultProps = {
    tagName: 'a',
    variant: 'default'
  };

  /** Element level options */
  static options = {
    core: true
  };

  render = () => {
    const {
      tagName,
      children,
      className,
      variant,
      ...attrs
    } = this.props;

    const Tag = tagName;

    const classStack = Utils.createClassStack([
      'link',
      `link--${variant}`,
      className
    ]);

    if (tagName !== 'a') {
      attrs.role = 'link';
      attrs.tabIndex = '0';
    }

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}

export default Link;
