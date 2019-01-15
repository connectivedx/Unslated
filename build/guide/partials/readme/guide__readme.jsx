import Heading from '@atoms/Heading/Heading';
import Rhythm from '@atoms/Rhythm/Rhythm';

import {
  Table,
  Table__head,
  Table__foot,
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

  const classStack = [
    'guide__readme'
  ];

  if (!props.docs) { return false; }

  const propsSection = () => {
    if (!props.docs.props) { return; }
    return (
      <Rhythm tagName="section" className="guide__readme-section">
        <Heading className="guide__readme-toggler" level="h3">Props</Heading>
        <Rhythm className="guide__readme-togglee hide">
          <p>Props are predefined inputs that alter or pass-through rendered.</p>
          <Table variant="responsive">
            <Table__head>
              <Table__row>
                <Table__header width="32%">Prop name</Table__header>
                <Table__header width="32%">Prop types</Table__header>
                <Table__header width="32%">Description</Table__header>        
              </Table__row>
            </Table__head>
            <Table__body>
              {
                (props.docs.props) ? 
                Object.keys(props.docs.props).map(index => {
                  const prop = props.docs.props[index];
                  const propType = prop.type.raw.replace(/\r?\n|\r/g, '').replace(/PropTypes./g, '').replace(/(.*)\(\[(.*)\]\)/g, '$2');
                  return (
                    <Table__row key={index}>
                      <Table__data>{index}</Table__data>
                      <Table__data>{propType}</Table__data>
                      <Table__data>{(prop.description) ? prop.description: <div className="doc-error">Missing description</div>}</Table__data>
                    </Table__row>
                  );
                })
                :
                  <Table__row key={index}>
                    <Table__data colSpan="4">No props data found on this element</Table__data>
                  </Table__row>
              }
            </Table__body>
          </Table>
        </Rhythm>
      </Rhythm>
    );
  };

  const methodsSection = () => {
    if (!props.docs.methods) { return; }
    return (
      <Rhythm tagName="section" className="guide__readme-section">
        <Heading className="guide__readme-toggler" level="h3">Methods</Heading>
        <Rhythm className="guide__readme-togglee hide">
          <p>Methods are private actions that alter element states.</p>
          <Table variant="responsive">
            <Table__head>
              <Table__row>
                <Table__header width="32%">Method name</Table__header>
                <Table__header width="32%">Method params</Table__header>
                <Table__header width="32%">Description</Table__header>        
              </Table__row>
            </Table__head>
            <Table__body>
              {
                Object.keys(props.docs.methods).map(index => {
                  const method = props.docs.methods[index];

                  if (method.name === 'render') { return; } // no need to document React's render method

                  return (
                    <Table__row key={index}>
                      <Table__data>{method.name}</Table__data>
                      <Table__data>
                        {(method.params.length) ? Object.keys(method.params).map(index => method.params[index].name).join(', ') : ' -- '}
                      </Table__data>
                      <Table__data>
                        {(method.description) ? method.description : <div className="doc-error">Missing description</div>}
                      </Table__data>
                    </Table__row>
                  );
                })
              }
            </Table__body>
          </Table>
        </Rhythm>
      </Rhythm>
    );
  };

  const description = (props.docs.description) ? props.docs.description : <span className="doc-error">Missing Element description!<br /> Please describe this element in a multi-line comment at the top of it&apos;s JSX file.</span>;
  
  return (
    <Rhythm className="guide__readme">
      <Rhythm>
        <Heading level="h1">{props.docs.displayName}</Heading>
        <p dangerouslySetInnerHTML={{__html: description}}>{}</p>
      </Rhythm>

      <div className="guide__readme-sections">
        {propsSection()}
        {methodsSection()}
      </div>
    </Rhythm>
  );
};

export default Guide__readme;
