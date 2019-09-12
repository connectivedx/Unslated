const requireAll = (context) => context.keys().map(context);

// Import variables CSS
require('reset-css');
require('@vars/breakpoints.css');
require('@vars/colors.css');
require('@vars/custom-selectors.css');
require('@vars/mixins.css');
require('@vars/fonts.css');
require('@vars/type.css');
require('@vars/zindex.css');

// Import root and richtext CSS
require('@atoms/Root/Root.css');
require('@atoms/RichText/RichText.css');

// Import all CSS and Image files
requireAll(require.context(
  '@elements/',
  true,
  /^(?!.*Root).*\/(?!.*RichText).*\/(?!.*font-face).*\.(css|svg|jpg|png|gif)$/
));
