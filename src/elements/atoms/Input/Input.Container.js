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
      ui.error.style.left = [ui.native.offsetLeft, 'px'].join('');
    }
  };

  // Input component client side main init point
  const init = () => {
    // Radio & Checkbox click validation event listener
    if (ui.native.type === 'radio' || ui.native.type === 'checkbox') {
      el.addEventListener('click', () => {
        setTimeout(() => {
          el.validate();
        }, 250);
      });
    }

    // All input types blur validation event listener
    ui.native.addEventListener('blur', () => {
      setTimeout(() => {
        el.validate();
      }, 250);
    });

    // All input types keyup validation event listener
    ui.native.addEventListener('keyup', () => {
      setTimeout(() => {
        el.validate();
      }, 250);
    });
  };

  // Testing
  init();
};

export default Input;
