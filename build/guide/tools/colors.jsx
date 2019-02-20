//
// See build/guide/guide.utilities.jsx for any GuideUtils methods used below.
//
import colors from '!!style-loader!css-loader!@vars/colors';
import { Guide__colors, AccessibilityLevel } from '@guide/partials/colors/guide__colors';
import { List, List__item } from '@atoms/List/List';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import Select from '@atoms/Select/Select';


const cards = Object.keys(GuideUtils.cleanColorVariables(colors)).map((key) => {
  if (colors[key] === 'true') { return false; }

  const colorUnits = GuideUtils.getColorUnits(colors[key]);

  if (!colorUnits.hex) { return false; }

  return (
    <List__item key={key}>
      <div>
        <AccessibilityLevel
          contrastPrimary={GuideUtils.getColorContrast(colors['--color-text--primary'], colorUnits.hex)}
          contrastSecondary={GuideUtils.getColorContrast(colors['--color-text--secondary'], colorUnits.hex)}
          level="AA"
        />
        <AccessibilityLevel
          contrastPrimary={GuideUtils.getColorContrast(colors['--color-text--primary'], colorUnits.hex)}
          contrastSecondary={GuideUtils.getColorContrast(colors['--color-text--secondary'], colorUnits.hex)}
          level="AAA"
        />

        <div style={{ backgroundColor: colors[key], height: '120px' }} />

        <div>
          {colorUnits.hex}
        </div>
      </div>
      <div>{key.replace('--color-', '')}</div>
    </List__item>
  );
});

const page = () => (
  <Guide__colors>
    <Rhythm>
      <Heading level="h1">Project colors</Heading>
      <p>Below is a comprehensive quick view of all project colors against both AA and AAA accessiiblity contrast tests. Each color is tested for both black and white contrast levels against font color, size and weights.</p>
      <div className="AccessibilityLevel__control">
        <Select className="AccessibilityLevel__controls accessibility__controls-level" name="level" id="level" label="WCAG Level">
          <option value="AccessibilityLevel--double" defaultValue>AA</option>
          <option value="AccessibilityLevel--triple">AAA</option>
        </Select>
        <Select className="AccessibilityLevel__controls accessibility__controls-weight" name="weight" id="weight" label="Font Size / Weight">
          <option value="AccessibilityLevel__badge--normal" defaultValue>normal (14pt)</option>
          <option value="AccessibilityLevel__badge--large--bold">large-bold (18pt)</option>
          <option value="AccessibilityLevel__badge--large">large (18pt)</option>
        </Select>
      </div>
    </Rhythm>
    <List className="colors" variant="blank">{ cards }</List>
  </Guide__colors>
);

page.options = {
  navless: false,
  headless: false
};

export default page;
