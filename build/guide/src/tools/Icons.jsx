import Form from '@guideAtoms/Form/Form';
import Heading from '@guideAtoms/Heading/Heading';
import Input from '@guideAtoms/Input/Input';
import Rhythm from '@guideAtoms/Rhythm/Rhythm';
import {
  Icons,
  Icons_card,
  Icons_wrapper
} from '@guideOrganisms/icons/Icons';

const requireAll = (r) => r.keys().map(r);
const files = requireAll(require.context('@atoms/Icon/assets', false, /\.(svg)$/));

// Build our cards data our requireAll svg gathering method above
const icons = Object.keys(files).map((i) => {
  const name = files[i].split('/').slice(-1)[0];
  const size = Object.keys(__stats__.data).map((j) => {
    if (__stats__.data[j].name.indexOf(name) !== -1) {
      return parseInt(__stats__.data[j].size, 10);
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
  <Icons>
    <Rhythm>
      <Heading>Project Icons:</Heading>
      <p>
        For each SVG file added to src/elements/atoms/Icon/assets,
        this page will list them here as a global view of all project icons.
        The Icon example page better demonstraits icon style variations,
        while this page simply lists all project icons without variations.
      </p>
      <div className="guide__icons__control">
        <Form legend="Use the form below to search over project icons">
          <Input
            type="text"
            label="Search"
            className="icons__controls-search"
            id="icon-search"
            name="query"
          />
        </Form>
      </div>
      <Icons_wrapper>
        {
          icons
            ? Object.keys(icons).map((i) => (
              <Icons_card
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
      </Icons_wrapper>
    </Rhythm>
  </Icons>
);

page.options = {
  navless: false,
  headless: false
};

export default page;
