import Heading from '@atoms/Heading/Heading';
import Rhythm from '@atoms/Rhythm/Rhythm';

import {
  Table,
  Table__head,
  Table__body,
  Table__row,
  Table__header,
  Table__data
} from '@atoms/Table/Table';

export const Guide__readme = (props) => {
  const {
    children,
    ...attrs
  } = props;
  const { jsdocs } = props;
  const { jsxdocs } = props;

  const propsSection = () => (
    <Rhythm tagName="section" className="guide__readme-section" {...attrs}>
      <Heading className="guide__readme-toggler" level="h3">Props</Heading>
      <Rhythm className="guide__readme-togglee hide">
        <p>Props are predefined attributes used to alter this element, or passed through to rendered children.</p>
        <Table variant="responsive">
          <Table__head>
            <Table__row>
              <Table__header width="15%">Name</Table__header>
              <Table__header width="25%">Types</Table__header>
              <Table__header width="55%">Comment</Table__header>
            </Table__row>
          </Table__head>
          <Table__body>
            {
              (jsxdocs)
                ? Object.keys(jsxdocs.props).map((index) => {
                  const prop = jsxdocs.props[index];
                  const propType = prop.type.raw.replace(/\r?\n|\r/g, '').replace(/PropTypes./g, '').replace(/(.*)\(\[(.*)\]\)/g, '$2');
                  return (
                    <Table__row key={index}>
                      <Table__data>{index}</Table__data>
                      <Table__data>{propType}</Table__data>
                      <Table__data>{(prop.description) ? prop.description : <div className="doc-error">Missing description</div>}</Table__data>
                    </Table__row>
                  );
                })
                : <Table__row><Table__data colSpan="4">No props data found on this element</Table__data></Table__row>
            }
          </Table__body>
        </Table>
      </Rhythm>
    </Rhythm>
  );

  const methodsSection = () => (
    <Rhythm tagName="section" className="guide__readme-section">
      <Heading className="guide__readme-toggler" level="h3">Methods</Heading>
      <Rhythm className="guide__readme-togglee hide">
        <p>Methods are private actions that alter element states.</p>
        <Table variant="responsive">
          <Table__head>
            <Table__row>
              <Table__header width="32%">Name</Table__header>
              <Table__header width="12%">Params</Table__header>
              <Table__header width="12%">Props</Table__header>
              <Table__header width="72%">Comment</Table__header>
            </Table__row>
          </Table__head>
          <Table__body>
            {
              Object.keys(jsdocs).map((index) => {
                const method = jsdocs[index];
                if (method.type === 'VariableDeclaration') {
                  const { type } = method.declarations[0].init;

                  if (type === 'ArrowFunctionExpression') {
                    let { params } = method.declarations[0].init;
                    if (!params) { params = []; }
                    const { name } = method.declarations[0].id;
                    const { kind } = method;
                    return (
                      <Table__row key={index}>
                        <Table__data><strong>{kind} {name}</strong><br /><i>[{(!type) ? '--' : type}]</i></Table__data>
                        <Table__data>
                          {
                            (params.length)
                              ? Object.keys(params).map(
                                (i) => params[i].name
                              ).join(', ')
                              : ' -- '
                          }
                        </Table__data>
                        <Table__data>--</Table__data>
                        <Table__data>{method.comment}</Table__data>
                      </Table__row>
                    );
                  }

                  if (type === 'ObjectExpression') {
                    const { properties } = method.declarations[0].init;
                    const { name } = method.declarations[0].id;
                    const { kind } = method;
                    return (
                      <Table__row key={index}>
                        <Table__data><strong>{kind} {name}</strong><br /><i>[{(!type) ? '--' : type}]</i></Table__data>
                        <Table__data>--</Table__data>
                        <Table__data>
                          {
                            (properties.length)
                              ? Object.keys(properties).map(
                                (i) => properties[i].key.name
                              ).join(', ')
                              : ' -- '
                          }
                        </Table__data>
                        <Table__data>{method.comment}</Table__data>
                      </Table__row>
                    );
                  }
                }

                if (method.type === 'ExpressionStatement') {
                  const { type } = method.expression;
                  if (type === 'CallExpression') {
                    const objName = (method.expression.callee.object) ? method.expression.callee.object.name : '--';
                    const propName = (method.expression.callee.property) ? method.expression.callee.property.name : '--';
                    const name = (method.expression.callee.type === 'Identifier') ? method.expression.callee.name : [objName, '.', propName].join('');
                    return (
                      <Table__row key={index}>
                        <Table__data><strong>{name}</strong><br /><i>[{method.expression.type}]</i></Table__data>
                        <Table__data>--</Table__data>
                        <Table__data>--</Table__data>
                        <Table__data>{method.comment}</Table__data>
                      </Table__row>
                    );
                  }

                  if (type === 'AssignmentExpression') {
                    console.log(method);
                    const leftName = (method.expression.left.object) ? [method.expression.left.object.name, '.', method.expression.left.property.name].join('') : '--';
                    const { operator } = method.expression;
                    return (
                      <Table__row key={index}>
                        <Table__data><strong>{leftName} {operator}</strong><br /><i>[{method.expression.type}]</i></Table__data>
                        <Table__data>--</Table__data>
                        <Table__data>--</Table__data>
                        <Table__data>{method.comment}</Table__data>
                      </Table__row>
                    );
                  }
                }

                return false;
              })
            }
          </Table__body>
        </Table>
      </Rhythm>
    </Rhythm>
  );

  const description = (jsxdocs.description) ? jsxdocs.description : <span className="doc-error">Missing Element description!<br /> Please describe this element in a multi-line comment at the top of it&apos;s JSX file.</span>;

  return (
    <Rhythm className="guide__readme">
      <Rhythm>
        <Heading level="h1">{jsxdocs.displayName}</Heading>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </Rhythm>

      <div className="guide__readme-sections">
        {propsSection()}
        {methodsSection()}
      </div>
    </Rhythm>
  );
};

export default Guide__readme;
