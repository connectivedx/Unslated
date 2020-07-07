// The Button JS module
export const Button = (el) => {
  // Button's ui helper object
  const ui = {
    el
  };

  const ariaState = {};

  const setAriaState = () => {
    ariaState.pressed = !ariaState.pressed;
    ui.el.setAttribute('aria-pressed', ariaState.pressed);
    ui.el.classList[ariaState.pressed ? 'add' : 'remove']('button--pressed');
  };

  // Buttons's main init method
  const init = () => {
    if (ui.el.hasAttribute('aria-pressed')) {
      ariaState.pressed = ui.el.getAttribute('aria-pressed');
    }

    // check aria-pressed state (true, false, mixed, undefined)
    if (ui.el.getAttribute('aria-pressed') === 'true' || ui.el.getAttribute('aria-pressed') === 'false') {
      ui.el.addEventListener('click', () => {
        setAriaState();
      });
      ui.el.addEventListener('keydown', (e) => {
        if (e.which === 13 || e.which === 32) {
          e.preventDefault();
          setAriaState();
        }
      });
    }
  };

  // Self init
  init();
};

export default Button;
