// Alert component client side namespace
export const Alert = (el) => {
  // Alert's helper UI object
  const ui = {
    el,
    alertTrigger: el.querySelector('.alert--trigger')
  };

  // Alert's main init point
  const init = () => {
    // dismiss alert
    if (ui.el.querySelector('.alert--close-icon')) {
      ui.el.querySelector('.alert--close-icon').addEventListener('click', () => {
        ui.el.classList.add('alert-hidden');
        if (ui.el.dataset.persistent) {
          localStorage.setItem((ui.el.dataset.alert), 'alert dismissed');
        }
      });
    }

    // hide alert if in localStorage
    if (ui.el.dataset && localStorage.getItem(ui.el.dataset.alert)) {
      if (ui.el.classList.contains('alert--inline')) {
        ui.el.classList.add('alert-hidden');
      }
    }

    if (ui.alertTrigger) {
      const refModal = document.querySelector(`.modal[data-modal="${ui.alertTrigger.dataset.modal}"]`);
      const modalButtons = refModal.querySelectorAll('.button');
      Object.keys(modalButtons).map((i) => {
        modalButtons[i].addEventListener('click', () => {
          if (modalButtons[i].classList.contains('alert--accept')) {
            refModal.close(refModal);
          }
          if (modalButtons[i].classList.contains('alert--deny')) {
            refModal.close(refModal);
          }
        });
        return false;
      });
    }

    // this is primarily for the guide to restore alert & remove from localStorage
    if (ui.el.dataset.alert && document.querySelector(`button[data-alert=${ui.el.dataset.alert}]`)) {
      const restoreButton = document.querySelector(`button[data-alert=${ui.el.dataset.alert}]`);
      restoreButton.addEventListener('click', () => {
        ui.el.classList.remove('alert-hidden');
        if (localStorage.getItem(restoreButton.dataset.alert)) {
          localStorage.removeItem(restoreButton.dataset.alert);
        }
      });
    }
  };

  // Self init
  init();
};

export default Alert;
