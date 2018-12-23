import { List, List__item } from '@atoms/List/List';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import Icon from '@atoms/Icon/Icon';
const importIcons = (r) => r.keys().map(r);
const projectIcons = importIcons(require.context('@atoms/Icon/assets', false, /\.(svg)$/));
const icons = [];

Object.keys(projectIcons).map((i) => {
  const fileName = projectIcons[i].split('/').slice(-1)[0].split('.');
  fileName.pop();
  const iconName = fileName.join('-');
  icons.push({ name: iconName, path: projectIcons[i] });
  return icons;
});

const page = () => (
  <Rhythm>
      <Heading>Project Icons:</Heading>
      <p>
        For each SVG file added to src/elements/atoms/Icon/assets, this page will list them here as a global view of all project icons.
        The Icon example page better demonstraits icon style variations, while this page simply lists all project icons without variations.
      </p>
      <div className="icons__control">
        <label className="icons__controls">Filter Icons:
          <input type="text" className="icons__controls-search" />
        </label>
      </div>
      <div className="icons">  
        {
          projectIcons ?
          Object.keys(icons).map(i => {
            return (
              <div className="icons__card" key={i}>
                <Icon name={icons[i].name} />
              </div>
            );
          })
          : <div>No SVG files found in source/elements/atoms/Icon/assets/</div>
        }
      </div>
  </Rhythm>
);

export default page;
