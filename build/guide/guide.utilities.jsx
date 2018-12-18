/*
  !!!!!!!!!!THIS IS ONLY FOR GUIDE PARTIALS!!!!!!!!!!
  !!!!!!!!!DO NO USE METHODS HERE IN ASSETS.JS!!!!!!!
 
  IMPORTANT NOTE: Never remove any methods marked "CORE:" as they are dependencies for the framework.
*/

/*
  CORE: Recursive gathering of folders from a directory
*/

const readDirectory = (context) => {
  const collection = [];
  context.keys().forEach(key => collection[key] = context(key));

  return collection;
};

/*
  CORE: Gathering pages
*/

const getPages = () => {
  const pages = readDirectory(require.context('../../src/pages/', true, /\.jsx$/));

  if (pages) {
    return pages;
  }

  return;
};


/*
  CORE: Gathering examples from elements directory
*/

const getExamples = () => {
  const elements = readDirectory(require.context('../../src/elements/', true, /\.example.jsx$/));
  const collection = [];
  const modifiersDescription = 'Modifiers are CSS based design patterns that are both simple, and reusable across the project.';
  Object.keys(elements).map((key, index) => {
    const url = ['examples', key.split('.').slice(0, -1).slice(0, -1).pop()].join('');
    const atomicLevel = key.replace('./', '').split('/')[0];
    const name = key.split('/').slice(-1)[0].split('.')[0];
    const examples = [...elements[key].default];
    
    const autoDocs = elements[key].default[0].docs;
    const docs = (autoDocs) ? autoDocs[0] : {
      displayName: name,
      description: (atomicLevel === 'modifiers') ? modifiersDescription : atomicLevel
    };

    collection.push({
      url,
      atomicLevel,
      name,
      examples,
      docs
    });
  });

  if (collection) {
    return collection;
  }

  return;
};


module.exports = {
  getPages,
  getExamples
};
