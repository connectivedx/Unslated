export const Textarea = (el) => {
  const ui = {
    el,
    native: el.querySelector('.field__native'),
    error: el.querySelector('.field__error-message')
  };

  const init = () => {
    el.validate = () => {
      Utils.checkValidity(el);
      if (ui.error) {
        ui.error.style.left = [ui.native.offsetLeft, 'px'].join('');
      }
    };

    ui.native.addEventListener('keyup', () => {
      el.validate();
    });

    ui.native.addEventListener('blur', () => {
      el.validate();
    });
  };

  init();
};

export default Textarea;
