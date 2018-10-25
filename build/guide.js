/* 
  Guide entry file to bundle both /dist/js/guide.js and /dist/css/guide.css.

  This is seperated from the ./build/assets.js to keep main assets seperate 
  from the guide assets being bundled here.
*/

import ReactDOM from "react-dom";
import Guide from '@guide/guide';
import GuideJS from '@guide/guide.container.js';

// Guide styles
require('@guide/guide.css');
require('prismjs/themes/prism.css');

// Gather all guide dependent element examples
const requireAll = (context) => context.keys().map(context);
requireAll(require.context('@elements/', true, /\.examples.jsx$/));

// Mount the guide into DOM and run it's container.js
ReactDOM.render(<Guide />, document.getElementById("index"));
new GuideJS();