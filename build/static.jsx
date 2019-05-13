import fs from 'fs';
import path from 'path';

const requireAll = (context) => context.keys().map(context);
const components = requireAll(require.context('@elements/', true, /^(?!.*\.test\.jsx$).*\.example.jsx$/));

global.components = [];

Object.keys(components).map((i) => {
  const { examples } = components[i].default[0];
  Object.keys(examples).map((j) => {
    const { component } = examples[j];
    const { name } = component.type;
    global.components.push({
      source: component,
      staticPath: (examples[j].staticPath) ? examples[j].staticPath : false
    });
  });
  // examples.default[0].examples[0].component.props
});

