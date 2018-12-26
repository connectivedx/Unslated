export const Tabs = (el) => {
  const ui = {
    el,
    triggers: el.querySelectorAll('.tabs__trigger'),
    targets: el.querySelectorAll('.tabs__target'),
    defaultTab: el.dataset.default
  };


  const init = () => {
    ui.el.addEventListener('click', (e) => {
      const target = e.target;

      Object.keys(ui.triggers).map(index => {

        ui.triggers[index].classList.add('tabs-state--open');
        ui.triggers[index].classList.remove('tabs-state--closed');

        if (target === ui.triggers[index]) { return; }

        ui.triggers[index].classList.add('tabs-state--closed');
        ui.triggers[index].classList.remove('tabs-state--open');
      });

      if (window.outerWidth < 768) {
        console.log(target.offsetTop);
        window.scrollTo({
          top: target.offsetTop,
          left: 0,
          behavior: 'smooth'
        });
      }
    });

    if (ui.defaultTab !== false) {
      ui.triggers[parseInt(ui.defaultTab, 10)].click();
    }
  };

  init();
};

export default Tabs;
