/**
  Image allows for graphical media in and around HTML documents.
  Image can support both inline and container backgrounds as well as srcSet / Picture tag with IE11 fallbacks.
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
    /** Defines the path source of an image */
    src: PropTypes.string,
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
    /** Defines a belnding color with image */
    color: PropTypes.string,
    /** Defines the color's level of opacity */
    opacity: PropTypes.number
  };

  static defaultProps = {
    variant: 'auto',
    size: '100%',
    position: 'center',
    opacity: 1.0
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
      opacity,
      color,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'image',
      `image--${variant}`,
      className
    ]);

    // Used to remove CSS units from strings
    const clearUnits = (string) => string.replace(/vw/g, 'x').replace(/w/g, 'x').replace(/px/g, 'x');

    // Used to get <img>, <picture> or <div role="img" arial-label={alt} style="background-image:...;">...</div>
    const getPicture = () => {
      if (!children && !srcSet) {
        return <img alt={alt} src={src} className={classStack} {...attrs} />;
      }

      // Nested bakground image
      const set = srcSet ? srcSet.split(',') : false;
      if (children) {
        let backgroundImage = `url(${src})`;

        if (srcSet) {
          backgroundImage = `-webkit-image-set(${
            Object.keys(set).map((i) => {
              const setData = set[i].split(' ').filter((n) => n);
              return `url(${setData[0]}) ${clearUnits(setData[1])}`;
            })
          })`;
        }

        return (
          <div
            role="img"
            aria-label={alt}
            className="image image--background"
            style={{
              backgroundSize: size,
              backgroundPosition: position,
              backgroundImage
            }}
          >
            <div className="image__content">{children}</div>
            <span
              role="none"
              className="image__color"
              style={{
                opacity,
                backgroundColor: color
              }}
            />
          </div>
        );
      }

      return (
        <picture className={classStack}>
          {
            Object.keys(set).map((i) => {
              const setData = set[i].split(' ').filter((n) => n);
              const width = `(max-width: ${clearUnits(setData[1]).replace('x', 'px')})`;
              const source = `${setData[0]}`;

              if (parseInt(i, 10) === parseInt(set.length, 10) - 1) {
                return (
                  <React.Fragment key={i}>
                    <source media={width} srcSet={source} />
                    <img src={source} alt={alt} data-fallback={srcSet} />
                  </React.Fragment>
                );
              }

              return <source media={width} srcSet={source} key={i} />;
            })
          }
        </picture>
      );
    };

    return getPicture();
  }
}

export default Image;
