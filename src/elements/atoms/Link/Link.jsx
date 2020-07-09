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

    // foreign tags
    if (tagName !== 'a') {
      // foreign tags get aria role="link"
      attrs.role = 'link';
      // foreign tags get tabIndex
      attrs.tabIndex = '0';
      // foreign tags get data-href
      attrs['data-href'] = attrs.href;
      // foreign do not get a href attribute
      delete attrs.href;
    }

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}

export default Link;
