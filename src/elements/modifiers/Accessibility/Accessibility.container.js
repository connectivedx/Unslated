/*
  Here is where all accessibility aria attributes logic and console warings live.
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
  const rules = [
    {
      // Test for buttons who have no inner text and missing aria-label
      test: '.button',
      rule: (element) => {
        const isValid = (Object.keys(element.childNodes).map((i) => {
          if (element.childNodes[i].nodeType === 3) {
            return true;
          }
          return false;
        }).indexOf(true) !== -1);

        if (!isValid) {
          if (element.hasAttribute('aria-label')) {
            return true;
          }
        }

        return isValid;
      },
      error: (element) => `Missing "aria-label" prop (${element.parentNode.innerHTML}):\r\nIf you do not intend to give immediate inner text to this Button, please give it an aria-label attribute instead which descibes the elements intent to screen readers.`
    },
    // Test for foreign button tags who have missing aria-label
    {
      test: '[role="button"]',
      rule: (element) => (element.ariaLabel),
      error: (element) => `Missing "aria-label" prop (${element.parentNode.innerHTML}):\r\nWhen transforming a Button element's tagName to anything other than <button>, you need to supply an "arial-label" attribute and describe the elements intent to screen readers.`
    },
    // Test for foreign link tags who have missing aria-label
    {
      test: '[role="link"]',
      rule: (element) => (element.ariaLabel),
      error: (element) => `Missing "aria-label" prop (${element.parentNode.innerHTML}):\r\nWhen transforming a Link element's tagName to anything other than <a>, you need to supply an "arial-label" attribute and describe the elements intent to screen readers.`
    },
    {
      test: '.button',
      rule: (element) => {
        const isValidIcon = (Object.keys(element.childNodes).map((i) => {
          if (element.childNodes[i].nodeType === 3) {
            return true;
          }
          return false;
        }).indexOf(true) !== -1);

        if (!isValidIcon) {
          if (element.childNodes[0].tagName === 'svg') {
            if (!element.childNodes[0].ariaHidden) {
              return false;
            }
            return true;
          }
        }

        return isValidIcon;
      },
      error: (element) => `Missing "aria-hidden" prop (${element.children.innerHTML}):\r\nWhen an Icon is the only content of a button, the Icon needs to be hidden from screen readers. You need to supply an "arial-hidden" attribute.`
    }
  ];

  const init = () => {
    // Setup event listeners
    Object.keys(events).map((i) => {
      ui.el.addEventListener(events[i], (event) => {
        const { type } = event;
        const { target } = event;

        // Logic for aria pressed
        if (target.ariaPressed && ['click', 'keyup'].indexOf(type) !== -1) {
          if (type === 'click') {
            target.ariaPressed = !(target.ariaPressed === 'true');
          } else if (event.which === 13 || event.which === 32) {
            if (target.tagName !== 'BUTTON') {
              event.preventDefault();
              target.ariaPressed = !(target.ariaPressed === 'true');
            } else {
              target.ariaPressed = !(target.ariaPressed === 'true');
            }
          }
        }
      });

      return false;
    });

    // Validate DOM for possible accessibility issues
    Object.keys(rules).map((i) => {
      const DOM = document.querySelectorAll(rules[i].test);
      Object.keys(DOM).map((j) => {
        if (!rules[i].rule(DOM[j])) {
          console.error(`WCAG Warning: ${rules[i].error(DOM[j])}`); // eslint-disable-line
        }
        return false;
      });

      return false;
    });
  };

  // Self init point
  init();
};

export default Accessibility;
