/*
  Guide entry file to bundle both /dist/js/guide.js and /dist/css/guide.css.

  This is seperated from the ./build/assets.js to keep main assets seperate
  from the guide assets being bundled here.
*/

// Guide JS
import Sly from '@modifiers/Sly/Sly.container';
import Guide from '@guide/guide.router';
import Package from '@root/package.json';
import GuideNav from '@guide/partials/nav/guide__nav.container';
import GuideIcons from '@guide/partials/icons/guide__icons.container';
import GuideColors from '@guide/partials/colors/guide__colors.container';
import GuideReadme from '@guide/partials/readme/guide__readme.container';
import GuideWelcome from '@guide/partials/welcome/guide__welcome.container';
import GuideMetrics from '@guide/partials/metrics/guide__metrics.container';
import GuideStylist from '@guide/partials/stylist/guide__stylist.container';
import GuideExamples from '@guide/partials/examples/guide__examples.container';
import GuideTypography from '@guide/partials/typography/guide__typography.container';

// Set page title based on package config
document.head.querySelector('title').innerText = `${Package.name} ${Package.version}`;
document.body.appendChild(document.createElement('sly'));

// Mount the guide into DOM and run it's container.js
ReactDOM.render(<Guide />, document.querySelector('#index'), () => {
  document.addEventListener('DOMContentLoaded', () => {
    Utils.initComponent('Sly', 'sly', Sly);
    Utils.initComponent('GuideNav', '.guide__nav', GuideNav);
    Utils.initComponent('GuideExamples', '.guide__examples', GuideExamples);
    Utils.initComponent('GuideIcons', '.guide__icons', GuideIcons);
    Utils.initComponent('GuideColors', '.guide__colors', GuideColors);
    Utils.initComponent('GuideStylist', '.guide__stylist', GuideStylist);
    Utils.initComponent('GuideReadme', '.guide__readme', GuideReadme);
    Utils.initComponent('GuideWelcome', '.guide__welcome', GuideWelcome);
    Utils.initComponent('GuideMetrics', '.guide__metrics', GuideMetrics);
    Utils.initComponent('GuideTypography', '.guide__typography', GuideTypography);
  }, false);
});
