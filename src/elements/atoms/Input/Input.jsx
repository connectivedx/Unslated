/**
  <div class="rhythm--default">
    <p>Input is a simple abstraction of the basic form input element.<br />
    This element allows you to configure labels, validation and type from a single tag.</p>

    <h3 class="heading heading--h3"><strong>Field classes</strong> (classes independent from any specific field type or variant)</h3>
    <ul>
      <li><strong>.field</strong> = top level tag</li>
      <li><strong>.field__label</strong> = field's label tag</li>
      <li><strong>.field__native</strong> = field's native tag</li>
    </ul>
  </div>
*/
export class Input extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking. Baseline class dynamic based on type attribute (input-{type}). */
    className: PropTypes.string,
    /** Label attribute supplies text label tag. label={false} visually removes labels. */
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.node,
      PropTypes.element
    ]),
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Input type (text, radio, checkbox, date, number etc.). Type attribute dictates the element's base class. */
    type: PropTypes.string.isRequired,
    /** Id attributes are used as accessibility helpers in the for/id label/field relationship */
    id: PropTypes.string.isRequired,
    /** Name attributes are used as keys when posting data to server */
    name: PropTypes.string.isRequired,
    /** Placeholder allows you to set input text that clears upon field being focused */
    placeholder: PropTypes.string,
    /** Flags a field to be put into an error state when pattern attribute's condition(s) are not valid */
    required: PropTypes.bool,
    /** Regex patterns to craft validation conditions for fields based on values entered */
    pattern: PropTypes.string,
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
      label,
      placeholder,
      required,
      error,
      id,
      ...attrs
    } = this.props;

    let {
      pattern
    } = this.props;

    const classStack = Utils.createClassStack([
      'input field',
      `input-${type}`,
      `input--${variant}`,
      className
    ]);

    if (!pattern && required) {
      pattern = '.*[^ ].*';
    }

    const errorMessage = (error)
      ? (
        <span className="field__error-message">
          {error}
        </span>
      )
      : '';

    return (
      <Tag
        className={classStack}
      >
        {
          (type !== 'radio' && type !== 'checkbox')
            ? (
              <label
                htmlFor={id}
                className="field__label"
              >
                {label}
                {errorMessage}
              </label>
            )
            : ''
        }
        <input
          id={id}
          className="field__native"
          type={type}
          name={name}
          required={required}
          pattern={pattern}
          placeholder={(variant !== 'dynamic-placeholder') ? placeholder : ''}
          {...attrs}
        />

        {
          // label for radios and checkboxes must come after native field
          (type === 'radio' || type === 'checkbox')
            ? (
              <label
                htmlFor={id}
                className="field__label"
              >
                <span className="field__label--inner">{label}</span>
                {errorMessage}
              </label>
            )
            : ''
        }
      </Tag>
    );
  }
}

export default Input;
