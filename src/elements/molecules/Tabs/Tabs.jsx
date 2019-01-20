import Heading from '@atoms/Heading/Heading';

/**
  Tabs are perfect for single page web applications, or for web pages capable of displaying different subjects.<br/>
  <strong>Mobile friendly:</strong> Because tab systems are simply stacked elements, all tabs are mobile friendly by transforming into stacked accordion experince.
*/

export class Tabs extends React.Component {
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
    variant: PropTypes.oneOf(['default', 'outline']),
    /** Children passed through */
    children: PropTypes.node,
    /** Alignment of targets within tabs system (top, bottom, left, right). */
    align: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /** Justify targets within tabs system. center only works for systems with align set to top or bottom. */
    justify: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'center']),
    /** Default tab index (string) which should be open at page load. Set to {false} to keep tabs closed at page load. */
    defaultTab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ])
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    align: 'top',
    justify: 'left',
    defaultTab: '1'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      align,
      justify,
      defaultTab,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'tabs',
      `tabs--${variant}`,
      `tabs-align--${align}`,
      `tabs-justify--${justify}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        data-default={defaultTab}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export class Tabs__section extends React.Component {
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
    /** Title text of each tab */
    title: PropTypes.string
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      title,
      ...attrs
    } = this.props;

    return (
      <React.Fragment>
        {(title) ? <Heading className="tabs__trigger">{title}</Heading> : '' }
        <div className="tabs__target" {...attrs}>
          {children}
        </div>
      </React.Fragment>
    );
  }
}

export default Tabs;
