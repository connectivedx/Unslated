/** <List> should be used in place of lists (ul, ol, dl) */

export class List extends React.Component {
  static propTypes = {
    /** Tag overload */ 
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variant */
    variant: PropTypes.oneOf(['unordered', 'ordered', 'blank', 'definition']),
    /** Children nodes being passed through */
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    variant: 'unordered'
  };

  state = {
    isActive: false
  }

  /** toggle is a helper method to switch the isActive state between a boolean true or false */
  toggle = () => {
    this.setState({ isActive: !this.state.isActive });
  }

  render = () => {
    const {
      tagName,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const getTagName = () => {
      switch (variant) {
        case 'ordered':
          return 'ol';
        case 'definition':
          return 'dl';
        case 'unordered':
        default:
          return 'ul';
      }
    };

    const Tag = tagName || getTagName();

    let classStack = Utils.createClassStack([
      'list',
      `list--${variant}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}

export class List__item extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Style variant */
    className: PropTypes.string,
    /** Class stacking */
    variant: PropTypes.oneOf(['item', 'description', 'term']),
     /** Children nodes being passed through */
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    variant: 'item'
  };

  state = {
    isActive: false
  }

  /** toggle is a helper method to switch the isActive state between a boolean true or false */
  toggle = () => {
    this.setState({ isActive: !this.state.isActive });
  }

  render = () => {
    const {
      tagName,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const getTagName = () => {
      switch (variant) {
        case 'term':
          return 'dt';
        case 'description':
          return 'dd';
        case 'item':
        default:
          return 'li';
      }
    };

    const Tag = tagName || getTagName();

    let classStack = Utils.createClassStack([
      'list__item',
      `list__item--${variant}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}

export default List;
