import Rhythm from '@guideAtoms/Rhythm/Rhythm';
import Heading from '@guideAtoms/Heading/Heading';
import {
  Table,
  Table__head,
  Table__body,
  Table__row,
  Table__header
} from '@guideAtoms/Table/Table';

export const Readme = (props) => {
  const {
    children,
    ...attrs
  } = props;

  let description;
  /*
    if (jsxDocs) {
      description = `
        <span className="doc-error">
          Missing Element description!<br />
          Please describe this element in a multi-line comment at the top of it&apos;s JSX file.
        </span>
      `;
      description = (jsxDocs[0].description) ? jsxDocs[0].description : description;
    }
  */

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
        <Rhythm tagName="section" className="guide__readme-section" {...attrs}>
          <Heading className="guide__readme-toggler" level="h3">Tag Docs</Heading>
          <Rhythm className="guide__readme-togglee hidden">
            <p>Predefined attributes used to alter the template rendering of this element.</p>
            <Table variant="responsive" className="jsx">
              <Table__head>
                <Table__row>
                  <Table__header width="15%">Name</Table__header>
                  <Table__header width="25%">Types</Table__header>
                  <Table__header width="55%">Comment</Table__header>
                </Table__row>
              </Table__head>
              <Table__body />
            </Table>
          </Rhythm>
        </Rhythm>
        <Rhythm tagName="section" className="guide__readme-section">
          <Heading className="guide__readme-toggler" level="h3">JS Docs</Heading>
          <Rhythm className="guide__readme-togglee hidden">
            <Heading level="h4">Methods</Heading>
            <Table variant="responsive" className="js-methods">
              <Table__head>
                <Table__row>
                  <Table__header width="32%">Name</Table__header>
                  <Table__header width="12%">Type</Table__header>
                  <Table__header width="12%">Params</Table__header>
                  <Table__header width="72%">Comment</Table__header>
                </Table__row>
              </Table__head>
              <Table__body />
            </Table>

            <Heading level="h4">Event listeners</Heading>
            <Table variant="responsive" className="js-events">
              <Table__head>
                <Table__row>
                  <Table__header width="32%">Listener</Table__header>
                  <Table__header width="12%">Callback Type</Table__header>
                  <Table__header width="12%">Params</Table__header>
                  <Table__header width="72%">Line</Table__header>
                </Table__row>
              </Table__head>
              <Table__body />
            </Table>

            <Heading level="h4">Selectors</Heading>
            <Table variant="responsive" className="js-selectors">
              <Table__head>
                <Table__row>
                  <Table__header width="32%">Selector</Table__header>
                  <Table__header width="12%">Line</Table__header>
                </Table__row>
              </Table__head>
              <Table__body />
            </Table>
          </Rhythm>
        </Rhythm>
      </div>
    </Rhythm>
  );
};

export default Readme;
