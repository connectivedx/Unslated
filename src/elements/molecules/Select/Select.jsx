/** 
  Select is a simple abstraction of the basic form select element.
  This element allows you to configure alignment, labels, validation from a single tag.
  Please note this element requires <option> tag children to complete the usage of it.
*/

export class Select extends React.Component {
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
    /** <option value=""></option> */
    children: PropTypes.node.isRequired,
    /** Name attributes are used as keys when posting data to server */
    name: PropTypes.string.isRequired,
    /** Alignment allows you set orientation between labels and inputs*/
    align: PropTypes.string,
    /** Flags a field to be put into an error state when pattern attribute's condition(s) are not valid */    
    required: PropTypes.bool,
    /** Sets the default selected <option value="*"> at load.*/
    defaultValue: PropTypes.string
  };

  static defaultProps = {
    tagName: 'li',
    variant: 'default',
    align: 'stacked-bottom',
    required: false
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      type,
      name,
      label,
      align,
      required,
      defaultValue,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'select',
      `field field--${align} select--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
      >
        {(label !== false) ? <label className="field__label">{label}</label> : ''}
        <span className="field__decorator">
          <select className="field__native" required={required} name={name} defaultValue={defaultValue} {...attrs}>
            {children}
          </select>
        </span>
      </Tag>
    );
  }
}

export default Select;
