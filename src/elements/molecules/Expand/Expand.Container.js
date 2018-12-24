export const Expand = (el) => {
  const ui = {
    trigger: el.querySelector('.expand__trigger'),
    target: el.querySelector('.expand__target')
  };


  const init = () => {
    ui.trigger.addEventListener('click', () => {
      if (el.classList.contains('expand-state--open')) {
        el.classList.remove('expand-state--open');
        el.classList.add('expand-state--closed');
      } else {
        el.classList.remove('expand-state--closed');
        el.classList.add('expand-state--open');
      }
    });
  };

  init();
};

export default Expand;
