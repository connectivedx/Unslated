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

  Object.keys(elements).map((key, index) => {
    collection.push({
      url: ['examples', key.split('.').slice(0, -1).slice(0, -1).pop()].join(''),
      atomicLevel: key.replace('./', '').split('/')[0],
      name: key.split('/').slice(-1)[0].split('.')[0],
      examples: [...elements[key].default],
      docs: (elements[key].default[0].docs) ? elements[key].default[0].docs[0] : undefined
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
