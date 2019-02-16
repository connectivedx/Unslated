export const Select = (el) => {
  const ui = {
    el,
    native: el.querySelector('.field__native'),
    error: el.querySelector('.field__error-message')
  };

  // custom events
  const events = {
    change: document.createEvent('Event'),
    close: document.createEvent('Event'),
    open: document.createEvent('Event')
  };

  // mutation observer config
  const mutations = {
    childList: true,
    subTree: true
  };

  // closing of sub-field__decorator
  const close = () => {
    ui.el.classList.remove('open');
    document.body.removeEventListener('click', close, true);
    ui.el.dispatchEvent(events.close);
    setTimeout(() => {
      el.validate();
    }, 250);
  };

  // opening of sub-field__decorator
  const open = () => {
    ui.native.blur();
    ui.el.classList.add('open');
    document.body.addEventListener('click', close, true);
    ui.el.dispatchEvent(events.open);
  };

  // make selection (accepts e.target, option value string or option index)
  const choose = (target) => {
    if (typeof target === 'undefined') { return; }

    // univeral method to make the actual selection
    const makeSelection = (index, value) => {
      ui.native.value = value;
      ui.native.options.selectedIndex = index;
      ui.decorator.querySelectorAll('li')[index].classList.add('selected');
      ui.el.classList.remove('open');
      ui.el.dispatchEvent(events.change);
    };

    // removes .selected decorator class
    const hasSelection = el.querySelector('.selected');
    if (hasSelection) {
      hasSelection.classList.remove('selected');
    }

    // by value
    if (typeof target === 'string') {
      target = ui.native.querySelector(['[value="', target, '"'].join(''));
      if (!target) { return; }

      makeSelection(
        [...target.parentElement.children].indexOf(target),
        target
      );
      return;
    }

    // by index
    if (typeof target === 'number') {
      const option = ui.native.options[target];
      if (!option) { return; }
      makeSelection(
        target,
        ((target === 0) ? 0 : option.value)
      );
      return;
    }

    // by element
    if (target.dataset.value) {
      makeSelection(
        [...target.parentElement.children].indexOf(target),
        target.dataset.value
      );
    }
  };

  // build decorator list items
  const buildDecorator = () => {
    const fragment = document.createDocumentFragment();
    const { options } = ui.native;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      option.setAttribute('hidden', true);

      const item = document.createElement('li');
      item.classList.add('list__item');
      item.innerHTML = option.innerHTML;
      item.dataset.value = (option.value) ? option.value : 0;

      fragment.appendChild(item);
    }
    ui.decorator.innerHTML = '';
    ui.decorator.appendChild(fragment);
  };

  // setup method
  const init = () => {
    // install custom events
    events.change.initEvent('change', true, true);
    events.close.initEvent('close', true, true);
    events.open.initEvent('open', true, true);

    // Build decorator
    const decorator = document.createElement('ul');
    decorator.classList.add('sub-field__decorator');
    decorator.setAttribute('tabindex', 1);
    ui.decorator = decorator;

    // Append decorator list, making native and list as siblings
    ui.native.parentElement.appendChild(decorator);

    // Build out newly appended decorator list
    buildDecorator();

    // Click event listeners
    ui.el.addEventListener('click', (e) => {
      const { target } = e;

      // When have clicked native field
      if (target.classList.contains('field__native')) {
        if (ui.el.classList.contains('open')) {
          close();
        } else {
          open();
        }
      }

      // Making a selection with clicked
      choose(target);
    });

    // Blur event listener
    ui.el.addEventListener('onblur', () => {
      close();
      setTimeout(() => {
        el.validate();
      }, 250);
    });

    // Mutation observer (for when programmatically adding or removing <options>)
    const observer = new MutationObserver(buildDecorator);
    observer.observe(ui.native, mutations);

    // DOM access to methods
    ui.el.open = open;
    ui.el.close = close;
    ui.el.choose = choose;
    ui.el.validate = () => {
      Utils.checkValidity(el);
      if (ui.error) {
        ui.error.style.left = [ui.native.parentNode.offsetLeft, 'px'].join('');
      }
    };
  };

  // begin setup
  init();
};

export default Select;
