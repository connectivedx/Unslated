const requireAll = (context) => context.keys().map(context);

// Import variables CSS
require('@vars/breakpoints.css');
require('@vars/colors.css');
require('@vars/custom-selectors.css');
require('@vars/fonts.css');
require('@vars/type.css');
require('@vars/zindex.css');

// Import root and richtext CSS
require('@atoms/Root/Root.css');
require('@atoms/RichText/RichText.css');

// Import all remaining elements CSS
requireAll(require.context('@elements/', true, /\.css$/));
