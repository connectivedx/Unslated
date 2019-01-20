export const Tabs = (el) => {
  const ui = {
    el,
    triggers: el.querySelectorAll('.tabs__trigger'),
    targets: el.querySelectorAll('.tabs__target'),
    defaultTab: el.dataset.default
  };

  const init = () => {
    ui.el.addEventListener('click', (e) => {
      const target = e;
      if (!target.classList.contains('tabs__trigger')) { return; }

      Object.keys(ui.triggers).map((index) => {
        const trigger = ui.triggers[index];

        Utils.replaceClass(trigger, ['tabs-state--closed', 'tabs-state--open']);

        if (target !== trigger) {
          Utils.replaceClass(trigger, ['tabs-state--open', 'tabs-state--closed']);
        }

        return true;
      });

      if (window.outerWidth < 768) {
        window.scrollTo({
          top: target.offsetTop,
          left: 0,
          behavior: 'smooth'
        });
      }
    });

    if (ui.defaultTab !== 'false') {
      ui.triggers[parseInt(ui.defaultTab, 10)].click();
    }
  };

  init();
};

export default Tabs;
