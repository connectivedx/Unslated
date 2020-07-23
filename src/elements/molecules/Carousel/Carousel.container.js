// The Carousel JS module
import { tns } from 'tiny-slider/src/tiny-slider';

export const Carousel = (el) => {
  // Carousel's ui helper object
  const ui = {
    el,
    slides: el.querySelector('.carousel__container'),
    prevButton: el.querySelector('.carousel__button-prev'),
    nextButton: el.querySelector('.carousel__button-next'),
    autoplay: el.classList.contains('carousel--autoplay'),
    delay: el.dataset.carouselDelay ? el.dataset.carouselDelay : '5000',
    loop: !el.classList.contains('carousel--no-loop'),
    pagination: !el.classList.contains('carousel--no-pagination'),
    customPagination: el.querySelector('.carousel__pagination-custom') ? el.querySelector('.carousel__pagination-custom') : false
  };

  const sliderSettings = {
    container: ui.slides,
    prevButton: ui.prevButton,
    nextButton: ui.nextButton,
    items: 1,
    slideBy: 'page',
    center: true,
    preventScrollOnTouch: 'force',
    autoplay: ui.autoplay,
    autoplayButton: ui.autoplay ? el.querySelector('.carousel--autoplay-button') : false,
    autoplayText: ['', ''],
    autoplayTimeout: ui.delay,
    loop: ui.loop,
    nav: ui.pagination,
    navContainer: ui.customPagination,
    navPosition: 'bottom'
  };

  // Carousel's main init method
  const init = () => {
    const slides = new tns(sliderSettings); // eslint-disable-line

    if (el.querySelector('.carousel--autoplay-button')) {
      const autoplayButton = el.querySelector('.carousel--autoplay-button');
      autoplayButton.addEventListener('click', () => {
        if (autoplayButton.classList.contains('pause')) {
          autoplayButton.classList.remove('pause');
          autoplayButton.classList.add('play');
        } else {
          autoplayButton.classList.remove('play');
          autoplayButton.classList.add('pause');
        }
      });
    }
  };

  // Self init
  init();
};

export default Carousel;
