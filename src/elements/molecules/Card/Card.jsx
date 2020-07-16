/**
  A card is lightweight bordered (optional) box with some padding around its content.<br/> It includes options for headers, footers, content, colors, etc.
*/

export class Card extends React.Component {
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
    children: PropTypes.any,
    /** Defines the id to use for accessibility attributes */
    id: PropTypes.string.isRequired
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
      id,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'card',
      `card--${variant}`,
      className
    ]);

    let { children } = this.props;

    const distributeIds = (child, index = false) => {
      if (child.type.toString().indexOf('Card__header')) {
        return React.cloneElement(child, { id: `${id}CardTitle`, key: index });
      }
      if (child.type.toString().indexOf('Card__body')) {
        return React.cloneElement(child, { id: `${id}CardDesc`, key: index });
      }

      return child;
    };

    if (id && !children.type) {
      children = Object.keys(children).map((i) => distributeIds(children[i], i));
    }

    if (children.type) {
      distributeIds(children);
    }

    return (
      <Tag
        className={classStack}
        aria-labelledby={`${id}CardTitle`}
        aria-describedby={`${id}CardDesc`}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export class Card__header extends React.Component {
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
    children: PropTypes.any
  };

  static defaultProps = {
    tagName: 'header',
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
      'card__header',
      `card__header--${variant}`,
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

export class Card__body extends React.Component {
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
    children: PropTypes.any
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
      'card__body',
      `card__body--${variant}`,
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

export class Card__footer extends React.Component {
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
    children: PropTypes.any
  };

  static defaultProps = {
    tagName: 'footer',
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
      'card__footer',
      `card__footer--${variant}`,
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

export default Card;
