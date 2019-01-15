export const Form = (el) => {
  const ui = {
    el,
    fields: el.querySelectorAll('.field'),
    submit: el.querySelector('[type="submit"]')
  };

  const checkValidity = (field, native) => {
    if (native.required) {
      field.classList[(native.checkValidity()) ? 'add':'remove']('field__error');
    }
  };

  const bindValidation = (field, native, eventType) => {
    native.addEventListener(eventType, () => {
      checkValidity(field, native);
    });
  };

  const init = () => {
    Object.keys(ui.fields).map(i => {
      const field = ui.fields[i];
      const classes = field.classList;
      const native = field.querySelector('.field__native');

      if (classes.contains('radio') || classes.contains('checkbox')) {
        bindValidation(field, native, 'click');
      } else if (classes.contains('select')) {
        bindValidation(field, native, 'change');
      } else {
        bindValidation(field, native, 'keyup');
      }

      bindValidation(field, native, 'blur');
    });

    el.addEventListener('submit', () => {
      Object.keys(ui.fields).map(i => {
        const field = ui.fields[i];
        const native = field.querySelector('.field__native');
        checkValidity(field, native);
      });
    });
  }

  init();
};

export default Form;
