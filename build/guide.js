/*
  Guide entry file to bundle both /dist/js/guide.js and /dist/css/guide.css.

  This is seperated from the ./build/assets.js to keep main assets seperate
  from the guide assets being bundled here.
*/

// Guide JS
import ReactDOM from 'react-dom';
import { Guide, Blank, Data } from '@guide/guide';
import GuideNav from '@guide/partials/nav/guide__nav.container';
import GuidePages from '@guide/partials/pages/guide__pages.container';
import GuideReadme from '@guide/partials/readme/guide__readme.container';
import GuideStylist from '@guide/partials/stylist/guide__stylist.container';
import GuideWelcome from '@guide/partials/welcome/guide__welcome.container';
import GuideExamples from '@guide/partials/examples/guide__examples.container';

// Guide styles
require('@guide/guide.css');
require('prismjs/themes/prism.css');

// Gather all guide dependent element examples
const requireAll = (context) => context.keys().map(context);
requireAll(require.context('@elements/', true, /\.examples.jsx$/));

const isData = (window.location.pathname.indexOf('/data/') !== -1);
const isBlank = (window.location.pathname.indexOf('/blank/') !== -1);

// Mount the guide into DOM and run it's container.js
if (isData) {
  ReactDOM.render(<Data />, document.querySelector('html')); // eslint-disable-line
} else if (isBlank) {
  ReactDOM.render(<Blank />, document.querySelector('#index'));
} else {
  ReactDOM.render(<Guide />, document.querySelector('#index'), () => {
    Utils.initComponent('GuideNav', '.guide__nav', GuideNav);
    Utils.initComponent('GuideExamples', '.guide__examples', GuideExamples);
    Utils.initComponent('GuidePages', '.guide__pages', GuidePages);
    Utils.initComponent('GuideStylist', '.guide__stylist', GuideStylist);
    Utils.initComponent('GuideReadme', '.guide__readme', GuideReadme);
    Utils.initComponent('GuideWelcome', '.guide__welcome', GuideWelcome);
  });
}
