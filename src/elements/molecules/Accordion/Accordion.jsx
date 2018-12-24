import Expand from '@molecules/Expand/Expand';

/** 
  Accordions are useful when you want to toggle between hiding and showing large amount of content.
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
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node
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
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'accordion',
      `accordion--${variant}`,
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
    /** Level attribute overloads the heading tag size of a accordion section (h1-h6)*/
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

    const classStack = Utils.createClassStack([
      'accordion__section',
      `accordion__section--${variant}`,
      className
    ]);

    return (
      <Expand tagName={Tag}
        className={classStack}
        title={title}
        {...attrs}
      >
        {children}
      </Expand>
    );
  }
}

export default Accordion;
