// Simple little plugin that resolves font imports to font-faces (only for development builds)
// Usage: rem(px value)

const path = require('path');
const postcss = require('postcss');
const https = require("https");

module.exports = postcss.plugin('postcss-rems', () => {
  const getResponse = (url, callback) => {
    try {
      https.get(url, response => {
        response.on('data', (data) => {
          callback(data);
        });
      });
    } catch(err) { console.log(url, err); }
  };

  return root => {
    root.walkAtRules('import', (rule) => {
      if (rule.params.indexOf('url(') !== -1 && rule.params.indexOf('font') !== -1) {
        let url = rule.params.replace(/url\((.*?)\)/g, '$1').replace(/'(.*?)'/g, '$1');
        getResponse(url, (data) => {
          // data = data.toString().replace(/url\((.*?)\)/g, 'url(\'$1\')');
          console.log(data.toString().replace(/ [\S\s]/g, ''));
          // root.prepend(data.toString().replace(/url\((.*?)\)/g, 'url(\'$1\')'));
          // rule.remove();
        });
      }
    })
  }
});
