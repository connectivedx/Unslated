import Expand from '@molecules/Expand/Expand';

/**
  <p>Accordions are useful when you want to toggle between hiding and showing large amount of content.</p>
  <p>Accordion molecule is a simple re-abstraction of the Expand molecule with supporting UI styles and behavior.</p>
*/

export class Accordion extends React.Component {
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
    variant: PropTypes.oneOf(['default', 'spread']),
    /** Children passed through */
    children: PropTypes.node,
    /** Multi allows you specify if accordion allows multiple sections open at once. */
    multi: PropTypes.bool,
    /** ID required for corresponding aria-labelledBy */
    id: PropTypes.string
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    multi: true
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
      multi,
      id,
      ...attrs
    } = this.props;

    let { children } = this.props;
    children = Object.keys(children).map((i) => React.cloneElement(children[i], { id: `${id}-${i}`, key: i }));

    const classStack = Utils.createClassStack([
      'accordion',
      `accordion--${variant}`,
      `accordion--multi-${multi}`,
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

export class Accordion__section extends React.Component {
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
    /** Title attribute sets the heading of an accordion section */
    title: PropTypes.string,
    /** Level attribute overloads the heading tag size of a accordion section (h1-h6) */
    level: PropTypes.string,
    /** align attribute passes its value down to the expand molecule to align expanded content from top or bottom */
    align: PropTypes.oneOf(['top', 'bottom']),
    /** ID required for corresponding aria-labelledBy */
    id: PropTypes.string
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    align: 'top'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      title,
      level,
      align,
      id,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'accordion__section',
      `accordion__section--${variant}`,
      className
    ]);

    return (
      <Expand
        tagName={Tag}
        className={classStack}
        title={title}
        align={align}
        id={id}
        level={level}
        {...attrs}
      >
        {children}
      </Expand>
    );
  }
}

export default Accordion;
