export class Editor extends React.Component {
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
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'editor',
      `editor--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export class Editor__sidebar extends React.Component {
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
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'editor__sidebar',
      `editor__sidebar--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export class Editor__toolbar extends React.Component {
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
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'editor__toolbar',
      `editor__toolbar--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export class Editor__pallet extends React.Component {
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
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'editor__pallet',
      `editor__pallet--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export default Editor;
