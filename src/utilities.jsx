/*
  Utilities: reduces code bloat by opening up space for developers to sum up repeated code into reusable methods instead.

  All methods crafted here can be accessed from anywhere in the project by calling the "Utils" alias.
  Because utils has its own alias namespace, you do not need to ever import this file into your JS or JSX files.

  IMPORTANT NOTE: Never remove any methods marked "CORE:" as they are dependencies for the framework.
*/


/*
  Helper: Universal method to perform XHTTP requests
*/
const XHR = (url, options, callback) => {
  options = {} || options;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      if (typeof callback === 'function') {
        callback(xhttp);
      }
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
};

/*
  Helper: Universal method to perform XHTTP requests using a promisse
*/
const Fetch = (url, options) => new Promise((resolve) => {
  options = {} || options;
  XHR(url, options, (request) => {
    resolve(request.responseText);
  });
}).catch((err) => console.error(err)); // eslint-disable-line no-console

/*
  Helper: Universal method to validate native form fields
*/
const checkValidity = (field) => {
  const native = field.querySelector('.field__native');
  if (native.required) {
    if (native.checkValidity()) {
      field.classList.remove('field__error');
    } else {
      field.classList.add('field__error');
    }
  }
};

/*
  Helper: Quick method to capatalize the first character of a string of text
*/
const titleCapitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

/*
  Helper: Chookie get and set methods
*/
const getCookie = (cname) => {
  const name = [cname, '='].join('');
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
};

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = ['expires=', d.toUTCString()].join('');
  document.cookie = [cname, '=', cvalue, ';', expires, ';path=/'].join('');
};

const deleteCookie = (cname, path, domain) => {
  if (getCookie(cname)) {
    document.cookie = `${cname} = ${path ? `;path="${path}:"` : ''} ${domain ? `;domain="${domain}:"` : ''};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
};

/*
  Helper: Little method to help reuse a component examples instead of re-crafting the element across pages and templates.
*/
const getExample = (examples, id) => examples[0].examples[id].component;

/*
  Helper: Traverses up the dom to a given parent element
*/
const parents = (obj, parent) => {
  let el = obj;
  if (parent.indexOf('.') === 0) {
    while (el.parentNode) {
      el = el.parentNode;
      const classNAME = el.className;
      if (classNAME && typeof classNAME.match === 'function') {
        const classes = classNAME.split(' ');
        let j = classes.length;
        const hunted = parent.toLowerCase().replace('.', '');
        while (j--) {
          if (classes[j] === hunted) {
            return el;
          }
        }
      }
    }
  } else if (parent.indexOf('#') === 0) {
    while (el.parentNode) {
      el = el.parentNode;
      const ID = el.id;
      if (ID && typeof ID.match === 'function') {
        if (ID.match(parent.toLowerCase().replace('#', ''))) {
          return el;
        }
      }
    }
  } else {
    while (el.parentNode) {
      el = el.parentNode;
      if (el.tagName) {
        if (typeof parent !== 'undefined') {
          if (el.tagName.toLowerCase() === parent.toLowerCase()) {
            return el;
          }
        }
      }
    }
  }

  return null;
};

/*
  Helper: Used to toggle between classes on elements
  Note: Use this over native classList.toggleClass due to no IE support
*/
const toggleClass = (element, classString) => {
  if (!element) {
    console.log('First param of toggleClass needs to be the element.'); // eslint-disable-line
  }

  if (!classString || typeof classString === 'object') {
    console.log('Second param of toggleClass needs to be a string.'); // eslint-disable-line
  }

  if (typeof classString === 'object') {
    console.log('Perhaps you want Utils.replaceClass() instead?'); // eslint-disable-line
  }

  if (element.classList.contains(classString)) {
    element.classList.remove(classString);
  } else {
    element.classList.add(classString);
  }
};

/*
  Helper: Used to replace a class
  Note: Use this over native classList.replace due to no IE support
*/
const replaceClass = (element, classArray) => {
  if (!element) {
    console.log('First param of toggleClass needs to be the element.'); // eslint-disable-line
  }

  if (!classArray || !Array.isArray(classArray)) {
    console.log('Second param of toggleClass needs to be an array of strings (from, to).'); // eslint-disable-line
  }

  if (typeof classArray === 'string') {
    console.log('Perhaps you want Utils.toggleClass() instead?'); // eslint-disable-line
  }

  element.classList.remove(classArray[0]);
  element.classList.add(classArray[1]);
};

/*
  Helper: Used to serialize a form element's fields into JSON object. Useful for XHR.
*/
const serialize = (elm, type) => {
  const jsonToQueryString = (json) => (
    Object.keys(json).map((key) => [encodeURIComponent(key), '=', encodeURIComponent(json[key])].join('')).join('&')
  );
  if (typeof type === 'undefined') { type = 'json'; }

  const obj = {};
  const elements = elm.querySelectorAll('input, select, textarea');
  for (let i = 0; i < elements.length; ++i) {
    const element = elements[i];
    const { name } = element;
    const { value } = element;
    const { checked } = element;

    if (name) {
      if (element.type === 'radio' || element.type === 'checkbox') {
        obj[name] = checked;
      } else {
        obj[name] = value;
      }
    }
  }

  if (type === 'urlencode') {
    return jsonToQueryString(obj);
  }

  if (type === 'json') {
    return JSON.stringify(obj);
  }

  return false;
};


/*
  Helper: Like array .reverse() method, this will reverse an entire object.
*/
const objectReverse = (object) => {
  const newObject = {};
  const keys = [];

  Object.keys(object).map((key) => keys.push(key));

  for (let i = keys.length - 1; i >= 0; i--) {
    const value = object[keys[i]];
    newObject[keys[i]] = value;
  }

  return newObject;
};

/*
  CORE: Creating a nice className from an array of unknown values
*/
const createClassStack = (classList) => (
  classList
    .map((className) => {
      if (Array.isArray(className)) {
        return createClassStack(className);
      }

      return className;
    })
    .filter((a) => a)
    .join(' ')
);

/*
  CORE: Installing an atomic element's Container.js class based on elements found on page
*/
const initComponent = (name, selector, Component, callback) => {
  const createComponent = (el) => new Component(el);

  // init maching elements
  const elms = document.querySelectorAll(selector.toLowerCase().toString());
  Object.keys(elms).map((index) => createComponent(elms[index]));

  if (typeof callback === 'function') {
    callback();
  }
};

module.exports = {
  parents,
  getExample,
  XHR,
  Fetch,
  getCookie,
  setCookie,
  deleteCookie,
  titleCapitalize,
  checkValidity,
  objectReverse,
  createClassStack,
  initComponent,
  toggleClass,
  replaceClass,
  serialize
};
