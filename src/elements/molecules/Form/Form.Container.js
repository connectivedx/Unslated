export const Form = (el) => {
  const ui = {
    el,
    fields: el.querySelectorAll('.field'),
    submit: el.querySelector('[type="submit"]')
  };

  const checkValidity = (field, native) => {
    if (native.required) {
      if (native.checkValidity()) {
        field.classList.remove('field__error');
      } else {
        field.classList.add('field__error');
      }
    }
  };
  const bindValidationEvent = (field, eventType) => {
    const native = field.querySelector('.field__native');

    native.addEventListener(eventType, () => {
      checkValidity(field, native);
    });
  };

  const init = () => {
    Object.keys(ui.fields).map(index => {
      const field = ui.fields[index];

      if (field.classList.contains('radio') || field.classList.contains('checkbox')) {
        bindValidationEvent(field, 'click');
        bindValidationEvent(field, 'blur');
      } else if (field.classList.contains('select')) {
        bindValidationEvent(field, 'change');
        bindValidationEvent(field, 'blur');
      } else {
        // all other fields are textual
        bindValidationEvent(field, 'keyup');
        bindValidationEvent(field, 'blur');
      }
    });

    ui.submit.addEventListener('click', () => {
      Object.keys(ui.fields).map(index => {
        const field = ui.fields[index];
        const native = field.querySelector('.field__native');
        checkValidity(field, native);
      });
    });
  }

  init();
};

export default Form;
