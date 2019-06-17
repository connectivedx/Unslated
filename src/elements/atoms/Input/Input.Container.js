// Input component client side namespace
export const Input = (el) => {
  // UI obect houses common selected elements within component
  const ui = {
    el,
    native: el.querySelector('.field__native'),
    error: el.querySelector('.field__error-message')
  };

  // Setup validation hook
  el.validate = () => {
    Utils.checkValidity(el);
    if (ui.error) {
      ui.error.style.left = `${ui.native.offsetLeft}px`;
    }
  };

  // Input component client side main init point
  const init = () => {
    // Validation
    el.addEventListener('input', () => {
      el.validate();
    });
  };

  init();
};

export default Input;
