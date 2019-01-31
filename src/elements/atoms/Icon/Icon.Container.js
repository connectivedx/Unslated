export const Icon = () => {
  const init = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/img/iconset-[hash].svg', true);
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
