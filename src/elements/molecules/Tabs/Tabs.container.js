// The Tabs JS module
export const Tabs = (el) => {
  // Tabs ui helper object
  const ui = {
    el,
    triggers: el.querySelectorAll('[data-tabs-trigger]'),
    targets: el.querySelectorAll('[data-tabs-target]')
  };

  // Hide all targets
  const hide = () => {
    let i = ui.targets.length;
    while (i--) {
      ui.targets[i].classList.add('hide');
    }
  };

  // Show specific target
  const show = (id) => {
    hide();
    let i = ui.triggers.length;
    while (i--) {
      ui.triggers[i].classList.remove('active');
    }

    ui.triggers[id].classList.add('active');
    ui.targets[parseInt(id, 10)].classList.remove('hide');
  };

  // Tabs's main init method
  const init = () => {
    show(el.dataset.default);

    // Setup responsive data attributes
    let i = ui.targets.length;
    while (i--) {
      ui.targets[i].dataset.tabsTriggerTitle = ui.triggers[i].innerText;
    }

    // Event listener
    ui.el.addEventListener('click', (e) => {
      const { target } = e;
      if (!target.dataset) { return false; }

      /* For desktop */
      if (target.dataset.tabsTrigger) {
        show(target.dataset.tabsTrigger);
        e.preventDefault();
      }

      /* For mobile */
      if (target.dataset.tabsTarget) {
        show(target.dataset.tabsTarget);
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
