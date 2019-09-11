/*
  Main entry file to bundle both /dist/js/guide.js and /dist/css/guide.css.

  This is seperated from the ./build/assets.js to keep assets seperate guide.
  Both guide.js and guide.css are not intended to be use in production.
*/
import '@guide/guide.parts';
import '@guide/styles'; // see ./build/guide/styles.css
import '@guide/scripts'; // see ./guide/guide/scripts.jsx

const requireAll = (context) => context.keys().map(context);

requireAll(
  require.context(
    '@guide/src/elements/',
    true,
    /^(?!.*Root).*\/(?!.*RichText).*\/(?!.*font-face).*\.css$/
  )
);

require('es6-object-assign').polyfill();
