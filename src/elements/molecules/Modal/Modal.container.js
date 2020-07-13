// The Modal JS module
export const Modal = (el) => {
  // Modal ui helper object
  const ui = {
    modal: el,
    innerWidth: el.querySelector('.modal-inner--width'),
    innerHeight: el.querySelector('.modal-inner--height')
  };

  // checks if window height is smaller than modal height
  const checkHeight = (modal) => {
    if (!modal.classList.contains('hidden')) {
      modal.classList.remove('overflowing');
      modal.classList[
        (window.innerHeight <= (ui.innerWidth.clientHeight + 128))
          ? 'add'
          : 'remove'
      ]('overflowing');
    }
  };

  // window resize event
  const handleWindowResize = () => checkHeight(ui.modal);

  // Open modal
  const open = (modal, trigger) => {
    if (!modal || !modal.classList) { return; }

    if (trigger.href) {
      modal.dataset.href = trigger.href;
    }

    modal.classList.remove('hidden');
    modal.removeAttribute('data-modal-hide');
    modal.focus();

    checkHeight(ui.modal);
  };

  // Close modal
  const close = (modal) => {
    if (!modal || !modal.classList) { return; }
    modal.removeAttribute('data-href');
    modal.removeAttribute('data-modal-hide');
    modal.classList.add('hidden');
    // window.removeEventListener('resize', handleWindowResize, true);
  };

  // Get modal by ID
  const getRefModal = (modalId) => document.querySelector(`.modal[data-modal="${modalId}"]`);

  // Modals's main init method
  const init = () => {
    // Moves modal out of DOM and into body for developers.
    document.body.appendChild(ui.modal);

    // One global event listener for modals
    if (window.modals) { return false; }
    window.modal = true;

    // Setup resize listener for modal windows
    window.addEventListener(
      'resize',
      handleWindowResize,
      true
    );

    document.body.addEventListener('click', (event) => {
      const { target } = event;
      const { dataset } = target;
      const { classList } = target;

      if (!dataset) { return; }

      if (dataset.modal && !classList.contains('modal')) {
        open(getRefModal(dataset.modal), target);
        event.preventDefault();
      }

      if (classList.contains('modal-close')) {
        close(ui.modal);
      }

      if (
        classList.contains('modal')
        && classList.contains('modal--overlay-close-true')
      ) {
        close(ui.modal);
      }
    });

    document.body.addEventListener('keyup', (event) => {
      if (
        !ui.modal.classList.contains('hidden')
        && !ui.modal.classList.contains('modal--escape-close-false')
        && event.which === 27
      ) {
        close(ui.modal);
      }
    });

    // Hoist methods onto modal's DOM for other components to access
    el.checkHeight = checkHeight;
    el.close = close;
    el.open = open;

    return true;
  };

  // Self init
  el.close = close;
  init();
};

export default Modal;
