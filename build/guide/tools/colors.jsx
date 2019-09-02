import { Guide__colors, Guide__colors_card } from '@guide/partials/colors/guide__colors';
import List from '@atoms/List/List';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import Select from '@atoms/Select/Select';
import Input from '@atoms/Input/Input';
import colors from '!!style-loader!css-loader!@vars/colors';

// Build our cards up from our @vars/colors.css thanks to the CSS :export plugin.
const cards = Object.keys(GuideUtils.cleanColorVariables(colors)).map((key) => {
  if (colors[key] === 'true') { return false; }
  const colorUnits = GuideUtils.getColorUnits(colors[key]);
  if (!colorUnits.hex) { return false; }

  return (
    <Guide__colors_card
      key={key}
      name={key.replace('--color-', '')}
      color={colors[key]}
      data-color={key.replace('--color-', '')}
      primary={colors['--color-text--primary']}
      secondary={colors['--color-text--secondary']}
      unit={colorUnits.hex}
    />
  );
});

const page = () => (
  <Guide__colors>
    <Rhythm>
      <Heading level="h1">Project colors</Heading>
      <p>Below is a comprehensive quick view of all project colors against both AA and AAA accessiiblity contrast tests. Each color is tested for both black and white contrast levels against font color, size and weights.</p>

      <div className="AccessibilityLevel__control">
        <Input type="text" name="query" id="query" label="Search" />
        <Select
          className="AccessibilityLevel__controls accessibility__controls-level"
          name="level"
          id="level"
          label="WCAG Level"
        >
          <option value="AccessibilityLevel--double" defaultValue>AA</option>
          <option value="AccessibilityLevel--triple">AAA</option>
        </Select>

        <Select
          className="AccessibilityLevel__controls accessibility__controls-weight"
          name="weight"
          id="weight"
          label="Font Size / Weight"
        >
          <option value="AccessibilityLevel__badge--normal" defaultValue>normal (14px)</option>
          <option value="AccessibilityLevel__badge--large--bold">large-bold (18px)</option>
          <option value="AccessibilityLevel__badge--large">large (18px)</option>
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
