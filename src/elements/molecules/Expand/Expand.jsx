import Heading from '@atoms/Heading/Heading';
import Icon from '@atoms/Icon/Icon';

/** 
  Expand is a molecule used to hide or display conent under a given title.
*/

export class Expand extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Icon name */
    icon: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default', 'purple', 'navy', 'gold']),
    /** Expand trigger heading*/
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    /** Children passed through */
    children: PropTypes.node,
    /** Default state determins if a expand should be open or closed at page load*/
    defaultState: PropTypes.oneOf(['open', 'closed']),
    /** Level defines the heading tag size (h1 - h6) of the expand trigger */
    level: PropTypes.string,
    /** Aligns expand target to be top or bottom */
    align: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    icon: 'plus',
    defaultState: 'closed',
    level: 'h3',
    align: 'top'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      title,
      children,
      icon,
      defaultState,
      level,
      align,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'expand',
      `expand--${variant}`,
      `expand-state--${defaultState}`,
      `expand-align--${align}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        <Heading level={level} className="expand__trigger">{title}</Heading>
        <section className="expand__target">
          {children}
        </section>
      </Tag>
    );
  }
}

export default Expand;
