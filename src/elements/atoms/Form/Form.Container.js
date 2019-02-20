// Form component client side namespace
export const Form = (el) => {
  // UI obect houses common selected elements within component
  const ui = {
    el,
    fields: el.querySelectorAll('.field')
  };

  // Form component client side main init point
  const init = () => {
    // With this attribute we overload native browser validation messaging for our own tooltips
    el.setAttribute('novalidate', 'novalidate');

    // Hook into native forms submit event to check for field error and or perform fetch instead of post/get
    el.addEventListener('submit', (e) => {
      Object.keys(ui.fields).map((i) => ui.fields[i].validate());

      if (el.querySelector('.field__error')) {
        e.preventDefault();
      }

      // xaction xhr method
      if (el.dataset.xhr) {
        // prevent submit event default
        e.preventDefault();

        // setup new fetch request
        const xhttp = new XMLHttpRequest();

        // on request's state change
        xhttp.onreadystatechange = () => {
          if (xhttp.status === 200) {
            console.log(xhttp.responseText); // eslint-disable-line
          }
        };

        // open request with options
        xhttp.open(
          el.method, // post or get method
          [
            el.dataset.xhr, // xhr end point
            Utils.serialize(el, 'urlencode') // serialize form fields into post data
          ].join('?'), // join end point and post data with ?
          true
        );

        // send request off into the wild
        xhttp.send();
      }
    });
  };

  // Self init point
  init();
};

export default Form;
