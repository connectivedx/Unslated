/**
  Buttons are used to denote user interaction.
*/

export class Button extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Size variants */
    size: PropTypes.oneOf(['inline', 'small', 'medium', 'large']),
    /** Style variant */
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'link', 'icon']),
    /** If used, button becomes an anchor tag with button styles */
    href: PropTypes.string,
    /** Children nodes being passed through */
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'button',
    variant: 'primary',
    size: 'inline'
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
      size,
      href,
      ...attrs
    } = this.props;

    let Tag = tagName;

    let classStack = Utils.createClassStack([
      'button',
      `button--${variant}`,
      `button--${size}`,
      className
    ]);

    if (href) {
      Tag = 'a';
      classStack = [classStack, ' button--link'].join('');
      attrs.href = href;
    }

    if (tagName !== 'button') {
      attrs.role = 'button';
      if (tagName !== 'a') {
        attrs.tabIndex = '0';
      }
    }

    return (
      <Tag className={classStack} {...attrs}>{children}</Tag>
    );
  }
}

export default Button;
