import _ from 'lodash';

//Private functions
const getWindowHeight = (maxHeight) => {
  var heightTrim = parseInt(maxHeight);
  heightTrim = 100 - heightTrim;
  return window.innerHeight - (window.innerHeight * (heightTrim/100).toFixed(2));  
}

export const Modal = (el) => {
  const ui = {
    modal: el
  };

  // our modal history object
  const modalHistory = [];

  // This method is used to determin if the currently openend modal needs the overflow class applied or not to introduce inner scroll bars or not
  // please note this method is debounced
  const checkHeight = () => {
    const elm = document.querySelector('.modal-visible');
    if (!elm) { return; }

    elm.classList.remove('overflowing');
    if (window.innerHeight <= (elm.querySelector('.modal-inner *:first-child').clientHeight + 180)) {
      elm.classList.add('overflowing');
    } else {
      elm.classList.remove('overflowing');
    }
  }

  // This method takes the modal element and puts into our history prior to opening it. It also closes or hides any previously opened modals within our history.
  const open = (modal, trigger) => {
    if (!modal || !modal.classList) { return; }

    if (modalHistory.length) { 
      hide(modalHistory[modalHistory.length - 1]);
    }

    modalHistory.push(modal);

    if (trigger.hasAttribute('href')) {
      modal.dataset.href = trigger.href;
    }

    modal.classList.add('modal-visible');
    modal.removeAttribute('data-modal-hide');

    setTimeout(() => {
      checkHeight();
    });
  }

  // This method takes the moda element and removes it from our history just prior to opening it.
  const close = (modal) => {
    if (!modal || !modal.classList) { return; }

    modalHistory.pop();

    if (modalHistory.length) {
      unhide(modalHistory[modalHistory.length - 1]);
    }

    modal.classList.remove('modal-visible');
    modal.removeAttribute('data-modal-hide');
    modal.removeAttribute('data-href');
  }

  // This method re-uses our close method from above within a loop over all page modals.
  const closeAll = () => {
    const modals = document.querySelectorAll('.modal');
    Object.keys(modal).map(index => {
      close(modals[i]);
    });
  }

  // This method is used to hide any previously opened modals vs. close the modal to retain history of modals.
  const hide = (modal) => {
    if (!modal) { return; }
    modal.setAttribute('data-modal-hide', true);
  }

  // This method is used to unhide any previously hidden modals vs. re-open the modal to retain history of modals.
  const unhide = (modal) => {
    if (!modal) { return; }
    modal.removeAttribute('data-modal-hide');
  }

  const init = () => {
    // prepare a close button for modal
    const closeButton = document.createElement('a');
    closeButton.setAttribute('data-modal-close', true);

    // prepare inner wrapper for modal
    const inner = document.createElement('div');
    inner.classList.add('modal-inner');

    // prepare inner wrapper for width variants
    const innerWidth = document.createElement('div');
    innerWidth.classList.add('modal-inner--width');

    // prepare inner wrapper for height scrolling
    const innerHeight = document.createElement('div');
    innerHeight.classList.add('modal-inner--height');

    // prepare inner modal content for a hook to modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // compile modal
    modalContent.innerHTML = ui.modal.innerHTML;
    innerHeight.appendChild(modalContent);
    innerWidth.appendChild(closeButton);
    innerWidth.appendChild(innerHeight);
    inner.appendChild(innerWidth);
    ui.modal.innerHTML = '';
    ui.modal.appendChild(inner);

    // drop modal at body level
    document.body.appendChild(ui.modal);

    // one listener to rule them all
    // this allows modals and even targets to be changed or added to the DOM without losing any events.
    document.body.addEventListener('click', (e) => {
      const target = e.target; // tell us what was clicked please

      // get our targets modal element
      const getRefModal = (modalId) => {
        const refSelector = ['.modal[data-modal="', modalId, '"]'].join('');
        const refModal = document.querySelector(refSelector);
        if (refModal) { return refModal; }

        return;
      };

      // if target has no data set, we are done here
      if (target.dataset) {
        // open new modal, from within a modal
        const dataset = target.dataset;
        const classes = target.classList;
        if (dataset.modal && !classes.contains('modal')) {
          const refModal = getRefModal(dataset.modal);
          if (!refModal) { return; }
       
          // pass our targets modal element to the open method
          open(refModal, target);
          e.preventDefault();
        }

        // click close button
        if (dataset.modalClose) {
          close(Utils.parents(target, '.modal'));
        }

        // click overlay close modal
        if (classes.contains('modal')) {
          close(target);
        }
      }     
    });

    // finally, we run our debounced checkHeight to a window resize listener.
    window.addEventListener('resize', _.debounce(() => {
      checkHeight();
    }, 250))
  }

  init();
};

export default Modal;
