/*
  Utilities: reduces code bloat by opening up space for developers to sum up repeated code into reusable methods instead.

  All methods crafted here can be accessed from anywhere in the project by calling the "Utils" alias.
  Because utils has its own alias namespace, you do not need to ever import this file into your JS or JSX files.

  IMPORTANT NOTE: Never remove any methods marked "CORE:" as they are dependencies for the framework.
*/

/*
  Helper: Universal method to perform XHTTP requests

  Eg: Simple XHR GET with no options
  Utils.XHR('path/to/endpoint', {}, (response) => { });

  Eg: XHR GET with request for response being returned in JSON format
  Utils.XHR('path/to/endpoint', { type: 'POST', contentType: 'application/json' }, (jsonResponse) => { });

  Eg: XHR POST with body data and response
  Utils.XHR('path/to/endpoint', { type: 'POST', body: { one: 'data', two: 'data' } }, (response) => { });

  NOTE: the data returned is the full response object, in most cases `response.responseText` is the data you want.
*/
const XHR = (url, options, callback) => {
  options = options || {
    type: 'GET',
    body: {},
    contentType: ''
  };

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      if (typeof callback === 'function') {
        callback((options.contentType === 'application/json') ? JSON.parse(xhttp) : xhttp);
      }
    }
  };

  xhttp.open(
    (options.type) ? options.type : 'GET',
    url,
    true
  );

  if (options.contentType !== '') {
    xhttp.setRequestHeader(
      'Content-Type',
      options.contentType
    );
  }

  xhttp.send((options.type !== 'get') ? options.body : '');
};

/*
  Helper: Universal method to perform XHTTP requests using a promisse

  Eg: Basic Fetch request with no options
  Utils.Fetch('path/to/endpoint').then((response) => { });

  Eg: Fetch request with options for request type and header options.
  Utils.Fetch('path/to/endpoint', { type: 'get', contentType: 'application/json' }).then((response) => { });
*/
const Fetch = (url, options = {}) => new Promise((resolve) => {
  options = {} || options;
  XHR(url, options, (request) => {
    resolve(request);
  });
}).catch((err) => console.error(err)); // eslint-disable-line no-console

/*
  Helper: Universal method to validate native form fields

  Eg: Uses browser native checkValidity to deterin if field is valid (depends on a pattern attribute on field__native)
  Utils.checkValidity(formField);
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
  Helper: Universal method to clear all form's field errors

  Eg: Clears all field errors
  Utils.clearFormErros(formElement);

  Eg: Clears all field errors, except for passed ids.
  Utils.clearFormErros(formElement, ['inputOneId', 'inputSixId']);
*/
const clearFormErrors = (form, excludes = []) => {
  const errors = form.querySelectorAll('.field__error');
  Object.keys(errors).map((i) => {
    const error = errors[i];
    const field = error.querySelector('.field__native');
    if (excludes.indexOf(field.id) !== -1) { return false; }
    error.classList.remove('field__error');

    return false;
  });
};

/*
  Helper: Universal method to clear all form's fields

  Eg: Clears all inputs
  Utils.clearFormInput(formElement);

  Eg: Clears all inputs, except for passed ids.
  Utils.clearFormInput(formElement, ['inputOneId', 'inputSixId']);
*/
const clearFormInputs = (form, excludes = []) => {
  const inputs = form.querySelectorAll('.field__native');
  Object.keys(inputs).map((i) => {
    const input = inputs[i];
    if (excludes.indexOf(input.id) !== -1) { return false; }
    if (input.type && input.tagName.toLowerCase() !== 'select') {
      if (input.type === 'checkbox' || input.type === 'radio') {
        inputs[i].checked = false;
      } else {
        inputs[i].value = '';
      }
    }

    return false;
  });
};

/*
  Helper: Quick method to capatalize the first character of a string of text

  Utils.titleCapitalize('he walked in circles.'); // becomes He walked in circles.
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

  Utils.parents(element, '.parent-selector'); // will keep looking for a parent with specified class
  Utils.parents(element, '#parent-selector'); // will keep looking for a parent with specified id
  Utils.parents(element, '[data-parent]');   // will keep looking for a parent with specified attribute
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

  Utils.toggleClass(element, '.active');
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

  Utils.replaceClass(element, ['.success', '.fail']); // replaces .success with .fail
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

  Utils.serialize(form); // Loops over a given form's fields and creates a key / value object based on input's name and value attributes.
  Utils.serialize(form, 'json'); // Same as first example, but data returned is JSON.parsed() for you.
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

  const object = { a: 'data', b: 'data', c: 'data' };
  Utils.objectReverse(object); // becomes { c: 'data', d: 'data', a: 'data' }
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
  Helper: Quick method to generate lorium ipsum dummy content to a give HTML block.
  This helps reduce the guide bundle size by summing large ipsum usage down to a method.

  Utils.ipsum('word', 12); // Will create a lorem ipsum string that contains 12 words.
  Utils.ipsum('sentence', 12); // Will create a lorem ipsum string that contains 12 sentences.
  Utils.ipsum('paragraph', 12); // Will create a lorem ipsum string that contains 12 pargaraphs.
*/
const ipsum = (type, amount) => {
  const settings = {
    wordsInSentence: {
      max: 16,
      min: 4
    },
    sentencesInParagraph: {
      max: 8,
      min: 4
    }
  };

  const vocabulary = [
    'ad', 'adipisicing', 'aliqua', 'aliquip', 'amet', 'anim', 'aute',
    'cillum', 'commodo', 'consectetur', 'consequat', 'culpa', 'cupidatat',
    'deserunt', 'do', 'dolor', 'dolore', 'duis',
    'ea', 'eiusmod', 'elit', 'enim', 'esse', 'est', 'et', 'eu', 'ex', 'excepteur', 'exercitation',
    'fugiat',
    'id', 'in', 'incididunt', 'ipsum', 'irure',
    'labore', 'laboris', 'laborum', 'Lorem',
    'magna', 'minim', 'mollit', 'nisi',
    'non', 'nostrud', 'nulla',
    'occaecat', 'officia',
    'pariatur', 'proident',
    'qui', 'quis',
    'reprehenderit',
    'sint', 'sit', 'sunt',
    'tempor',
    'ullamco', 'ut',
    'velit', 'veniam', 'voluptate'
  ];

  const randomRange = (min, max) => Math.floor((Math.random() * (max - min)) + min);

  // Build a string of random ipsum words
  const generateWords = (count) => {
    let words = '';
    for (let i = 0; i < count; i++) {
      const rand = randomRange(1, vocabulary.length);
      words += ` ${vocabulary[rand]}`;
    }
    return titleCapitalize(words.trim());
  };

  // Build a target amount of sentences
  const generateSentences = () => {
    let sentences = '';
    for (let i = 0; i < amount; i++) {
      sentences += ` ${generateWords(randomRange(settings.wordsInSentence.min, settings.wordsInSentence.max))}.`;
    }

    return sentences;
  };

  // Build a target amount of paragraphs
  const generateParagraphs = () => {
    let paragraphs = '';
    for (let i = 0; i < amount; i++) {
      paragraphs += ` ${generateSentences(randomRange(settings.sentencesInParagraph.min, settings.sentencesInParagraph.max))}`;
    }

    return paragraphs;
  };

  if (['word', 'words'].indexOf(type) !== -1) {
    return generateWords(amount);
  }

  if (['sentence', 'sentences'].indexOf(type) !== -1) {
    return generateSentences();
  }

  if (['paragraph', 'pargaraphs'].indexOf(type) !== -1) {
    return generateParagraphs();
  }

  return false;
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

  Utils.initComponent('ComponentName', '.component-class', ComponentImport);
*/
const initComponent = (name, selector, Component, callback) => {
  const createComponent = (el) => Component(el);

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
  ipsum,
  getCookie,
  setCookie,
  deleteCookie,
  titleCapitalize,
  checkValidity,
  clearFormErrors,
  clearFormInputs,
  objectReverse,
  createClassStack,
  initComponent,
  toggleClass,
  replaceClass,
  serialize
};
