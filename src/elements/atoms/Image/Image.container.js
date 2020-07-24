// The Input JS module
export const Image = (el) => {
  // Image's ui helper object
  const ui = {
    el
  };

  const backgroundSrcSet = (sets) => Object.keys(sets).map((i) => {
    const set = sets[i].split(' ').filter((n) => n);
    const image = set[0];
    const width = parseInt(window.innerWidth, 10);
    const breakpoint = parseInt(set[1], 10);
    console.log((width >= breakpoint), width, breakpoint);
    if (width >= breakpoint) {
      el.style.backgroundImage = image;
      return false;
    }

    return false;
  });

  // Main init point
  const init = () => {
    // Responsive inline background image polyfill
    const sets = ui.el.style.backgroundImage.replace(/-webkit-image-set\((.*?)\)/g, '$1').split(',');

    if (ui.el.style.backgroundImage.indexOf('image-set') !== -1) {
      window.addEventListener('resize', () => {
        backgroundSrcSet(sets);
      });

      backgroundSrcSet(sets);
    }
  };

  // Self init
  init();
};

export default Image;
