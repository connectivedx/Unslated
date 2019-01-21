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
  }).filter((el) => el != null);

  return (
    <div className={classStack}>
      {
        page[0]()
      }
    </div>
  );
};


export default Guide__pages;
