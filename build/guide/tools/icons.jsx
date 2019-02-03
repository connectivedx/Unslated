import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import Icon from '@atoms/Icon/Icon';
import Form from '@atoms/Form/Form';
import { List } from '@atoms/List/List';
import Input from '@atoms/Input/Input';
import {
  Card,
  Card__header,
  Card__body,
  Card__footer
} from '@molecules/Card/Card';

const requireAll = (r) => r.keys().map(r);
const files = requireAll(require.context('@atoms/Icon/assets', false, /\.(svg)$/));
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
    filename: name,
    name: name.split('.')[0],
    size: GuideUtils.bytesToSize(parseInt(size, 10))
  };
});

const page = () => (
  <Rhythm>
    <Heading>Project Icons:</Heading>
    <p>For each SVG file added to src/elements/atoms/Icon/assets, this page will list them here as a global view of all project icons. The Icon example page better demonstraits icon style variations, while this page simply lists all project icons without variations.</p>
    <div className="icons__control">
      <Form legend="Use the form below to search over project icons">
        <Input label="Filter project icon(s):" type="input" className="icons__controls-search" id="icon-search" name="query" />
      </Form>
    </div>
    <Rhythm className="icons">
      {
        icons
          ? Object.keys(icons).map((i) => (
            <Card
              key={i}
              style={{
                '--icon-font-size': '128px',
                '--icon-fill': 'auto',
                '--icon-stroke': 'transparent',
                '--icon-stroke-width': '0'
              }}
              data-icon={icons[i].name}
            >
              <Card__header>
                <Heading level="h5">
                  {icons[i].filename}
                  <Form legend="Use the form below to change icon size" className="icon__utilities">
                    <List>
                      <Input tagName="li" className="icon__utility list__item list__item--default" type="range" id="icon-size" min="1" max="256" defaultValue="128" name="font-size" label="size" align="inline-right" />
                      <Input tagName="li" className="icon__utility list__item list__item--default" type="range" id="icon-stroke-width" min="0" max="16" defaultValue="0" name="stroke-width" label="stroke" align="inline-right" />
                      <Input tagName="li" className="icon__utility list__item list__item--default" type="color" id="icon-fill" name="fill" label="fill" align="inline-right" />
                      <Input tagName="li" className="icon__utility list__item list__item--default" type="color" id="icon-stroke" name="stroke" label="stroke" align="inline-right" />
                    </List>
                  </Form>
                </Heading>
              </Card__header>
              <Card__body>
                <Icon name={icons[i].name} />
              </Card__body>
              <Card__footer>
                <p>{icons[i].size}</p>
              </Card__footer>
            </Card>
          ))
          : <div>No SVG files found in source/elements/atoms/Icon/assets/</div>
      }
    </Rhythm>
  </Rhythm>
);

page.options = {
  navless: true,
  headless: false
};

export default page;
