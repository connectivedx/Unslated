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
    id: PropTypes.string
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
    if (id) {
      children = Object.keys(children).map((i) => {
        const child = children[i];
        if (child) {
          if (child.type) {
            if (child.type.toString().indexOf('Card__header') !== -1) {
              return React.cloneElement(child, { id: `${id}CardTitle`, key: i });
            }

            if (child.type.toString().indexOf('Card__body') !== -1) {
              return React.cloneElement(child, { id: `${id}CardDesc`, key: i });
            }
          }
        }

        return false;
      });
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
