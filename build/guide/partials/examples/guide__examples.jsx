import ReactDOMServer from 'react-dom/server';
import ReactElementToString from 'react-element-to-string';
import pretty from 'pretty';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-json.min';
import GuideConfig from '../../guide.config.js';

import Stylist from '@guide/partials/stylist/guide__stylist';
import Readme from '@guide/partials/readme/guide__readme';

import ExampleBg from '@guide/assets/example_bg.png';
import arrorRight from '@guide/assets/tab-arrow-right.svg';

import Button from '@atoms/Button/Button';
import Heading from '@atoms/Heading/Heading';
import Rhythm from '@atoms/Rhythm/Rhythm';
import { 
  Card, 
  Card__header, 
  Card__body, 
  Card__footer, 
  Card__group, 
  Card__deck,
  Card__grid,
} from '@molecules/Card/Card';

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
    'guide__examples'
  ]);

  // Gather all atomic elements (getExamples has a handy atomicLevel prop)
  const data = {
    docs: undefined,
    name: undefined,
    atomic: undefined,
    examples: GuideUtils.getExamples()[0]
  };

  data.examples = Object.keys(data.examples).map(index => {
    const element = data.examples[index];

    if ((element.atomic === props.match.params.category) && (element.name === props.match.params.element)) {
      data.docs = element.docs;
      data.atomic = element.atomic;
      data.name = element.name;
      return element.examples[0].examples;
    }

  }).filter(n => n)[0];

  return (
    <Rhythm tagName="section" className={classStack}>
      <Readme docs={data.docs} />
      <Rhythm className="examples__listing">
        {
          Object.keys(data.examples).map(index => {
            const example = data.examples[index];
            const component = example.component;

            // Gathers example's React code version
            const reactExample = ReactElementToString(component, {
              displayName: getTagName,
              showDefaultProps: false
            }).replace(/\<Unknown\>/g, '').replace(/\<\/Unknown\>/g, '').trim();

            // Gathers example's HTML code version
            let htmlExample = ReactDOMServer.renderToStaticMarkup(component);
            if (component.props.devonly === 'true') {
              htmlExample = htmlExample.replace(/<(.*)devonly="true">((.|\n)*)<\/(.*)>/m, '$2').trim();
            }

            // Gathers example's used props
            const props = {};
            Object.keys(component.props).map(index => {
              if (index === 'children') { return false; }
              props[index] = component.props[index].toString();
            });

            const options = {
              background: GuideConfig.examples.background,
              padding: GuideConfig.examples.padding,
              brightness: GuideConfig.examples.brightness
            };

            if (example.options) {
              if (example.options.background) { options.background = example.options.background; }
              if (example.options.padding) { options.padding = example.options.padding; }
              if (example.options.brightness) { options.brightness = example.options.brightness; }
            }

            return (
              <Card key={index} className="examples">
                <Card__header className="examples__header">
                  <Heading level="h5" className="examples__heading">{example.name}</Heading>
                </Card__header>
                <Card__body className="examples__body examples__item">
                  <Rhythm>
                    <p dangerouslySetInnerHTML={{__html: example.description}}></p>
                    <div className="examples__pallet" style={{
                        '--speed': '0s',
                        '--brightness': options.brightness,
                        '--background': ['url(', options.background, ')'].join(''),
                        '--padding': options.padding
                      }}>
                      <div className="examples__pallet-inner">
                        {component}
                      </div>
                    </div>
                  </Rhythm>
                </Card__body>
                <Card__footer className="examples__footer">
                  <div>
                    <Button size="small" data-index="0">React</Button>
                    <Button size="small" data-index="1">HTML</Button>
                    <Button size="small" data-index="2">Props</Button>
                    { (component.type.name) ? <Button size="small" data-index="3">C#</Button> : '' }
                  </div>
                  <div className="examples__codes">
                    <pre className="examples__code hide">
                      <code dangerouslySetInnerHTML={{ __html: Prism.highlight(reactExample, Prism.languages.jsx) }} />
                    </pre>
                    <pre className="examples__code hide">
                      <code dangerouslySetInnerHTML={{ __html: Prism.highlight(pretty(htmlExample), Prism.languages.html) }} />
                    </pre>
                    <pre className="examples__code hide">
                      {(component.props) ? <code dangerouslySetInnerHTML={{ __html: Prism.highlight(JSON.stringify(props, null, 4), Prism.languages.json) }} /> : ''}
                    </pre>
                    {
                      (component.type.name) ?
                        <pre className="examples__code hide">
                          {
                            (component.props) ? 
                              <code dangerouslySetInnerHTML={{ __html: Prism.highlight('// https://reactjs.net/getting-started/aspnet.html \n// when consuming JSX components directly in CSHTML \n\r @Html.React("' + component.type.name + '", new { ' + Object.keys(props).map(index => {return index + ' = Model.' + index;}) +' });', Prism.languages.clike) }} />
                                :
                              ''
                          }
                        </pre>
                          :
                        ''
                    }
                  </div>
                </Card__footer>              
              </Card>
            );
          })
        }
      </Rhythm>
      <Stylist examples={data.examples} />
    </Rhythm>
  );
};

export const Guide__blank = (props) => {
  const {
    ...attrs
  } = props;

  // Gather all atomic elements (getExamples has a handy atomicLevel prop)
  const data = GuideUtils.getExamples()[0];

  return Object.keys(data).map(index => {
    if (data[index].atomic === props.match.params.category && data[index].name === props.match.params.element) {
      return <React.Fragment key={index}>{data[index].examples[0].examples[props.match.params.id].component}</React.Fragment>;
    }
  });
  return false;
};


export const Guide__data = (props) => {
  const {
    ...attrs
  } = props;
  // tbd
  return false;
};

export default Guide__examples;
