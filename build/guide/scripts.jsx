/*
  Guide entry file to bundle both /dist/js/guide.js and /dist/css/guide.css.

  This is seperated from the ./build/assets.js to keep main assets seperate
  from the guide assets being bundled here.
*/

// Guide JS
import Sly from '@modifiers/Sly/Sly.container';
import Guide from '@guide/guide.router';
import Package from '@root/package.json';

import GuideNav from '@guideMolecules/Nav/Nav.Container';
import GuideReadme from '@guideMolecules/Readme/Readme.Container';
import GuideStylist from '@guideMolecules/Stylist/Stylist.Container';
import GuideExamples from '@guideMolecules/Examples/Examples.Container';

import GuideIcons from '@guideOrganisms/Icons/Icons.Container';
import GuideColors from '@guideOrganisms/Colors/Colors.Container';
import GuideMetrics from '@guideOrganisms/Metrics/Metrics.Container';
import GuideDashboard from '@guideOrganisms/Dashboard/Dashboard.Container';
import GuideTypography from '@guideOrganisms/Typography/Typography.Container';

import GuideForm from '@guideAtoms/Form/Form.Container.js';
import GuideInput from '@guideAtoms/Input/Input.Container.js';
import GuideSelect from '@guideAtoms/Select/Select.Container.js';
import GuideTextarea from '@guideAtoms/Textarea/Textarea.Container.js';

// Set page title based on package config
document.head.querySelector('title').innerText = `${Package.name} ${Package.version}`;
document.body.appendChild(document.createElement('sly'));

// Mount the guide into DOM and run it's container.js
ReactDOM.render(<Guide />, document.querySelector('#index'), () => {
  document.addEventListener('DOMContentLoaded', () => {
    Utils.initComponent('Sly', 'sly', Sly);
    Utils.initComponent('GuideNav', '.guide__nav', GuideNav);
    Utils.initComponent('GuideIcons', '.guide__icons', GuideIcons);
    Utils.initComponent('GuideColors', '.guide__colors', GuideColors);
    Utils.initComponent('GuideReadme', '.guide__readme', GuideReadme);
    Utils.initComponent('GuideStylist', '.guide__stylist', GuideStylist);
    Utils.initComponent('GuideMetrics', '.guide__metrics', GuideMetrics);
    Utils.initComponent('GuideExamples', '.guide__examples', GuideExamples);
    Utils.initComponent('GuideDashboard', '.guide__dashboard', GuideDashboard);
    Utils.initComponent('GuideTypography', '.guide__typography', GuideTypography);

    Utils.initComponent('GuideForm', '.guide__form', GuideForm);
    Utils.initComponent('GuideInput', '.guide__input', GuideInput);
    Utils.initComponent('GuideSelect', '.guide__select', GuideSelect);
    Utils.initComponent('GuideTextarea', '.guide__textarea', GuideTextarea);
  }, false);
});
