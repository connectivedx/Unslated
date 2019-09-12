import Icon from '@guideAtoms/Icon/Icon';

/**
  A modal is a dialog box/popup window that is displayed on top of the current page.<br/>
  <strong>Mobile friendly:</strong> In both width and height, modal element is responsive across all screen sizes.
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
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extraLarge']),
    /** Padding defind the inner padding for modals */
    padding: PropTypes.oneOf(['none', 'small', 'medium', 'large'])
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    size: 'large',
    padding: 'medium'
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
      size,
      padding,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'guide__modal',
      `guide__modal--${variant}`,
      `guide__modal--${size}`,
      `guide__modal--padding-${padding}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        <div className="guide__modal-inner">
          <div className="guide__modal-inner--width">
            <Icon name="close" data-modal-close />
            <div className="guide__modal-inner--height">
              <div className="guide__modal-content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </Tag>
    );
  }
}

export default Modal;
