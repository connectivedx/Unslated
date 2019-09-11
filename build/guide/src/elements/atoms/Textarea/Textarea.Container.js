// The Textarea JS module
export const Textarea = (el) => {
  // Textarea's ui helper object
  const ui = {
    el,
    native: el.querySelector('.field__native'),
    error: el.querySelector('.field__error-message')
  };

  // Teatarea's validation method (see: src/utilities.jsx checkValidity)
  el.validate = () => {
    Utils.checkValidity(el);
  };

  // Main init point
  const init = () => {
    // Field's "input" event listener / validation
    ui.native.addEventListener('input', () => {
      el.validate();
    });
  };

  // Self init
  init();
};

export default Textarea;
