/**
  <div class="rhythm--default">
    <p>Select is a simple abstraction of the basic form select element.<br/>
    This element allows you to configure labels, validation from a single tag.<br/>
    Please note this element requires <option> tag children to complete the usage of it.</p>

    <h3 class="heading heading--h3">
      <strong>Field classes</strong> (classes independent from any specific field type or variant)
    </h3>

    <ul>
      <li><strong>.field</strong> = top level tag</li>
      <li><strong>.field__label</strong> = field's label tag</li>
      <li><strong>.field__native</strong> = field's native tag</li>
    </ul>
  </div>
*/

import {
  List,
  List__item
} from '@atoms/List/List';

export class Select extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking. */
    className: PropTypes.string,
    /** Label attribute supplies text label tag. label={false} visually removes labels. */
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.node
    ]),
    /** Defines if select is drop down select or multi-select */
    multiple: PropTypes.bool,
    /** Style variants */
    variant: PropTypes.oneOf(['default', 'inline-label']),
    /** <option value=""></option> */
    children: PropTypes.node,
    /** Name attributes are used as keys when posting data to server */
    name: PropTypes.string.isRequired,
    /** Id attributes are used as accessibility helpers in the for/id label/field relationship */
    id: PropTypes.string.isRequired,
    /** Flags a field to be put into an error state when pattern attribute's condition(s) are not valid */
    required: PropTypes.bool,
    /** Sets the default selected <option value="*"> at load. */
    defaultValue: PropTypes.string,
    /** Error message when field is required but not valid */
    error: PropTypes.string
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    required: false,
    multiple: false
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
      children,
      type,
      id,
      name,
      label,
      required,
      defaultValue,
      multiple,
      error,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'select field',
      `select--${variant}`,
      (multiple) ? 'select--multiple' : '',
      className
    ]);

    if (multiple) {
      attrs.multiple = true;
    }

    return (
      <Tag
        className={classStack}
      >
        {
          (error)
            ? (
              <span className="field__error-message field__error-message--error field__error-message--align-top">
                <span className="field__error-message-inner">
                  {error}
                </span>
              </span>
            )
            : ''
        }
        {
          (label !== false)
            ? <label htmlFor={id} className="field__label">{label}</label>
            : ''
        }

        {/* Native field */}
        <select
          id={id}
          className="field__native"
          required={required}
          defaultValue={defaultValue}
          name={name}
          {...attrs}
        >
          {children}
        </select>

        {/* Builds unorder list for cross browser style control */}
        <List className="select__decorator">
          {
            Object.keys(children).map((i) => {
              if (children[i].props) {
                return (
                  <List__item
                    key={i}
                    data-value={children[i].props.value}
                  >
                    { (children[i].props.children) ? children[i].props.children : '' }
                  </List__item>
                );
              }

              return false;
            })
          }
        </List>
      </Tag>
    );
  }
}

export default Select;
