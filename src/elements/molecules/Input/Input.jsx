/**
  Input is a simple abstraction of the basic form input element.
  This element allows you to configure alignment, labels, validation and type from a single tag.
*/
export class Input extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Label attribute supplies text label tag (Note you can remove labels by setting this to false) */
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Input type (text, radio, checkbox, date, number etc.) */
    type: PropTypes.string,
    /** Name attributes are used as keys when posting data to server */
    name: PropTypes.string.isRequired,
    /** Alignment allows you set orientation between labels and inputs */
    align: PropTypes.string,
    /** Placeholder allows you to set input text that clears upon field being focused */
    placeholder: PropTypes.string,
    /** Flags a field to be put into an error state when pattern attribute's condition(s) are not valid */
    required: PropTypes.bool,
    /** Regex patterns to craft validation conditions for fields based on values entered */
    pattern: PropTypes.string
  };

  static defaultProps = {
    tagName: 'li',
    variant: 'default',
    align: 'stacked-bottom',
    required: false,
    pattern: '(.*?)'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      type,
      name,
      label,
      align,
      placeholder,
      required,
      pattern,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'input',
      `input-${type}`,
      `field field--${align} field--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
      >
        {
          (label !== false && type !== 'radio' && type !== 'checkbox')
            ? <label className="field__label">{label}</label>
            : ''
        }
        <input className="field__native" type={type} name={name} required={required} pattern={pattern} {...attrs} />
        {
          (type === 'radio' || type === 'checkbox')
            ? <label className="field__label">{label}</label>
            : ''
        }
      </Tag>
    );
  }
}

export default Input;
