// Alert component client side namespace
export const Alert = (el) => {
  // Alert's helper UI object
  const ui = {
    el,
    trigger: el.querySelector('.alert--trigger'),
    closeIcon: el.querySelector('.alert--close-icon')
  };

  const state = {
    isModal: el.classList.contains('alert--modal'),
    isInline: el.classList.contains('alert--inline'),
    isPersistent: el.classList.contains('alert--persistent-true')
  };

  // Alert's main init point
  const init = () => {
    // If we are alert modal, lets open it at page load
    if (state.isModal) {
      el.open(el);
    }

    ui.el.addEventListener('click', (event) => {
      const { target } = event;
      const { classList } = target;

      // Dismiss alert
      if (target === ui.closeIcon) {
        ui.el.classList.add('hidden');
        ui.el.ariaHidden = true;

        if (state.isPersistent) {
          if (!el.id) {
            console.error('Warning: You are trying to store an Alert molecule\'s state in localStorage but you have not supplied an id attribute on the <Alert> tag.'); // eslint-disable-line
          } else {
            localStorage.setItem(
              el.id,
              'alert dismissed'
            );
          }
        }
      }

      // close alert modal
      if (
        classList.contains('alert--accept')
        || classList.contains('alert--deny')
      ) {
        el.close(el);
      }
    });

    // hide alert if in localStorage
    if (localStorage.getItem(el.id)) {
      if (state.isInline) {
        el.classList.add('hidden');
        el.ariaHidden = true;
      }
    }
  };

  // Self init
  init();
};

export default Alert;
