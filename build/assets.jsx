/*
  Main entry file to bundle both /dist/js/main.js and /dist/css/main.css.

  This is seperated from the ./build/guide.js to keep guide assets seperate
  from the site or application main assets being bundled here.
*/

import '@src/styles';
import '@src/scripts';

// Icon bundling
const requireAll = (r) => r.keys().map(r);
requireAll(require.context('@atoms/Icon/assets', false, /\.(svg)$/));

// Image bundling
requireAll(require.context('@atoms/Image/assets', false, /\.(svg|jpg|png|gif)$/));
