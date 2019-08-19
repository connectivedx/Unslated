const extract = require('extract-comment');
const { parse, walk } = require('abstract-syntax-tree');

module.exports = function ( source ) {
  let parsed;
  let comments = extract(source);
  const docs = [];
  const collection = [];

  try {
    parsed = parse(source, {
      loc: true
    });
  } catch(e) { }

  const getParams = (params) => {
    if (params.length) {
      return Object.keys(params).map((i) => params[i].name).join(', ');
    }
    return '--';
  };

  // Build cleaned collection of AST nodes
  walk(parsed, (node, parent) => {
    if (!node.loc) { return false; }
    let i = comments.length;

    while (i--) {
      if (
        comments[i].loc.end.line === (node.loc.start.line - 1)
        && comments[i].loc.start.column === node.loc.start.column
      ) {
        if (parent.body) { // if we are at the root node
          node.comment = comments[i].raw.replace(/\*/g, '').trim();
          collection.push(node);
        }
      }
    }
  });

  // Parse collected nodes and build docs object
  Object.keys(collection).map((i) => {
    const node = collection[i];
    const methodType = node.type;
    const { kind } = node;

    if (methodType === 'VariableDeclaration') {
      const { name } = node.declarations[0].id;
      const { type } = node.declarations[0].init;

      if (type === 'ArrowFunctionExpression') {
        docs.push({
          name: `${node.kind} ${node.declarations[0].id.name}`,
          type: (type) ? type : '--',
          params: getParams(node.declarations[0].init.params),
          props: '--',
          comment: node.comment
        });
      }

      if (type === 'ObjectExpression') {
        docs.push({
          name: `${node.kind} ${node.declarations[0].id.name}`,
          type: (type) ? type : '--',
          params: getParams(node.declarations[0].init.properties),
          props: '--',
          comment: node.comment
        });
      }
    }

    if (methodType === 'ExpressionStatement') {
      const { type } = node.expression;

      if (type === 'CallExpression') {
        const objName = (node.expression.callee.object) ? node.expression.callee.object.name : '--';
        const propName = (node.expression.callee.property) ? node.expression.callee.property.name : '--';
        const name = (node.expression.callee.type === 'Identifier') ? node.expression.callee.name : `${objName}.${propName}`;

        docs.push({
          name,
          type: (type) ? type : '--',
          params: '--',
          props: '--',
          comment: node.comment
        });
      }

      if (type === 'AssignmentExpression') {
        const leftName = (node.expression.left.object) ? `${node.expression.left.object.name}.${node.expression.left.property.name}` : '--';
        const { operator } = node.expression;
        const name = `${leftName} ${ operator}`;

        docs.push({
          name,
          type: (type) ? type : '--',
          params: '--',
          props: '--',
          comment: node.comment
        });
      }
    }
  });

  return `module.exports = ${JSON.stringify(docs, undefined, "\t")};`;
};
