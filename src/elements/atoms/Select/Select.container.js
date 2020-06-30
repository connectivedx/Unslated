// The Select JS module
export const Select = (el) => {
  // Select's ui helper object
  const ui = {
    el,
    error: el.querySelector('.field__error-message'),
    native: el.querySelector('.field__native')
  };

  // Select's validation method (see: src/utilities.jsx checkValidity)
  el.validate = () => {
    Utils.checkValidity(el);
  };

  // Main init point
  const init = () => {
    // Field's "input" event listener / validation
    ui.native.addEventListener('input', () => {
      Utils.toggleClass(ui.native, 'open');
      el.validate();
    });
  };

  // Self init
  init();
};

export default Select;
