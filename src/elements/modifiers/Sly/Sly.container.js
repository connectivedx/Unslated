/*
  This script is not for production and in no way supports the HTL data model.
  Instead, this script is used to clear away sly element usage while components are
  being rendered through the Unslated guide.
*/

export const Sly = (el) => {
  // Object to house all common selected elements within a components context
  const ui = {
    el
  };

  const remove = (sly) => {
    const parent = sly.parentNode;
    parent.removeChild(sly);
  };

  const unwrap = (sly) => {
    const parent = sly.parentNode;
    while (sly.firstChild) {
      parent.insertBefore(sly.firstChild, sly);
    }

    remove(sly);
  };

  const init = () => {
    // When rendering JSX components through the guide, we must flush away Sly element usage
    if (ui.el.innerHTML || ui.el.innerText) {
      unwrap(ui.el);
    } else {
      remove(ui.el);
    }
  };

  // Self init point
  init();
};

export default Sly;
