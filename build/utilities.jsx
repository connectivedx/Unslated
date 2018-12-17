/*
  Utilities: reduces code bloat by opening up space for developers to sum up repeated code into reusable methods instead.
  
  All methods crafted here can be accessed from anywhere in the project by calling the "Utils" alias.
  Because utils has its own alias namespace, you do not need to ever import this file into your JS or JSX files.

  IMPORTANT NOTE: Never remove any methods marked "CORE:" as they are dependencies for the framework.
*/


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
const initComponent = (name, selector, component, ...args) => {
  const createComponent = (el, ...args) => new component(el, ...args);

  // init maching elements
  const elms = document.querySelectorAll(selector.toLowerCase().toString());
  Object.keys(elms).map(index => {
    createComponent(elms[index], ...args);
  });
};


module.exports = {
  createClassStack,
  initComponent
};
