/*
  All svg files in Icon/assets/ get bundled into a iconset.svg file.
  This script will request iconset file at page load, and inject results in the document body for sprite usage.
*/

export const Icon = () => {
  const init = () => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      '[assetPath]img/iconset-[hash].svg',
      true
    );

    xhr.onprogress = () => {};
    xhr.onload = () => {
      if (!xhr.responseText || xhr.responseText.substr(0, 4) !== '<svg') {
        throw Error('Invalid SVG Response');
      }
      if (xhr.status < 200 || xhr.status >= 300) {
        return;
      }
      const div = document.createElement('div');
      div.innerHTML = xhr.responseText;
      document.body.insertBefore(div, document.body.childNodes[0]);
    };
    xhr.send();
  };

  init();
};

export default Icon;
