// The Form JS module
export const Form = (el) => {
  // Form's ui helper object
  const ui = {
    el,
    fields: el.querySelectorAll('.field')
  };

  // Main init point
  const init = () => {
    // overload native validation messaging
    el.setAttribute('novalidate', 'novalidate');

    // Form submit event listener
    el.addEventListener('submit', (e) => {
      Object.keys(ui.fields).map((i) => ui.fields[i].validate());

      if (el.querySelector('.field__error')) {
        e.preventDefault();
        return false;
      }

      // XHR action overload condition
      if (el.dataset.xhr) {
        e.preventDefault();

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.status === 200) {
            console.log(xhttp.responseText); // eslint-disable-line
          }
        };

        xhttp.open(
          el.method,
          `${el.dataset.xhr}?${Utils.serialize(el, 'urlencode')}`,
          true
        );

        xhttp.send();
      }

      return true;
    });
  };

  // Self init
  init();
};

export default Form;
