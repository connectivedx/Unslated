// The Modal JS module
export const Modal = (el) => {
  // Modal ui helper object
  const ui = {
    modal: el,
    innerWidth: el.querySelector('.guide__modal-inner--width'),
    innerHeight: el.querySelector('.guide__modal-inner--height')
  };

  // checks if window height is smaller than modal height
  const checkHeight = () => {
    const elm = document.querySelector('.guide__modal-visible');
    if (!elm) { return; }

    elm.classList.remove('overflowing');
    elm.classList[(window.innerHeight <= (ui.innerWidth.clientHeight + 96)) ? 'add' : 'remove']('overflowing');
  };

  // window resize event
  const handleWindowResize = () => checkHeight();

  // Open modal
  const open = (modal, trigger) => {
    if (!modal || !modal.classList) { return; }

    if (trigger.hasAttribute('href')) {
      modal.dataset.href = trigger.href;
    }

    modal.classList.add('guide__modal-visible');
    modal.removeAttribute('data-modal-hide');

    setTimeout(() => {
      checkHeight();
    });
  };

  // Close modal
  const close = (modal) => {
    if (!modal || !modal.classList) { return; }
    modal.removeAttribute('data-href');
    modal.removeAttribute('data-modal-hide');
    modal.classList.remove('guide__modal-visible');
    window.removeEventListener('resize', handleWindowResize, true);
  };

  // Get modal by ID
  const getRefModal = (modalId) => document.querySelector(`.guide__modal[data-modal="${modalId}"]`);

  // Modals's main init method
  const init = () => {
    document.body.appendChild(ui.modal);
    window.addEventListener('resize', handleWindowResize, true);

    if (window.modals) { return false; }
    document.body.addEventListener('click', (e) => {
      const { dataset } = e.target;
      const { classList } = e.target;

      if (dataset) {
        if (dataset.modal && !classList.contains('guide__modal')) {
          open(getRefModal(dataset.modal), e.target);
          e.preventDefault();
        }

        if (dataset.modalClose || classList.contains('guide__modal')) {
          close(ui.modal);
        }
      }
    });
    window.modal = true;

    return false;
  };

  // Self init
  init();
};

export default Modal;
