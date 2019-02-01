export const Form = (el) => {
  const ui = {
    el,
    native: el.querySelector('.field__native')
  };

  const init = () => {

    /** Dynamic placeholders logic */
    const updateDynamicPlaceholderState = (target, state) => {
      const parent = target.parentElement;
      if (parent.classList.contains('input--dynamic-placeholder')) {
        if (state) {
          parent.classList.add('focused');
          ui.native.focus();
        } else {
          if (!ui.native.value.length) {
            parent.classList.remove('focused');
          }
        }
      }
    };

    el.addEventListener('click', (e) => {
      updateDynamicPlaceholderState(e.target, true);
    });

    ui.native.addEventListener('focus', (e) => {
      updateDynamicPlaceholderState(e.target, true);
    });

    ui.native.addEventListener('blur', (e) => {
      updateDynamicPlaceholderState(e.target, false);
    });
    /* end dynamic placeholders */   
  }

  init();
};

export default Form;
