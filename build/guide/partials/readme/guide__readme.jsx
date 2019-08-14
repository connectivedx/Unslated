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

  // jsx prop auto documentation (see: guide/partials/examples.jsx)
  const { jsxDocs } = props.data;
  // js methodology auto documentation (see: guide/partials/examples.jsx)
  const { jsDocs } = props.data;

  // Displays elements JSX templating props
  const propsSection = () => (
    <Rhythm tagName="section" className="guide__readme-section" {...attrs}>
      <Heading className="guide__readme-toggler" level="h3">Props</Heading>
      <Rhythm className="guide__readme-togglee hidden">
        <p>Predefined attributes used to alter the template rendering of this element.</p>
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
              Object.keys(jsxDocs[0].props).map((index) => {
                const prop = jsxDocs[0].props[index];
                const propType = prop.type;
                return (
                  <Table__row key={index}>
                    <Table__data>{index}</Table__data>
                    <Table__data>{propType}</Table__data>
                    <Table__data>{(prop.description) ? prop.description : <div className="doc-error">Missing description</div>}</Table__data>
                  </Table__row>
                );
              })
            }
          </Table__body>
        </Table>
      </Rhythm>
    </Rhythm>
  );

  // Displays element logic methodology by AST ESTree
  const methodsSection = () => (
    <Rhythm tagName="section" className="guide__readme-section">
      <Heading className="guide__readme-toggler" level="h3">Methods</Heading>
      <Rhythm className="guide__readme-togglee hidden">
        <p>Private or public methods that alter the state or DOM of this element.</p>
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
              Object.keys(jsDocs).map((index) => {
                const method = jsDocs[index];
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

  let description;
  if (jsxDocs) {
    description = `
      <span className="doc-error">
        Missing Element description!<br />
        Please describe this element in a multi-line comment at the top of it&apos;s JSX file.
      </span>
    `;
    description = (jsxDocs[0].description) ? jsxDocs[0].description : description;
  }

  return (
    <Rhythm className="guide__readme">
      <Rhythm>
        <Heading level="h1">{props.data.name}</Heading>
        {
          (description)
            ? (<p dangerouslySetInnerHTML={{ __html: description }} />)
            : ''
        }
      </Rhythm>

      <div className="guide__readme-sections">
        {
          (jsxDocs)
            ? propsSection()
            : ''
        }
        {
          (jsDocs)
            ? methodsSection()
            : ''
        }
      </div>
    </Rhythm>
  );
};

export default Guide__readme;
