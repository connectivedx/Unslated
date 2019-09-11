// The Tabs JS module
export const Tabs = (el) => {
  // Tabs ui helper object
  const ui = {
    el,
    triggers: el.querySelectorAll('[data-tabs-trigger]'),
    targets: el.querySelectorAll('[data-tabs-target]')
  };

  // Sets active state of clicked tab trigger
  const state = (id) => {
    Object.keys(ui.triggers).map((i) => {
      ui.triggers[i].classList.remove('active');
      return false;
    });

    ui.triggers[id].classList.add('active');
    return false;
  };

  // Hides all tabs targets
  const hide = () => Object.keys(ui.targets).map((i) => {
    ui.targets[i].classList.add('hide');
    return false;
  });

  // Shows specific tabs target
  const show = (id) => {
    hide();
    state(parseInt(id, 10));
    ui.targets[parseInt(id, 10)].classList.remove('hide');
  };

  // Tabs's main init method
  const init = () => {
    show(el.dataset.default);

    // Event listener
    ui.el.addEventListener('click', (e) => {
      const { target } = e;
      if (!target.dataset) { return false; }

      if (target.dataset.tabsTrigger) {
        show(target.dataset.tabsTrigger);
        e.preventDefault();
      }

      return false;
    });

    // Makes methods available to DOM
    el.hide = hide;
    el.show = show;
  };

  // Self init
  init();
};

export default Tabs;
