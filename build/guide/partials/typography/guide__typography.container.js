export const GuideTypography = (el) => {
  const ui = {
    el,
    select: document.querySelector('.select'),
    selectNative: document.querySelector('#fonts')
  };

  // Our main install point
  const init = () => {
    ui.select.addEventListener('change', () => {
      const all = el.querySelectorAll('*');
      let i = all.length;
      while (i--) {
        all[i].style.fontFamily = ui.selectNative.value;
      }
      el.querySelector('.heading').innerHTML = ui.selectNative.value;
    });

    setTimeout(() => {
      ui.select.choose(0);
    });
  };

  init();
};

export default GuideTypography;
