export const Accordion = (el) => {
  const ui = {
    el,
    sections: el.querySelectorAll('.accordion__section'),
    trigger: el.querySelector('.expand__trigger'),
    target: el.querySelector('.expand__target')
  };

  const init = () => {
    ui.el.addEventListener('click', (e) => {
      if (el.classList.contains('accordion--multi-false')) {
        Object.keys(ui.sections).map((i) => {

          if (e.target.parentNode === ui.sections[i]) { return; }
          Utils.replaceClass(
            ui.sections[i],
            [
              'expand-state--open',
              'expand-state--closed'
            ]
          );
        });
      }
    });
  };

  init();
};

export default Accordion;
