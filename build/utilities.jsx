/*
  Utilities: reduces code bloat by opening up space for developers to sum up repeated code into reusable methods instead.
  
  All methods crafted here can be accessed from anywhere in the project by calling the "Utils" alias.
  Because utils has its own alias namespace, you do not need to ever import this file into your JS or JSX files.

  IMPORTANT NOTE: Never remove any methods marked "CORE:" as they are dependencies for the framework.
*/

/*
  Helper: Traverses up the dom to a given parent element
*/
const parents = (obj, parent) => {
  let el = obj;
  if(parent.indexOf('.') === 0){
    while (el.parentNode) {
      el = el.parentNode;
      const classNAME = el.className;
      if(classNAME && typeof classNAME.match == 'function'){
        const classes = classNAME.split(" ");
        let j = classes.length;
        let hunted = parent.toLowerCase().replace('.','');
        while(j--){
          if(classes[j] == hunted)
            return el;
        }
      }
    }
  }else if(parent.indexOf('#') === 0){
    while (el.parentNode) {
      el = el.parentNode;
      const ID = el.id;
      if(ID && typeof ID.match == 'function'){
        if (ID.match(parent.toLowerCase().replace('#', '')))
          return el;
      }
    }
  }else{
    while (el.parentNode) {
      el = el.parentNode;
      if(el.tagName){
        if(typeof parent != 'undefined'){
          if (el.tagName.toLowerCase() === parent.toLowerCase())
            return el;
        }
      }
    }
  }

  return null;
}

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
  parents,
  createClassStack,
  initComponent
};
