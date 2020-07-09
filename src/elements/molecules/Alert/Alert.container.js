// Alert component client side namespace
export const Alert = (el) => {
  // Alert's helper UI object
  const ui = {
    el
  };

  // Alert's main init point
  const init = () => {
    // Alert init logic here
    if (ui.el.classList.contains('alert--default')) {
      ui.el.querySelector('.alert--close-icon').addEventListener('click', () => {
        ui.el.classList.add('alert-hidden');
      });
    }
  };

  // Self init
  init();
};

export default Alert;
