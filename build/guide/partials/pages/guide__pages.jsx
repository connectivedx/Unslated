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
  let page;
  if (props.match.params.page) {
    page = global.guide.pages[props.match.params.page];
  }

  if (props.match.params.tool) {
    page = global.guide.tools[props.match.params.tool];
  }

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
