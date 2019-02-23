/**
  <div class="rhythm--default">
    <p>Textarea is a simple abstraction of the basic form textarea element.</p>

    <h3 class="heading heading--h3"><strong>Field classes</strong> (classes independent from any specific field type or variant)</h3>
    <ul>
      <li><strong>.field</strong> = top level tag</li>
      <li><strong>.field__label</strong> = field's label tag</li>
      <li><strong>.field__native</strong> = field's native tag</li>
    </ul>
  </div>
*/

export class Textarea extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Label attribute supplies text label tag. label={false} visually removes labels. */
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    /** Style variants */
    variant: PropTypes.oneOf(['default', 'inline-label']),
    /** Name attributes are used as keys when posting data to server */
    name: PropTypes.string.isRequired,
    /** Id attributes are used as accessibility helpers in the for/id label/field relationship */
    id: PropTypes.string.isRequired,
    /** Flags a field to be put into an error state when pattern attribute's condition(s) are not valid */
    required: PropTypes.bool,
    /** Regex patterns to craft validation conditions for fields based on values entered */
    pattern: PropTypes.string,
    /** Text within the native textarea element */
    children: PropTypes.string,
    /** Error message when field is required but not valid */
    error: PropTypes.string
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    required: false
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
      type,
      name,
      id,
      label,
      required,
      children,
      error,
      ...attrs
    } = this.props;

    let {
      pattern
    } = this.props;

    const elClassStack = Utils.createClassStack([
      'textarea field',
      `textarea--${variant}`,
      className
    ]);

    const labelClassStack = Utils.createClassStack([
      'field__label',
      (label === false) && 'field__label--false'
    ]);

    if (!pattern && required) {
      pattern = '.*[^ ].*';
    }

    const errorTemplate = () => (
      <span className="field__error-message field__error-message--error field__error-message--align-top">
        <span className="field__error-message-inner">
          {error}
        </span>
      </span>
    );

    return (
      <Tag
        className={elClassStack}
        {...attrs}
      >
        {error && errorTemplate}
        <label htmlFor={id} className={labelClassStack}>{label}</label>
        <textarea
          className="field__native"
          name={name}
          pattern={pattern}
          required={required}
          defaultValue={children}
          id={id}
          {...attrs}
        />
      </Tag>
    );
  }
}

export default Textarea;
