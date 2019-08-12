const extract = require('extract-comment');
const { parse, walk } = require('abstract-syntax-tree');

module.exports = function ( source ) {
  let parsed;
  let comments = extract(source);
  let collection = [];

  try {
    parsed = parse(source, {
      module: true,
      loc: true
    });
  } catch(e) {}

  walk(parsed, (node, parent) => {
    if (!node.loc) { return false; }
    let i = comments.length;
    while (i--) {
      if (comments[i].loc.end.line === (node.loc.start.line - 1)) {
        node.comment = comments[i].raw.replace(/\*/g, '').trim();
        collection.push(node);
      }
    }
  });

  return `module.exports = ${JSON.stringify(collection, undefined, "\t")};`;
};
