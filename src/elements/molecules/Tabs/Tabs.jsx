/**
  Tabs are perfect for single page web applications, or for web pages capable of displaying different subjects.
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
      'tabs flex--large',
      justify === 'top' && 'flex--column',
      justify === 'bottom' && 'flex--column-reverse',
      justify === 'left' && 'flex--row',
      justify === 'right' && 'flex--row-reverse',
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


/*
  Triggers are the elements which users click or touch to visually revel a content target.
*/
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
      children[i].props.className = Utils.createClassStack([
        'tabs__trigger',
        children[i].props.className
      ]);
      return children[i];
    });

    return (
      <Tag className="tabs__triggers" {...attrs}>
        {children}
      </Tag>
    );
  }
}

/*
  Targets are the corresponding content blocks to a given trigger.
*/
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
      children[i].props['data-tabs-target'] = i;
      children[i].props.className = Utils.createClassStack([
        'hide',
        'tabs__target',
        children[i].props.className
      ]);
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
