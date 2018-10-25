const requireAll = (context) => context.keys().map(context);

// Import variables CSS
requireAll(require.context('@vars/', true, /\.css$/));

// Import root and richtext CSS
require('@atoms/Root/Root.css');
require('@atoms/RichText/RichText.css');

// Import all remaining elements CSS
requireAll(require.context('@elements/', true, /\.css$/));
