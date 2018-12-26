export const Accordion = (el) => {
  const ui = {
    el,
    sections: el.querySelectorAll('.accordion__section'),
    trigger: el.querySelector('.expand__trigger'),
    target: el.querySelector('.expand__target')
  };


  const init = () => {
    ui.el.addEventListener('click', (e) => {
      console.log('hitting');
      if (el.classList.contains('accordion--multi-false')) {
        const target = e.target;
        Object.keys(ui.sections).map(index => {
          if (target.parentNode === ui.sections[index]) { return; }
          ui.sections[index].classList.add('expand-state--closed');
          ui.sections[index].classList.remove('expand-state--open');
        });
      }
    });
  };

  init();
};

export default Accordion;
