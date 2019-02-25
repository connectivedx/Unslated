/*
  Guide entry file to bundle both /dist/js/guide.js and /dist/css/guide.css.

  This is seperated from the ./build/assets.js to keep main assets seperate
  from the guide assets being bundled here.
*/

// Guide JS
import ReactDOM from 'react-dom';
import Guide from '@guide/guide';
import GuideNav from '@guide/partials/nav/guide__nav.container';
import GuideIcons from '@guide/partials/icons/guide__icons.container';
import GuideColors from '@guide/partials/colors/guide__colors.container';
import GuideReadme from '@guide/partials/readme/guide__readme.container';
import GuideMetrics from '@guide/partials/metrics/guide__metrics.container';
import GuideStylist from '@guide/partials/stylist/guide__stylist.container';
import GuideWelcome from '@guide/partials/welcome/guide__welcome.container';
import GuideExamples from '@guide/partials/examples/guide__examples.container';
import GuideTypography from '@guide/partials/typography/guide__typography.container';
import Package from '@root/package.json';

// Guide styles
require('@guide/guide.css');
require('prismjs/themes/prism.css');

// Gather all guide dependent element examples
const requireAll = (context) => context.keys().map(context);
requireAll(require.context('@elements/', true, /\.examples.jsx$/));

document.head.querySelector('title').innerText = [Package.name, ' ', Package.version].join('');

// Mount the guide into DOM and run it's container.js
ReactDOM.render(<Guide />, document.querySelector('#index'), () => {
  Utils.initComponent('GuideNav', '.guide__nav', GuideNav);
  Utils.initComponent('GuideExamples', '.guide__examples', GuideExamples);
  Utils.initComponent('GuideIcons', '.guide__icons', GuideIcons);
  Utils.initComponent('GuideColors', '.guide__colors', GuideColors);
  Utils.initComponent('GuideStylist', '.guide__stylist', GuideStylist);
  Utils.initComponent('GuideReadme', '.guide__readme', GuideReadme);
  Utils.initComponent('GuideWelcome', '.guide__welcome', GuideWelcome);
  Utils.initComponent('GuideMetrics', '.guide__metrics', GuideMetrics);
  Utils.initComponent('GuideTypography', '.guide__typography', GuideTypography);
});
