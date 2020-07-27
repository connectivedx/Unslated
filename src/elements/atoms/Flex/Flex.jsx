/**
  FlexColumn defines a flexbox with main axis set to a column direction and justifys children along the vertical axies (top/bottom),
  while aligns children along horizontal axis (left/right).
*/

export class FlexColumn extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Children passed through */
    children: PropTypes.node,
    /** Defines if column children should be in reverse order */
    reverse: PropTypes.bool,
    /** Defines a breakpoint size at which flex is enabled (default is all breakpoints) */
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extra-large']),
    /** Defines if the flex container should have children wrap to new line or not */
    wrap: PropTypes.bool,
    /** If wrap is set to true, this defines the wrapping order */
    wrapReverse: PropTypes.bool,
    /** Defines how children should be aligned */
    align: PropTypes.oneOf(['stretch', 'start', 'end', 'center', 'baseline']),
    /** Defines how children should be justified */
    justify: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around', 'even'])
  };

  static defaultProps = {
    tagName: 'div',
    reverse: false,
    wrap: false,
    wrapReverse: false
  };

  /** Element level options */
  static options = {
    core: true
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      children,
      reverse,
      wrap,
      wrapReverse,
      align,
      justify,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'flex',
      ((reverse) ? 'flex--column-reverse' : 'flex--column'),
      ((wrap) ? 'flex--wrap' : ''),
      ((wrapReverse) ? 'flex--wrap-reverse' : ''),
      ((align) ? `flex--align-items-${align}` : ''),
      ((justify) ? `flex--justify-content-${justify}` : ''),
      className
    ]);

    if (['around', 'between'].indexOf(align) !== -1) {
      console.error(`Align "${align}" is only applicable to FlexRows`);
    }

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

/**
  FlexColumn defines a flexbox with main axis set to a column direction and justifys children along the horizontal axies (left/right),
  while aligns children along vertical axis (top/bottom).
*/

export class FlexRow extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Children passed through */
    children: PropTypes.node,
    /** Defines if row children should be in reverse order */
    reverse: PropTypes.bool,
    /** Defines if the flex container should have children wrap to new line or not */
    wrap: PropTypes.bool,
    /** If wrap is set to true, this defines the wrapping order */
    wrapReverse: PropTypes.bool,
    /** Defines how children should be aligned */
    align: PropTypes.oneOf(['stretch', 'start', 'end', 'center', 'baseline', 'between', 'around']),
    /** Defines how children should be justified */
    justify: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around', 'even'])
  };

  static defaultProps = {
    tagName: 'div',
    reverse: false,
    wrap: false,
    wrapReverse: false
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
      reverse,
      wrap,
      wrapReverse,
      align,
      justify,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'flex',
      ((reverse) ? 'flex--row-reverse' : 'flex--row'),
      ((wrap) ? 'flex--wrap' : ''),
      ((wrapReverse) ? 'flex--wrap-reverse' : ''),
      ((align) ? `flex--align-items-${align}` : ''),
      ((justify) ? `flex--justify-content-${justify}` : ''),
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export default FlexColumn;
