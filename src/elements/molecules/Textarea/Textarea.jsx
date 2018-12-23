/** 
  Textarea is a simple abstraction of the basic form textarea element.
  This element allows you to configure alignment, labels, validation and type from a single tag.
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
    /** Label attribute supplies text label tag (Note you can remove labels by setting this to false)*/
    label: PropTypes.oneOfType([
       PropTypes.string,
       PropTypes.bool
    ]),
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Name attributes are used as keys when posting data to server */
    name: PropTypes.string.isRequired,
    /** Alignment allows you set orientation between labels and inputs*/
    align: PropTypes.string,
    /** Flags a field to be put into an error state when pattern attribute's condition(s) are not valid */
    required: PropTypes.bool,
    /** Regex patterns to craft validation conditions for fields based on values entered */
    pattern: PropTypes.string,
    /** Text within the native textarea element */
    children: PropTypes.string
  };

  static defaultProps = {
    tagName: 'li',
    variant: 'default',
    align: 'stacked-bottom',
    required: false,    
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
      required,
      pattern,
      children,     
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'textarea',
      `field field--${align} field--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {
          (label !== false) ?
            <label className="field__label">{label}</label>
          : ''
        }      
        <textarea className="field__native" name={name} pattern={pattern} required={required} {...attrs} defaultValue={children} />
      </Tag>
    );
  }
}

export default Textarea;
