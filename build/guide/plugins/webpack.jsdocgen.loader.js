const extract = require('extract-comment');
const { parse, walk } = require('abstract-syntax-tree');

module.exports = function ( source ) {
  const data = [];
  let comments;
  let parsed;
  let nodes = [];

  try {
    parsed = parse(source,{
      module: true,
      loc: true
    });

    comments = extract(source);

    walk(parsed, (node, parent) => {
      const lineNumber = (node.loc.start.line - 1);
      const comment = Object.keys(comments).map((key) => {
        if (comments[key].loc.end.line === lineNumber) {
          return comments[key].raw.replace(/\*/g, '').trim();
        }
        return false;
      }).filter((n) => n);

      if (comment.length) {
        node.comment = comment;
        nodes.push(node);
      }
    });

    Object.keys(nodes).map((index) => {
      data.push(nodes[index]);
    });
  } catch (e) { }

  return "module.exports = " + JSON.stringify(data, undefined, "\t");
};
