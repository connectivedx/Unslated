export const Select = (el) => {
  const ui = {
    el,
    native: el.querySelector('.field__native'),
    error: el.querySelector('.field__error-message')
  };

  // custom event hooks
  const events = {
    change: document.createEvent('Event'),
    close: document.createEvent('Event'),
    open: document.createEvent('Event')
  };

  events.change.initEvent('change', true, true);
  events.close.initEvent('close', true, true);
  events.open.initEvent('open', true, true);

  // handles the selection of sub-field__decorator
  const handleSelection = (target) => {
    if (typeof target === 'undefined') { return; }

    // out with the old
    const hasSelection = el.querySelector('.selected');
    if (hasSelection) {
      hasSelection.classList.remove('selected');
    }

    // by string
    if (typeof target === 'string') {
      if (!ui.native.querySelector(['[value="', target, '"'].join(''))) { return; }
      const index = Array.from(option.parentNode.children).indexOf(option); // eslint-disable-line
      ui.native.value = target;
      ui.el.querySelectorAll('li')[index].classList.add('selected');
      ui.el.classList.remove('open');
      ui.el.dispatchEvent(events.change);
      return;
    }

    // by numberical int
    if (typeof target === 'number') {
      if (!ui.native.options[target]) { return; }
      ui.native.value = (target === 0) ? 0 : ui.native.options[target].value;
      ui.el.querySelectorAll('li')[target].classList.add('selected');
      ui.el.classList.remove('open');
      ui.el.dispatchEvent(events.change);
      return;
    }

    // by option element
    if (target.dataset.value) {
      target.classList.add('selected');
      ui.native.value = target.dataset.value;
      ui.el.classList.remove('open');
      ui.el.dispatchEvent(events.change);
    }
  };

  // handles the closing of sub-field__decorator
  const handleClose = () => {
    ui.el.classList.remove('open');
    document.body.removeEventListener('click', handleClose, true);
    ui.el.dispatchEvent(events.close);
    setTimeout(() => {
      el.validate();
    }, 250);
  };

  // handles the opening of sub-field__decorator
  const handleOpen = () => {
    ui.native.blur();
    ui.el.classList.add('open');
    document.body.addEventListener('click', handleClose, true);
    ui.el.dispatchEvent(events.open);
  };

  // installs the sub-field__decorator
  const init = () => {
    // Make sub-field__decorator to hide native select options
    const selectList = document.createElement('ul');
    selectList.classList.add('sub-field__decorator');
    selectList.setAttribute('tabindex', 1);

    for (let i = 0; i < ui.native.options.length; i++) {
      const nativeOption = ui.native.options[i];
      nativeOption.setAttribute('hidden', true);
      const option = document.createElement('li');
      option.classList.add('list__item');
      option.innerHTML = nativeOption.innerHTML;
      option.dataset.value = (nativeOption.value) ? nativeOption.value : 0;
      selectList.appendChild(option);
    }

    // Append sub-field__decorator to field__decorator to keep sub-field and native as siblings
    ui.native.parentElement.appendChild(selectList);

    ui.el.validate = () => {
      Utils.checkValidity(el);
      if (ui.error) {
        ui.error.style.left = [ui.native.parentNode.offsetLeft, 'px'].join('');
      }
    };

    // Events
    ui.el.addEventListener('click', (e) => {
      const clicked = e.target;

      // If we have clicked the native field
      if (clicked.classList.contains('field__native')) {
        if (ui.el.classList.contains('open')) {
          handleClose();
        } else {
          handleOpen(e);
        }
      }

      // Making a selection from sub-field__decorator and sending it to native select
      handleSelection(clicked);
    });

    // on blur of select, remove open class
    ui.el.addEventListener('onblur', () => {
      handleClose();
      setTimeout(() => {
        el.validate();
      }, 250);
    });

    ui.el.handleOpen = handleOpen;
    ui.el.handleClose = handleClose;
    ui.el.handleSelection = handleSelection;
  };

  init();
};

export default Select;
