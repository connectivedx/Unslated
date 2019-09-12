/*
  Main entry file to bundle both /dist/js/main.js and /dist/css/main.css.

  This is seperated from the ./build/guide.js to keep guide assets seperate
  from the site or application main assets being bundled here.
*/

import '@src/styles';
import '@src/scripts';

const requireAll = (context) => context.keys().map(context);

// Import all CSS and Image files
requireAll(require.context(
  '@elements/',
  true,
  /^(?!.*Root).*\/(?!.*RichText).*\/(?!.*font-face).*\.(css|svg|jpg|png|gif)$/
));
