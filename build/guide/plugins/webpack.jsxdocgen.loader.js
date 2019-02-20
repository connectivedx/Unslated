const docgen = require('react-docgen');
const findAllComponentDefinitions = require('react-docgen/dist/resolver/findAllComponentDefinitions');
const marked = require('marked');
const loaderUtils = require('loader-utils');

if ( findAllComponentDefinitions.hasOwnProperty('default') ) {
  findAllComponentDefinitions = findAllComponentDefinitions.default
}

module.exports = function ( source ) {

  this.cacheable && this.cacheable();
  const query = loaderUtils.parseQuery(this.query);

  let value = {};

  try {
    value = docgen.parse(source, findAllComponentDefinitions);
    if ( value && query.markdownDescription) {
      value = value.map(function (doc) {
        if (doc.description) {
          doc.description = marked(doc.description);
        }
        return doc;
      });
    }
  } catch ( e ) {
    // console.log('ERROR in docgen-loader',  e);
  }

  return "module.exports = " + JSON.stringify(value, undefined, "\t");
};
