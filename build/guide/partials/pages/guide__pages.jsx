import Heading from '@atoms/Heading/Heading';

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

export const Guide__pages = (props) => {
  let pages;
  let pageType;
  if (props.match.params.page) {
    pages = GuideUtils.getPages();
    pageType = 'page';
  }

  if (props.match.params.tool) {
    pages = GuideUtils.getTools();
    pageType = 'tool';
  }

  let page = Object.keys(pages).map((i) => {
    if (i.split('.')[1].split('/')[1] === props.match.params[pageType]) {
      return pages[i].default;
    }
    return null;
  }).filter((el) => el)[0];

  const classStack = Utils.createClassStack([
    'guide__pages',
    (page.options.navless === true) ? 'no-nav' : '',
    (page.options.headless === true) ? 'no-padding' : ''
  ]);

  if (!page) {
    page = <BadAddress />;
  }

  return (
    <div className={classStack}>
      {
        page()
      }
    </div>
  );
};

export default Guide__pages;
