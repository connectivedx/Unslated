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
    /** Alignment of targets within tabs system (top, bottom, left, right). */
    align: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /** Justify targets within tabs system. center only works for systems with align set to top or bottom. */
    justify: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'center']),
    /** Default tab index (string) which should be open at page load. Set to {false} to keep tabs closed at page load. */
    defaultTab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ])
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    align: 'top',
    justify: 'left',
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
      'guide__tabs',
      `guide__tabs--${variant}`,
      `guide__tabs-align--${align}`,
      `guide__tabs-justify--${justify}`,
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
    title: PropTypes.string
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
      ...attrs
    } = this.props;

    let { children } = this.props;

    children = Object.keys(children).map((i) => {
      children[i].props['data-tabs-target'] = i;
      children[i].props.className = 'hide';
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
