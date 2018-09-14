import ReactDOMServer from 'react-dom/server';
import ReactElementToString from 'react-element-to-string';
import pretty from 'pretty';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-json.min';

import Stylist from '@guide/partials/stylist/guide__stylist';
import Readme from '@guide/partials/readme/guide__readme';

import ExampleBg from '@guide/assets/example_bg.png';
import arrorRight from '@guide/assets/tab-arrow-right.svg';

import Button from '@atoms/Button/Button';
import Heading from '@atoms/Heading/Heading';
import Rhythm from '@atoms/Rhythm/Rhythm';

// Helper method to distil down an elements tag name for examples react code snip.
const getTagName = (element) => {
  if (typeof element === 'string') return element;
  if (typeof element.type === 'string') return element.type;
  if (element.type.displayName) return element.type.displayName;
  if (element.type.name) return element.type.name;
  if (element.props && element.props.tagName) return element.props.tagName;
  return 'unknown-element';
};

export const Guide__examples = (props) => {
  const {
    ...attrs
  } = props;

  const classStack = Utils.createClassStack([
    'examples'
  ]);

  // Gather all atomic elements (getExamples has a handy atomicLevel prop)
  const elementExamples = Utils.getExamples();
  let docs = undefined;

  // Gather all examples from atomic elements above
  const examples = Object.keys(elementExamples).map(index => {
    const element = elementExamples[index];
    if ((element.atomicLevel === props.match.params.category) && (element.name === props.match.params.element)) {
      docs = element.docs;
      return element.examples[0].examples;
    }
    return;
  }).filter(n => n)[0];

  return (
    <Rhythm tagName="section" className={classStack}>
      <Readme docs={docs} />
      <Rhythm className="examples examples__listing">
        {Object.keys(examples).map(index => {
          const example = examples[index];
          const component = example.component;

          
          // Gathers example's React code version
          const reactExample = ReactElementToString(component, {
            displayName: getTagName,
            showDefaultProps: false
          });

          // Gathers example's HTML code version
          const htmlExample = ReactDOMServer.renderToStaticMarkup(component);
          
          // Gathers example's used props
          const props = {};
          Object.keys(component.props).map(index => {
            if (index === 'children') { return false; }
            props[index] = component.props[index].toString();
          });
          console.log(component);
          return (
            <Rhythm className={`examples examples__item ${(index === '0') ? '' : 'hide'}`} key={index}>
              <Heading level="h5" className="examples examples__heading">{example.name}</Heading>
              <div className="examples examples__pallet" style={{'--breakpoint-speed': '0s', backgroundImage: ['url(', ExampleBg, ')'].join('')}}>
                <div className="examples examples__pallet-inner">
                  {component}
                </div>
              </div>
              <div className="examples examples__buttons">
                <Button size="small" data-index="0">React</Button>
                <Button size="small" data-index="1">HTML</Button>
                <Button size="small" data-index="2">Props</Button>
                <Button size="small" data-index="3">C#</Button>
              </div>
              <div className="examples examples__codes">
                <pre className="examples__code hide">
                  <code dangerouslySetInnerHTML={{ __html: Prism.highlight(reactExample, Prism.languages.jsx) }} />
                </pre>
                <pre className="examples__code hide">
                  <code dangerouslySetInnerHTML={{ __html: Prism.highlight(pretty(htmlExample), Prism.languages.html) }} />
                </pre>
                <pre className="examples__code hide">
                  {(component.props) ? <code dangerouslySetInnerHTML={{ __html: Prism.highlight(pretty(JSON.stringify(props)), Prism.languages.json) }} /> : ''}
                </pre>
                <pre className="examples__code hide">
                  {(component.props) ? <code dangerouslySetInnerHTML={{ __html: Prism.highlight('// https://reactjs.net/getting-started/aspnet.html \n// when consuming JSX components directly in CSHTML \n\r @Html.React("' + component.type.name + '", new { ' + Object.keys(props).map(index => {return index + ' = Model.' + index;}) +' });', Prism.languages.clike) }} /> : ''}
                </pre>                 
              </div>
            </Rhythm>
          );
        })}
      </Rhythm>
      <Stylist examples={examples} />
    </Rhythm>
  );
};

export default Guide__examples;
