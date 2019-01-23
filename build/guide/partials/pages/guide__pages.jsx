import Heading from '@atoms/Heading/Heading';

export const Guide__pages = (props) => {
  const classStack = Utils.createClassStack([
    'guide__pages'
  ]);

  const pages = GuideUtils.getPages();
  const page = Object.keys(pages).map((key) => {
    if (key.split('.')[1].split('/')[1] === props.match.params.page) {
      return pages[key].default;
    }
    return null;
  }).filter((el) => el);

  return (
    <div className={classStack}>
      {
        (pages.length) ? page[0]() : null
      }
    </div>
  );
};

// Style guide's 404
export const BadAddress = () => {
  const classStack = Utils.createClassStack([
    'guide__pages',
    'guide__404'
  ]);

  return (
    <div
      className={classStack}
      style={{ backgroundImage: 'url(//media.giphy.com/media/SP58bfyWGP1pC/giphy.gif)' }}
    >
      <Heading>
        404<br /> Page not found!
      </Heading>
    </div>
  );
};


export default Guide__pages;
