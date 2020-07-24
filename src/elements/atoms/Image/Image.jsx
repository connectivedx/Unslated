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
    backgroundSize: PropTypes.string,
    /** Defines the background-position if used with children */
    backgroundPosition: PropTypes.oneOf([
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
    backgroundColor: PropTypes.string,
    /** Defines the color's level of opacity */
    backgroundColorOpacity: PropTypes.number
  };

  static defaultProps = {
    variant: 'auto',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundColorOpacity: 1.0
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
      backgroundSize,
      backgroundPosition,
      backgroundColorOpacity,
      backgroundColor,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'image',
      `image--${variant}`,
      className
    ]);


    const getPicture = (asBackground = false) => {
      if (!srcSet && !children) {
        return <img alt={alt} src={src} className={(asBackground) ? classStack : 'image__background'} {...attrs} />;
      }

      const set = srcSet.split(',');

      // Nested bakground image
      if (srcSet && children) {
        const backgroundImage = `-webkit-image-set(${
          Object.keys(set).map((i) => {
            const source = `${set[i].split(' ').filter((n) => n)[0]}`;
            const breakpoint = `${set[i].split(' ').filter((n) => n)[1].replace(/vw/g, 'x').replace(/w/g, 'x').replace(/px/g, 'x')}`;

            return `url(${source}) ${breakpoint}`;
          })
        })`;

        return (
          <div
            className="image image--background"
            style={{
              backgroundSize,
              backgroundImage,
              backgroundPosition
            }}
          >
            <div className="image__content">{children}</div>
            <span
              className="image__color"
              style={{
                backgroundColor,
                opacity: backgroundColorOpacity
              }}
            />
          </div>
        );
      }

      return (
        <picture className={(asBackground) ? classStack : 'image__background'}>
          {
            Object.keys(set).map((i) => {
              const width = `(max-width: ${set[i].split(' ').filter((n) => n)[1].replace(/vw/g, 'px').replace(/w/g, 'px')})`;
              const source = `${set[i].split(' ').filter((n) => n)[0]}`;

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
