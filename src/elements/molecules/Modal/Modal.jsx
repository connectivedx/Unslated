import Icon from '@atoms/Icon/Icon';

/** 
  ELEMENT DESCRIPTION HERE
*/

export class Modal extends React.Component {
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
    /** Size defines the max width of the modal container */
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extraLarge'])
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    size: 'large'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      size,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'modal',
      `modal--${variant}`,
      `modal--${size}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        <Icon name="close" data-modal-close />     
        {children}
      </Tag>      
    );
  }
}

export default Modal;
