/**
  The video component is a simplified abstraction of the youtube iframe embed
*/

export class Video extends React.Component {
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
    /** Defines the video source */
    src: PropTypes.string,
    /** Define video's title */
    title: PropTypes.string,
    /** Defines the video ratio */
    ratio: PropTypes.oneOf(['default', 'wide', 'tall'])
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    ratio: 'default',
    title: ''
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      title,
      ratio,
      src,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'video',
      `video--${variant}`,
      `video--${ratio}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        <iframe
          className="video__player"
          src={src}
          frameBorder="0"
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {children}
      </Tag>
    );
  }
}

export default Video;
