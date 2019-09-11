const marked = require('marked');
const docgen = require('react-docgen');
const loaderUtils = require('loader-utils');
let findAllComponentDefinitions = require('react-docgen/dist/resolver/findAllComponentDefinitions');

if ( findAllComponentDefinitions.hasOwnProperty('default') ) {
  findAllComponentDefinitions = findAllComponentDefinitions.default
}

module.exports = function ( source ) {
  this.cacheable && this.cacheable();
  const query = loaderUtils.parseQuery(`?${this.query}`);

  let documentation = {};

  try {
    documentation = docgen.parse(source, findAllComponentDefinitions);
    documentation = documentation.map((doc) => {
      delete doc.methods;

      if (doc.props) {
        Object.keys(doc.props).map((i) => {
          const props = doc.props[i];
          Object.keys(props).map((j) => {
            const prop = props[j];
            if (['required', 'methods', 'defaultValue'].indexOf(j) !== -1){
              delete props[j];
            }

            if (j === 'type') {
              props[j] = props[j].raw.replace(/\r?\n|\r/g, '').replace(/PropTypes./g, '').replace(/(.*)\(\[(.*)\]\)/g, '$2');
            }
          });
        });
      }

      return doc;
    });

    if (documentation && query.markdownDescription) {
      documentation = documentation.map((doc) => {
        if (doc.description) {
          doc.description = marked(doc.description);
        }
        return doc;
      });
    }
  } catch ( e ) {
    console.log('ERROR in docgen-loader',  e);
  }

  return `module.exports = ${JSON.stringify(documentation, undefined, "\t")};`;
};
