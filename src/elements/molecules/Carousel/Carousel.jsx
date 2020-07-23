/**
  Carousel element is a component for cycling through elements, like a carousel (slideshow).
*/
import Button from '@atoms/Button/Button';
import Icon from '@atoms/Icon/Icon';

export class Carousel extends React.Component {
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
    variant: PropTypes.oneOf(['default', 'icon-wrapper']),
    /** Children passed through */
    children: PropTypes.node,
    /** Autoplay determines if slide advances or placed in time delay */
    autoplay: PropTypes.bool,
    /** Delay determines milliseconds delay from advancing to next slide */
    delay: PropTypes.string,
    /** Loop determines if slides repeat or not */
    loop: PropTypes.bool,
    /** Determines inclusion of pagination dots if screen size allows */
    pagination: PropTypes.bool
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default',
    autoplay: false,
    loop: true,
    pagination: true
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      tagName,
      className,
      variant,
      autoplay,
      delay,
      loop,
      pagination,
      ...attrs
    } = this.props;

    const Tag = tagName;

    let { children } = this.props;
    children = Object.keys(children).map((i) => React.cloneElement(children[i], { autoplay, key: i }));

    let classStack = Utils.createClassStack([
      'carousel',
      `carousel--${variant}`,
      className
    ]);

    let dataCarousel = '';

    if (autoplay) {
      classStack = [classStack, ' carousel--autoplay'].join('');
    }

    if (!loop) {
      classStack = [classStack, ' carousel--no-loop'].join('');
    }

    if (!pagination) {
      classStack = [classStack, ' carousel--no-pagination'].join('');
    }

    if (delay) {
      const reg = RegExp('^[0-9]*$');
      if (reg.test(delay)) {
        dataCarousel = delay;
      }
    }

    if (dataCarousel.length > 0) {
      attrs['data-carouselDelay'] = `${dataCarousel}`;
    }

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

export class Carousel__slide extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Style variant */
    className: PropTypes.string,
    /** Class stacking */
    variant: PropTypes.oneOf(['default']),
    /** Children nodes being passed through */
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    tagName: 'div'
  };

  render = () => {
    const {
      tagName,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const Tag = tagName;

    const classStack = Utils.createClassStack([
      'carousel__slide',
      `carousel__slide--${variant}`,
      'padding--medium',
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}

export class Carousel__container extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Style variant */
    className: PropTypes.string,
    /** Class stacking */
    variant: PropTypes.oneOf(['default']),
    /** Children nodes being passed through */
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    tagName: 'div'
  };

  render = () => {
    const {
      tagName,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const Tag = tagName;

    const classStack = Utils.createClassStack([
      'carousel__container',
      `carousel__container--${variant}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  }
}

export class Carousel__controls extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Style variant */
    className: PropTypes.string,
    /** Class stacking */
    variant: PropTypes.oneOf(['default']),
    /** Children nodes being passed through */
    children: PropTypes.node,
    /** Autoplay passed from parent Carousel */
    autoplay: PropTypes.bool
  };

  static defaultProps = {
    tagName: 'div',
    autoplay: false
  };

  render = () => {
    const {
      tagName,
      className,
      variant,
      children,
      autoplay,
      ...attrs
    } = this.props;

    const Tag = tagName;

    const classStack = Utils.createClassStack([
      'carousel__controls',
      `carousel__controls--${variant}`,
      'flex',
      className
    ]);

    return (
      <Tag className={classStack} {...attrs} aria-label="Carousel navigation">
        {
          (autoplay)
            ? <Button aria-label="toggle start and stop carousel" className="carousel__button carousel--autoplay-button pause" />
            : ''
        }
        <Button variant="icon" aria-label="previous slide" className="carousel__button carousel__button-prev">
          <Icon name="left" ariaHidden />
        </Button>
        {children}
        <Button variant="icon" aria-label="next slide" className="carousel__button carousel__button-next">
          <Icon name="right" ariaHidden />
        </Button>
      </Tag>
    );
  }
}

export default Carousel;
