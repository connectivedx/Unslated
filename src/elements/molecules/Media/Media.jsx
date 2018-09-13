/** Simple abstraction of a media/figure element combination. */
export class Media extends React.Component {
  static propTypes = {
    /* Tag overload*/
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class string */
    className: PropTypes.string,
    /** Layout alignment prop */
    align: PropTypes.string,
    /** Children nodes being passed through */
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    tagName: 'div'
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
      tagName: Tag,
      className,
      align,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'media',
      align && `media--${align}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}

export default Media;

export class Media__figure extends React.Component {
  static propTypes = {
    /** Tag overload*/
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class string */
    className: PropTypes.string,
    /** Layout alignment prop */
    align: PropTypes.oneOf(['top', 'middle', 'bottom']),
    /** Children nodes being passed through */
    children: PropTypes.node.isRequired    
  };

  static defaultProps = {
    tagName: 'div'
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
      tagName: Tag,
      className,
      align,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'media__figure',
      align && `media__figure--${align}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}


export const Media__body = Utils.createBasicComponent({
  name: 'media__body'
});



