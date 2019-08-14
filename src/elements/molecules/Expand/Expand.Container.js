// The Expand JS module
export const Expand = (el) => {
  // Expand's ui helper object
  const ui = {
    trigger: el.querySelector('.expand__trigger'),
    target: el.querySelector('.expand__target')
  };

  // Expands's main init method
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

  // Self init
  init();
};

export default Expand;
