// The Accordion JS module
export const Accordion = (el) => {
  // Accordion's ui helper object
  const ui = {
    el,
    sections: el.querySelectorAll('.accordion__section'),
    trigger: el.querySelector('.expand__trigger'),
    target: el.querySelector('.expand__target')
  };

  // Accordion's main init point
  const init = () => {
    ui.el.addEventListener('click', (e) => {
      if (el.classList.contains('accordion--multi-false')) {
        Object.keys(ui.sections).map((i) => {
          if (e.target.parentNode === ui.sections[i]) { return false; }
          Utils.replaceClass(
            ui.sections[i],
            [
              'expand-state--open',
              'expand-state--closed'
            ]
          );

          return true;
        });
      }
    });
  };

  // Self init
  init();
};

export default Accordion;
