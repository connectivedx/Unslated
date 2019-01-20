export const Guide__pages = (props) => {
  const {
    ...attrs
  } = props;

  const classStack = Utils.createClassStack([
    'guide__pages'
  ]);

  const pages = GuideUtils.getPages();
  const page = Object.keys(pages).map((key) => {
    if (key.split('.')[1].split('/')[1] === props.match.params.page) {
      return pages[key].default;
    }

    return false;
  });

  return (
    <div className={classStack} {...attrs}>
      {
        page.filter((el) => el != null)[0]()
      }
    </div>
  );
};


export default Guide__pages;
