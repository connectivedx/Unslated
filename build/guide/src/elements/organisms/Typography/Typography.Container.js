export const GuideTypography = (el) => {
  const ui = {
    el,
    select: document.querySelector('.guide__select'),
    native: document.querySelector('#fonts')
  };

  const setFont = () => {
    const all = el.querySelectorAll('*');
    let i = all.length;
    while (i--) {
      all[i].style.fontFamily = ui.native.options[ui.native.selectedIndex].value;
    }

    el.querySelector('.guide__heading').innerHTML = ui.native.value;
  };

  // Our main install point
  const init = () => {
    setFont();

    ui.select.addEventListener('change', () => {
      setFont();
    });
  };

  init();
};

export default GuideTypography;
