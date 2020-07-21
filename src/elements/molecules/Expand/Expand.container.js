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
        ui.trigger.ariaExpanded = false;
        ui.target.ariaHidden = true;
        el.querySelector('.icon use').setAttribute('xlink:href', '#icon-plus');
      } else {
        el.classList.remove('expand-state--closed');
        el.classList.add('expand-state--open');
        ui.trigger.ariaExpanded = true;
        ui.target.ariaHidden = false;
        el.querySelector('.icon use').setAttribute('xlink:href', '#icon-minus');
      }
    });
  };

  // Self init
  init();
};

export default Expand;
