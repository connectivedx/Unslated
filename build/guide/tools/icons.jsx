import {
  Guide__icons,
  Guide__icons_card,
  Guide__icons_wrapper
} from '@guide/partials/icons/guide__icons';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import Form from '@atoms/Form/Form';
import Input from '@atoms/Input/Input';

const requireAll = (r) => r.keys().map(r);
const files = requireAll(require.context('@atoms/Icon/assets', false, /\.(svg)$/));

// Build our cards data our requireAll svg gathering method above
const icons = Object.keys(files).map((i) => {
  const name = files[i].split('/').slice(-1)[0];
  const size = Object.keys(__stats__.assets).map((j) => {
    if (__stats__.assets[j].name.indexOf(name) !== -1) {
      return parseInt(__stats__.assets[j].size, 10);
    }
    return false;
  }).filter((n) => n);

  return {
    path: files[i],
    file: name,
    name: name.split('.')[0],
    size: GuideUtils.bytesToSize(parseInt(size, 10))
  };
});

const page = () => (
  <Guide__icons>
    <Rhythm>
      <Heading>Project Icons:</Heading>
      <p>
        For each SVG file added to src/elements/atoms/Icon/assets,
        this page will list them here as a global view of all project icons.
        The Icon example page better demonstraits icon style variations,
        while this page simply lists all project icons without variations.
      </p>
      <div className="icons__control">
        <Form legend="Use the form below to search over project icons">
          <Input
            type="text"
            label="Filter project icon(s):"
            className="icons__controls-search"
            id="icon-search"
            name="query"
          />
        </Form>
      </div>
      <Guide__icons_wrapper>
        {
          icons
            ? Object.keys(icons).map((i) => (
              <Guide__icons_card
                key={i}
                name={icons[i].name}
                file={icons[i].file}
                size={icons[i].size}
              />
            ))
            : (
              <div>
                No SVG files found in source/elements/atoms/Icon/assets/
              </div>
            )
        }
      </Guide__icons_wrapper>
    </Rhythm>
  </Guide__icons>
);

page.options = {
  navless: true,
  headless: false
};

export default page;
