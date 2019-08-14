const requireAll = (context) => context.keys().map(context);
const components = requireAll(require.context('@elements/', true, /^(?!.*\.test\.jsx$).*\.example.jsx$/));

global.components = [];

Object.keys(components).map((i) => {
  const { examples } = components[i].default[0];
  Object.keys(examples).map((j) => {
    const example = examples[j];
    const { component } = example;
    const { staticPath } = example;
    const { name } = component.type;

    if (staticPath) {
      global.components.push({
        name,
        source: component,
        staticPath
      });
    }
    return false;
  });

  return false;
});
