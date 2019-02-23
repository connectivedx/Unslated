/** Accordion component client side namespace */
export const Accordion = (el) => {
  /** UI obect houses common selected elements within component */
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

  init();
};

export default Accordion;
