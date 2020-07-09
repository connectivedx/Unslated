/*
  Main entry file to export static markup from React JSX componentry examples.
*/

const requireAll = (context) => context.keys().map(context);
const components = requireAll(require.context('@elements/', true, /^(?!.*\.test\.jsx$).*\.example.jsx$/));

global.components = [];

Object.keys(components).map((i) => {
  const { examples } = components[i].default[0];
  Object.keys(examples).map((j) => {
    const example = examples[j];
    const { component } = example;
    const { exports } = example;
    const { name } = component.type;

    if (exports) {
      global.components.push({
        name,
        source: component,
        exports
      });
    }
    return false;
  });

  return false;
});
