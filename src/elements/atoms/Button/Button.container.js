// The Button JS module
export const Button = (el) => {
  // Button's ui helper object
  const ui = {
    el
  };

  const ariaState = {};

  const setAriaState = () => {
    ariaState.pressed = !ariaState.pressed;
    ui.el.classList[ariaState.pressed ? 'add' : 'remove']('button--pressed');
    ui.el.ariaPressed = ariaState.pressed;
  };

  // Buttons's main init method
  const init = () => {
    if (ui.el.ariaPressed) {
      ariaState.pressed = (ui.el.ariaPressed === 'true');
    }

    // check aria-pressed state (true, false, mixed, undefined)
    if (['true', 'false'].indexOf(ui.el.ariaPressed) !== -1) {
      ui.el.addEventListener('click', () => setAriaState());
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
