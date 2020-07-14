/**
  Alert messages can be used to notify the user about something special: danger, success, information or warning.
*/

import Icon from '@atoms/Icon/Icon';
import Button from '@atoms/Button/Button';
import Modal from '@molecules/Modal/Modal';

export class Alert extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Defines the style variants for alerts */
    variant: PropTypes.oneOf(['default', 'error', 'success', 'warning']),
    /** Defines if alert should be inline or modal */
    type: PropTypes.oneOf(['inline', 'modal']),
    /** Children passed through */
    children: PropTypes.node,
    /** Defines if should only show alert only once or not (uses local storage) */
    persistent: PropTypes.bool
  };

  static defaultProps = {
    type: 'inline',
    tagName: 'div',
    variant: 'default',
    persistent: false
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      type,
      className,
      variant,
      persistent,
      ...attrs
    } = this.props;

    let {
      tagName: Tag,
      children
    } = this.props;

    const classStack = Utils.createClassStack([
      'alert',
      `alert--${type}`,
      `alert--${variant}`,
      `alert--persistent-${persistent}`,
      'padding--small',
      (type === 'inline') && 'flex flex--justify-content-between flex--align-items-center',
      className
    ]);

    const inlineStack = Utils.createClassStack([
      'alert__inline-container',
      className
    ]);

    if (type === 'modal') {
      Tag = Modal;
    }

    if (type === 'inline') {
      children = (
        <div className={inlineStack} role="alertdialog">
          {children}
        </div>
      );
    }

    return (
      <Tag
        className={classStack}
        role={(type === 'modal') ? 'alertdialog' : 'alert'}
        {...attrs}
      >
        {children}
        {
          type === 'inline' && (
            <Button variant="icon" className="alert--close-icon" aria-label="alert close button">
              <Icon name="close" aria-hidden="true" />
            </Button>
          )
        }
      </Tag>
    );
  }
}

export default Alert;
