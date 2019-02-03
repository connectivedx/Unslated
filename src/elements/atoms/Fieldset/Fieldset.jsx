/**
  <div class="rhythm--default">
    <p>Fieldset element is a re-abstraction of basic fieldset element.<br /> The fieldset tag is used to group related elements in a form.</p>
    <p>The fieldset comes with a requried legend tag. The legend tags are used to guide screen readers in describing a group of form fields.</p>
  </div>
*/

export class Fieldset extends React.Component {
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
    /** Legend is used to denote an opportunity to describe a group of fields to screen readers */
    legend: PropTypes.string.isRequired,
    /** Legend by default is hidden; with this prop you can show legends visually */
    legendHide: PropTypes.bool
  };

  static defaultProps = {
    tagName: 'fieldset',
    variant: 'default',
    legendHide: true
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      legend,
      legendHide,
      rhythm,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'form-fieldset',
      `form-fieldset--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        <legend hidden={legendHide}>{legend}</legend>
        {children}
      </Tag>
    );
  }
}

export default Fieldset;
