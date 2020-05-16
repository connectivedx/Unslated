import Heading from '@guideAtoms/Heading/Heading';

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

export const Pages = (props) => {
  let page;
  const pathname = props.location.pathname.replace('/pages/', '').replace('/tools/', '');
  if (global.guide.pages[pathname]) {
    page = global.guide.pages[pathname];
  } else if (props.match.params.page) {
    page = global.guide.pages[props.match.params.page];
  } else if (props.match.params.tool) {
    page = global.guide.tools[props.match.params.tool];
  }

  const classStack = Utils.createClassStack([
    `guide__${(props.location.pathname.indexOf('tools') !== -1) ? 'tools' : 'pages'}`,
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

export default Pages;
