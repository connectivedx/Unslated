/**
  Tabs are perfect for single page web applications, or for web pages capable of displaying different subjects.<br/>
  <strong>Mobile friendly:</strong> Because tab systems are simply stacked elements, all tabs are mobile friendly by transforming into stacked accordion experince.
*/

export class Tabs extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node,
    /** Alignment of targets. */
    align: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'center']),
    /** Justify targets. */
    justify: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /** Default tab index (string) which should be open at page load. Set to {false} to keep tabs closed at page load. */
    defaultTab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ])
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    align: 'left',
    justify: 'top',
    defaultTab: '1'
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
      children,
      align,
      justify,
      defaultTab,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'tabs flex--extra-large',
      justify === 'top' && 'flex--column',
      justify === 'bottom' && 'flex--column-reverse',
      justify === 'left' && 'flex--row',
      justify === 'right' && `flex--row-reverse`,
      (align === 'left' || align === 'top') && 'flex--align-items-start',
      (align === 'right' || align === 'bottom') && 'flex--align-items-end',
      (align !== 'left' && align !== 'right') && `flex--align-items-${align}`,
      `tabs--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        data-default={defaultTab}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export class Tabs__triggers extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };


  render = () => {
    const {
      tagName: Tag,
      variant,
      ...attrs
    } = this.props;

    let { children } = this.props;

    children = Object.keys(children).map((i) => {
      children[i].props['data-tabs-trigger'] = i;
      return children[i];
    });

    return (
      <Tag className="tabs__triggers" {...attrs}>
        {children}
      </Tag>
    );
  }
}

export class Tabs__targets extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node,
    /** Title text of each tab */
    title: PropTypes.string,
    /** Triggers passed to targets to gather names */
    triggers: PropTypes.node
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      variant,
      title,
      triggers,
      ...attrs
    } = this.props;

    let { children } = this.props;

    children = Object.keys(children).map((i) => {
      children[i].props['data-tabs-target'] = i;
      children[i].props.className = [children[i].props.className, 'hide'].join(' ');
      return children[i];
    });

    return (
      <Tag className="tabs__targets" {...attrs}>
        {children}
      </Tag>
    );
  }
}

export default Tabs;
