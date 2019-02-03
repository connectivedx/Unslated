/**
  Form element is a re-abstraction of basic form element.
  The <form> tag is used to create an HTML form for user input.
*/
export class Form extends React.Component {
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
    /** Action is the location to which a form's data will be posted */
    action: PropTypes.string,
    /** Xaction is end point for when posting a form with XHR (AJAX) */
    xaction: PropTypes.string,
    /** Method sets the request type of the form (POST or GET) */
    method: PropTypes.oneOf(['get', 'post'])
  };

  static defaultProps = {
    tagName: 'form',
    variant: 'default',
    action: '#/',
    method: 'post'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      xaction,
      method,
      ...attrs
    } = this.props;

    let {
      action
    } = this.props;

    const classStack = Utils.createClassStack([
      'form',
      `form--${variant}`,
      className
    ]);

    // Transform xaction into data attribute for Form.Container.js
    if (xaction) {
      attrs['data-xhr'] = xaction;
      delete attrs.xaction;
      action = '/#';
    }

    return (
      <Tag
        className={classStack}
        action={action}
        method={method}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export default Form;
