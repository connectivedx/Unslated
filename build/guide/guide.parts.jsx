/*
  This files used to hoist up all guide needed parts into a common names space for the guide partials.
  The goal of this file is to help reduce the overall size of the bundled guide as projects grow.
*/

const readDirectory = (context) => {
  const collection = [];
  context.keys().forEach((key) => {
    collection[key] = context(key);
    return true;
  });

  return collection;
};

const getJSXDocs = (name) => {
  const allJSXDocs = require.context(
    '!!../configs/webpack/webpack.jsxdocgen.loader!../../src/elements/',
    true,
    /^((?!test|example).)*jsx$/
  );
  const keys = allJSXDocs.keys();
  let i = keys.length;
  while (i--) {
    if (keys[i].indexOf(name) !== -1) {
      return allJSXDocs(keys[i]); // eslint-disable-line
    }
  }

  return false;
};

const getJSDocs = (name) => {
  const allJSDocs = require.context(
    '!!../configs/webpack/webpack.jsdocgen.loader?htmlDescription!../../src/elements/',
    true,
    /^.*\.(js)$/
  );

  const keys = allJSDocs.keys();
  let i = keys.length;
  while (i--) {
    if (keys[i].indexOf(name) !== -1) {
      return allJSDocs(keys[i]);
    }
  }
  return false;
};

const getElements = (element = false) => {
  const allElements = readDirectory(require.context(
    '@elements/',
    true,
    /^((?!test|example).)*jsx$/
  ));

  let elm;

  Object.keys(allElements).map((key) => {
    if (key.indexOf(element) === -1) { return false; }
    elm = allElements[key];
    return false;
  });

  if (!elm) { return false; }
  return elm;
};

const getExamples = () => {
  const allExamples = readDirectory(require.context('@elements/', true, /\.example.jsx$/));
  const collection = {};

  Object.keys(allExamples).map((key) => {
    const path = `../../src/elements${key.split('.').slice(0, -1).slice(0, -1).pop()}.jsx`;

    // you shall not pass!... without a path.
    if (!path) { return false; }
    const elementName = key.split('/').slice(-1)[0].split('.')[0];

    collection[elementName] = {
      url: `examples${key.split('.').slice(0, -1).slice(0, -1).pop()}`,
      name: elementName,
      atomic: key.replace('./', '').split('/')[0],
      jsDocs: getJSDocs(elementName),
      jsxDocs: getJSXDocs(elementName),
      element: getElements(elementName),
      examples: [...allExamples[key].default][0].examples
    };
    return false;
  });

  return collection;
};

const getPages = () => {
  const allPages = readDirectory(require.context('@pages/', true, /\.jsx$/));
  const collection = [];

  Object.keys(allPages).map((key) => {
    collection[key.replace(/\.\/(.*?)\.jsx/g, '$1')] = allPages[key].default;
    return false;
  }).filter((n) => n);

  return collection;
};

const getTools = () => {
  const allTools = readDirectory(require.context('@tools', true, /\.jsx$/));
  const collection = {};

  Object.keys(allTools).map((key) => {
    collection[key.replace(/\.\/(.*?)\.jsx/g, '$1')] = allTools[key].default;
    return false;
  }).filter((n) => n);

  return collection;
};

global.guide = {
  pages: getPages(),
  tools: getTools(),
  examples: getExamples()
};
