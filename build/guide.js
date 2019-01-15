/* 
  Guide entry file to bundle both /dist/js/guide.js and /dist/css/guide.css.

  This is seperated from the ./build/assets.js to keep main assets seperate 
  from the guide assets being bundled here.
*/

// Guide styles
require('@guide/guide.css');
require('prismjs/themes/prism.css');

// Guide JS
import ReactDOM from "react-dom";
import Guide from '@guide/guide';
import GuideNav  from '@guide/partials/nav/guide__nav.container';
import GuidePages from '@guide/partials/pages/guide__pages.container';
import GuideReadme from '@guide/partials/readme/guide__readme.container';
import GuideStylist from '@guide/partials/stylist/guide__stylist.container';
import GuideWelcome from '@guide/partials/welcome/guide__welcome.container';
import GuideExamples from '@guide/partials/examples/guide__examples.container';

// Gather all guide dependent element examples
const requireAll = (context) => context.keys().map(context);
requireAll(require.context('@elements/', true, /\.examples.jsx$/));

// Mount the guide into DOM and run it's container.js
ReactDOM.render(<Guide />, document.getElementById("index"), () => {
	Utils.initComponent('GuideNav', '.guide__nav', GuideNav);
	Utils.initComponent('GuideExamples', '.guide__examples', GuideExamples);
	Utils.initComponent('GuidePages', '.guide__pages', GuidePages);
	Utils.initComponent('GuideStylist', '.guide__stylist', GuideStylist);
	Utils.initComponent('GuideReadme', '.guide__readme', GuideReadme);
	Utils.initComponent('GuideWelcome', '.guide__welcome', GuideWelcome);
});
