// Alert component client side namespace
export const Alert = (el) => {
  // Alert's helper UI object
  const ui = {
    el,
    modalBtn: document.querySelector('#alert-modal-btn'),
    modal: el.querySelector('.alert-modal'),
    closeBtn: el.querySelector('.alert-close-btn')
  };

  const state = { open: false };

  // Alert's main init point
  const init = () => {
    // Alert init logic here

    if (ui.el.classList.contains('alert--modal')) {
      ui.modalBtn.addEventListener('click', () => {
        // ui.modal.classList.remove('alert-hidden');
        state.open = !state.open;
        ui.modal.classList[!state.open ? 'add' : 'remove']('alert-hidden');
      });
      ui.closeBtn.addEventListener('click', () => {
        state.open = false;
        ui.modal.classList.add('alert-hidden');
      });
      window.addEventListener('click', (e) => {
        if (e.target === ui.modal) {
          state.open = false;
          ui.modal.classList.add('alert-hidden');
        }
      });
    }
  };

  // Self init
  init();
};

export default Alert;
