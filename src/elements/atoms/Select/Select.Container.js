export const Select = (el) => {
  const ui = {
    el,
    native: el.querySelector('.field__native')
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

  // handles the closing of sub-field__decorator
  const handleClose = () => {
    ui.el.classList.remove('open');
    document.body.removeEventListener('keyup', handleKeyUp, true);
    document.body.removeEventListener('click', handleClose, true);
    ui.el.dispatchEvent(events.close);
  }

  // handles the opening of sub-field__decorator
  const handleOpen = () => {
    ui.native.blur();
    ui.el.classList.add('open');
    document.body.addEventListener('keyup', handleKeyUp, true);
    document.body.addEventListener('click', handleClose, true);
    ui.el.dispatchEvent(events.open);  
  };

  // handles the selection of sub-field__decorator
  const handleSelection = (target) => {
    if (typeof target === 'undefined') { return; }
    document.body.removeEventListener('keyup', handleKeyUp, true);
    

    // out with the old
    const hasSelection = el.querySelector('.selected');
    if (hasSelection) {
      hasSelection.classList.remove('selected');
    }

    // by string
    if (typeof target === 'string') {
      if (!ui.native.querySelector('[value="'+target+'"')) {
        console.log('No option with that string value could be found.');
        return;
      }
      let option = ui.native.querySelector('option[value="'+target+'"');
      let index = Array.from(option.parentNode.children).indexOf(option);
      ui.native.value = target;
      ui.el.querySelectorAll('li')[index].classList.add('selected');
      ui.el.classList.remove('open');
      ui.el.dispatchEvent(events.change);
      return;       
    }

    // by numberical int
    if (typeof target === 'number') {
      if (!ui.native.options[target]) {
        console.log('No option value with that numerical index could be found.');
        return;
      }
      ui.native.value = (target === 0) ? 0 : ui.native.options[target].value;
      ui.el.querySelectorAll('li')[target].classList.add('selected');
      ui.el.classList.remove('open');
      ui.el.dispatchEvent(events.change);
      return;
    }

    // by option element
    if (target.dataset.value) {
      // in with the new
      target.classList.add('selected');
      ui.native.value = target.dataset.value;
      ui.el.classList.remove('open');
      ui.el.dispatchEvent(events.change);
      return;
    }
    return;
  };

  // handles the accessibility of sub-field__decorator
  const handleKeyUp = (e) => {
    let key = e.keyCode;
    let hasSelection = el.querySelector('.selected');

    if (!hasSelection) {
      hasSelection = el.querySelectorAll('.sub-field__decorator li')[0];
      hasSelection.classList.add('selected');
    }

    // look ahead and behind
    let hasPrevious = hasSelection.previousElementSibling;
    let hasNext = hasSelection.nextElementSibling;

    if (key === 38) { // up arrow
      if (hasPrevious) {
        hasPrevious.classList.add('selected');
        hasSelection.classList.remove('selected');
        hasSelection = hasPrevious;
      }
      e.preventDefault();
    }

    if (key === 40) { // down arrow
      if (hasNext) {
        hasNext.classList.add('selected');
        hasSelection.classList.remove('selected');
        hasSelection = hasNext;
      }
      e.preventDefault();
    }

    if (key === 13) {
      handleSelection(hasSelection);
    }

    if (key === 27) {
      ui.el.classList.remove('open');
      document.body.removeEventListener('keyup', handleKeyUp, true);
    }    
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
      option.dataset.value = nativeOption.value;
      selectList.appendChild(option);
    }

    // Append sub-field__decorator to field__decorator to keep sub-field and native as siblings
    ui.native.parentElement.appendChild(selectList);

    // events
    ui.el.addEventListener('click', (e) => {
      let target = e.target;

      // if we have clicked the native field
      if (target.classList.contains('field__native')) {
        if (ui.el.classList.contains('open')) {
          handleClose();
        } else {                            
          handleOpen();       
        }
      }

      // Making a selection from sub-field__decorator and sending it to native select
      handleSelection(target);
    });

    // on blur of select, remove open class
    ui.el.addEventListener('onblur', () => {
      handleClose();
    });

    ui.el.handleOpen = handleOpen;
    ui.el.handleClose = handleClose;
    ui.el.handleSelection = handleSelection;
  }

  init();
};

export default Select;
