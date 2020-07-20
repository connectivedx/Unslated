/**
  Image should be used in place of the <img /> tag
*/

export class Image extends React.Component {
  static propTypes = {
    /** Class stacking */
    className: PropTypes.string,
    /** Children passed through */
    children: PropTypes.any,
    /** Style variant */
    variant: PropTypes.oneOf(['full', 'auto']),
    /** Alt attribute is required */
    alt: PropTypes.string.isRequired,
    /** Src attribute is required */
    src: PropTypes.string.isRequired,
    /** Defines a responsive set of images */
    srcSet: PropTypes.string,
    /** Defines the background-size if used with children */
    size: PropTypes.string,
    /** Defines the background-position if used with children */
    position: PropTypes.oneOf([
      'top',
      'right',
      'bottom',
      'left',
      'center',
      'left top',
      'left center',
      'left bottom',
      'right top',
      'right center',
      'right bottom',
      'center top',
      'center center',
      'center bottom'
    ]),
    /** Defines the image's level of opacity */
    imageOpacity: PropTypes.float,
    /** Defines a belnding color with image */
    color: PropTypes.string,
    /** Defines the color's level of opacity */
    colorOpacity: PropTypes.int
  };

  static defaultProps = {
    variant: 'auto',
    imageOpacity: 1.0,
    colorOpacity: 1.0,
    position: 'center',
    size: '100%'
  };

  /** Element level options */
  static options = {
    core: true
  };

  render = () => {
    const {
      children,
      className,
      variant,
      alt,
      src,
      srcSet,
      size,
      position,
      color,
      imageOpacity,
      colorOpacity,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'image',
      `image--${variant}`,
      className
    ]);

    if (srcSet) {
      const set = srcSet.split(',');
      return (
        <picture className={classStack}>
          {
            Object.keys(set).map((i) => {
              const width = `(max-width: ${set[i].split(' ').filter((n) => n)[1].replace(/vw/g, 'px').replace(/w/g, 'px')})`;
              const source = `${set[i].split(' ').filter((n) => n)[0]}`;

              if (parseInt(i, 10) === parseInt(set.length, 10) - 1) {
                return (
                  <React.Fragment key={i}>
                    <source media={width} srcSet={source} />
                    <img src={src} alt={alt} data-fallback={srcSet} />
                  </React.Fragment>
                );
              }

              return <source media={width} srcSet={source} key={i} />;
            })
          }
        </picture>
      );
    }

    return (
      (!children)
        ? <img alt={alt} src={src} className={classStack} {...attrs} />
        : (
          <div
            className="image--container"
          >
            <div className={[classStack, 'image--inner'].join('')}>
              {children}
            </div>

            <span
              className="image--background"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: `${size}`,
                backgroundPosition: `${position}`,
                opacity: `${imageOpacity}`
              }}
              {...attrs}
            />

            <span
              className="image--color"
              style={{
                backgroundColor: `${color}`,
                opacity: `${colorOpacity}`
              }}
            />
          </div>
        )
    );
  }
}

export default Image;
