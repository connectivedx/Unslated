import Icon from '@atoms/Icon/Icon';
import Button from '@atoms/Button/Button';
import Rhythm from '@atoms/Rhythm/Rhythm';
import {
  Card,
  Card__header,
  Card__body
} from '@molecules/Card/Card';

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
    /** Defines the close button text, icon or even element */
    close: PropTypes.any,
    /** Defines if modal can be closed with escape key or not */
    hasEscapeClose: PropTypes.bool,
    /** Defines if modal can be closed by clicking or touching modal overlay */
    hasOverlayClose: PropTypes.bool,
    /** Defines if modal has an overlay background (true by default) */
    hasOverlay: PropTypes.bool,
    /** Size defines the max width of the modal container */
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extra-large']),
    /** Padding defind the inner padding for modals */
    padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    /** Defines the modal's dialog type for screen readers */
    role: PropTypes.oneOf(['dialog', 'alertdialog']),
    /** Defines a title for the modal */
    title: PropTypes.string.isRequired,
    /** Defines if you wish to visually hide modal title */
    hideTitle: PropTypes.bool
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    size: 'large',
    padding: 'small',
    close: <Icon name="close" data-modal-close />,
    hasEscapeClose: true,
    hasOverlayClose: true,
    hasOverlay: true,
    hideTitle: false,
    role: 'dialog'
  };

  /** Element level options */
  static options = {
    core: true
  };

  render = () => {
    const {
      role,
      size,
      title,
      close,
      padding,
      variant,
      children,
      className,
      hideTitle,
      hasOverlay,
      tagName: Tag,
      hasEscapeClose,
      hasOverlayClose,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'modal',
      'hidden',
      (hideTitle) && 'modal--title-hidden',
      `modal--${variant}`,
      `modal--overlay-${hasOverlay}`,
      `modal--overlay-close-${hasOverlayClose}`,
      `modal--escape-close-${hasEscapeClose}`,
      className
    ]);

    const widthStack = Utils.createClassStack([
      'flex',
      'flex--column',
      'flex--justify-content-center',
      'modal-inner--width'
    ]);

    const heightStack = Utils.createClassStack([
      'modal-inner--height'
    ]);

    const titleStack = Utils.createClassStack([
      'flex',
      'flex--justify-content-between',
      'flex--align-items-center',
      (hideTitle) && 'hidden'
    ]);

    const closeStack = Utils.createClassStack([
      'flex',
      'flex--column',
      'flex--justify-content-center',
      'modal-close'
    ]);

    return (
      <Tag
        className={classStack}
        role={role}
        aria-modal="true"
        aria-labelledby={`${attrs['data-modal']}Title`}
        aria-describedby={`${attrs['data-modal']}Desc`}
        {...attrs}
      >
        <div className={`modal-inner wrapper--${size}`}>
          <div className={widthStack}>
            {
              (close && hideTitle)
                ? <Button className={closeStack} aria-label="Close dialog">{close}</Button>
                : ''
            }
            <div className={heightStack}>
              <Card className="modal-content">
                <Card__header
                  className={titleStack}
                  id={`${attrs['data-modal']}Title`}
                  aria-hidden="false"
                >
                  {title}
                  {
                    (close && !hideTitle)
                      ? <Button className={closeStack} aria-label="Close dialog">{close}</Button>
                      : ''
                  }
                </Card__header>
                <Card__body>
                  <div className={`scrollblock padding--${padding}`} id={`${attrs['data-modal']}Desc`}>
                    <Rhythm>
                      {children}
                    </Rhythm>
                  </div>
                </Card__body>
              </Card>
            </div>
          </div>
        </div>
      </Tag>
    );
  }
}

export default Modal;
