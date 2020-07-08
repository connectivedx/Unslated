/*
  Here lives all logic for accessibility logic.
*/
export const Accessibility = (el) => {
  // Object to house all common selected elements within a components context
  const ui = {
    el
  };
  const events = ['click', 'mouseover', 'mouseout', 'keyup', 'keydown', 'focused', 'blur', 'input'];
  const init = () => {
    Object.keys(events).map((i) => {
      ui.el.addEventListener(events[i], (event) => {
        const { target } = event;
        const { type } = event;
        // Logic for aria pressed
        if (target.ariaPressed && type === 'click') {
          target.ariaPressed = !(target.ariaPressed === 'true');
        }
      });
      return false;
    });
  };
  // Self init point
  init();
};
export default Accessibility;
