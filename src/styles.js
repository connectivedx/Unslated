const requireAll = (context) => context.keys().map(context);

// Import variables CSS
require('@vars/index.css');

// Import root and richtext CSS
require('@atoms/Root/Root.css');
require('@atoms/RichText/RichText.css');

// Import all remaining elements CSS
requireAll(require.context('@elements/', true, /\.css$/));
