/*
  Here lives all logic for accessibility aria attributes and more.
  We register a pre-defined list of event listners to the document body, and ask each event to qualify both:
  - Element has targeted aria attribute
  - Event type is equal to one which we want to do said logic under
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
        const { type } = event;
        const { target } = event;

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
