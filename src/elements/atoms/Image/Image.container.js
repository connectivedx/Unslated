// The Input JS module
export const Image = (el) => {
  // Image's ui helper object
  const ui = {
    el
  };

  /* Image used as backgrounds supports srcSet still with this helper method */
  const srcSetBackgroundUpdate = (sets) => Object.keys(sets).map((i) => {
    const set = sets[i].split(' ').filter((n) => n);
    if (parseInt(window.innerWidth, 10) >= parseInt(set[1], 10)) {
      ui.el.style.backgroundImage = set[0]; // eslint-disable-line
      return false;
    }

    return false;
  });

  // Main init point
  const init = () => {
    // Responsive inline background image polyfill
    if (ui.el.style.backgroundImage.indexOf('image-set') !== -1) {
      const sets = ui.el.style.backgroundImage.replace(/-webkit-image-set\((.*?)\)/g, '$1').split(',');
      srcSetBackgroundUpdate(sets); // window load
      window.addEventListener('resize', () => srcSetBackgroundUpdate(sets)); // window resize
    }
  };

  // Self init
  init();
};

export default Image;
