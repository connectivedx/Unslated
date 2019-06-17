export const Select = (el) => {
  const ui = {
    el,
    error: el.querySelector('.field__error-message'),
    native: el.querySelector('.field__native'),
    decorator: el.querySelector('.select__decorator')
  };

  const events = {
    change: document.createEvent('Event'),
    close: document.createEvent('Event'),
    open: document.createEvent('Event')
  };

  // select.close()
  const close = () => {
    ui.el.classList.remove('open');
    ui.el.dispatchEvent(events.close);
    el.validate();
  };

  // select.open()
  const open = () => {
    ui.native.blur();
    ui.el.classList.add('open');
    ui.el.dispatchEvent(events.open);
  };

  const makeSelection = (index, value) => {
    const isMulti = ui.native.hasAttribute('multiple');
    const oldSelection = ui.decorator.querySelector('.selected');
    const newSelection = ui.decorator.querySelectorAll('li')[index];

    if (isMulti) {
      Utils.toggleClass(newSelection, 'selected');

      const items = ui.decorator.querySelectorAll('li');
      Object.keys(items).map((i) => {
        if (items[i].classList.contains('selected')) {
          ui.native.options[i].setAttribute('selected', 'selected');
        } else {
          ui.native.options[i].removeAttribute('selected');
        }

        return false;
      });
    } else {
      ui.native.value = value;
      ui.native.selectedIndex = index;
    }

    if (!isMulti) {
      if (oldSelection) {
        oldSelection.classList.remove('selected');
      }
      newSelection.classList.add('selected');
    }

    ui.el.classList.remove('open');
    ui.decorator.dataset.placeholder = newSelection.innerText;
    ui.el.dispatchEvent(events.change);
  };

  // select.choose(int|string|node)
  const choose = (target) => {
    if (typeof target === 'undefined') { return; }

    // make selection by value string
    if (typeof target === 'string') {
      target = ui.native.querySelector(`[value="${target}"]`);
      if (!target) { return; }

      makeSelection(
        [...target.parentElement.children].indexOf(target),
        target
      );
      return;
    }

    // make selection by index int
    if (typeof target === 'number') {
      const option = ui.native.options[target];
      if (!option) { return; }
      makeSelection(
        target,
        ((target === 0) ? 0 : option.value)
      );
      return;
    }

    // make selection by element element node
    if (target.hasAttribute('data-value')) {
      makeSelection(
        [...target.parentElement.children].indexOf(target),
        target.dataset.value
      );
    }
  };

  // select.update()
  const update = () => {
    let collection = '';
    const { options } = ui.native;

    collection += Object.keys(options).map((i) => `
      <li
        class="list__item"
        data-value="${(options[i].value) ? options[i].value : 0}"
        hidden
      >
        ${options[i].innerHTML}
      </li>
    `).join('');
    console.log(ui.decorator);
    ui.decorator.innerHTML = collection;
  };

  const init = () => {
    events.open.initEvent('open', true, true);
    events.close.initEvent('close', true, true);
    events.change.initEvent('change', true, true);

    ui.el.addEventListener('click', (e) => {
      if (!ui.el.classList.contains('select--multiple')) {
        Utils.toggleClass(ui.el, 'open');
      }
      if (e.target.classList.contains('list__item')) {
        choose(e.target);
      }
    });

    ui.el.addEventListener('onblur', () => {
      close();
      el.validate();
    });

    ui.el.open = open;
    ui.el.close = close;
    ui.el.choose = choose;
    ui.el.update = update;

    ui.el.validate = () => {
      Utils.checkValidity(el);
      if (ui.error) {
        ui.error.style.left = [ui.native.parentNode.offsetLeft, 'px'].join('');
      }
    };
  };

  init();
};

export default Select;
