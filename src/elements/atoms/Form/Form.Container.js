export const Form = (el) => {
  const ui = {
    el,
    fields: el.querySelectorAll('.field')
  };

  const init = () => {
    // With this attribute we overload native browser validation messaging for our own tooltips
    el.setAttribute('novalidate', 'novalidate');

    el.addEventListener('submit', (e) => {
      Object.keys(ui.fields).map((i) => ui.fields[i].validate());

      if (el.querySelector('.field__error')) {
        e.preventDefault();
      }

      // xaction xhr method
      if (el.dataset.xhr) {
        e.preventDefault(); // prevent default submit
        const xhttp = new XMLHttpRequest(); // setup new XHR
        xhttp.onreadystatechange = () => {
          if (xhttp.status === 200) {
            console.log(xhttp.responseText); // eslint-disable-line
          }
        };
        xhttp.open(
          el.method, // post or get method
          [
            el.dataset.xhr, // xhr end point
            Utils.serialize(el, 'urlencode') // serialize form fields into post data
          ].join('?'), // join end point and post data with ?
          true
        );

        xhttp.send(); // fire off request
      }
    });
  };

  init();
};

export default Form;
