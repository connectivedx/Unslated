const requireAll = (context) => context.keys().map(context);

requireAll(require.context('@atoms/', true, /\.examples.jsx$/));
requireAll(require.context('@modifiers/', true, /\.examples.jsx$/));
requireAll(require.context('@molecules/', true, /\.examples.jsx$/));
requireAll(require.context('@organisms/', true, /\.examples.jsx$/));
