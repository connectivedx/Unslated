import ReactDOMServer from 'react-dom/server';

export const Guide__pages = (props) => {
  const {
    ...attrs
  } = props;

  const classStack = Utils.createClassStack([
    'pages'
  ]);

  const pages = Utils.getPages();
  let page = Object.keys(pages).map((key, index) => {
    if (key.split('.')[1].split('/')[1] === props.match.params.page) {
      return pages[key].default;
    }
  });

  return (
    <div className={classStack}>
      {
        page.filter((el) => {
          return el != null;
        })[0]()
      }
      </div>
  );
};


export default Guide__pages;
