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

  return (
    <Rhythm className="guide__readme">
      <Rhythm>
        <Heading level="h1">{props.data.name}</Heading>
        <p className="guide__readme-description" />
      </Rhythm>

      <div className="guide__readme-sections">
        <Rhythm tagName="section" className="guide__readme-section" {...attrs}>
          <Heading className="guide__readme-toggler" level="h3">Tag Docs</Heading>
          <Rhythm className="guide__readme-togglee hidden jsx-tags">
            <strong>Comprehensive overview of all available tags in association with this element.</strong>
          </Rhythm>
        </Rhythm>
        <Rhythm tagName="section" className="guide__readme-section">
          <Heading className="guide__readme-toggler" level="h3">JS Docs</Heading>
          <Rhythm className="guide__readme-togglee hidden js-tables">
            <strong>Clientside logic and functionality available to this element.</strong>
            <Heading level="h4">Methods</Heading>
            <p>Bits of &quot;task based&quot; logic typically reserved for when it is needed more than once per-script.</p>
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
            <p>Hooks to perfrom logic or methods based on the qualifing of one or another kind of user input.</p>
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
            <p>Selectors are any kind selection made to the DOM and is not limited to the scope of this element.</p>
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
