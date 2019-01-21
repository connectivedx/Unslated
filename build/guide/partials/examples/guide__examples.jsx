
import Stylist from '@guide/partials/stylist/guide__stylist';
import Readme from '@guide/partials/readme/guide__readme';

import Button from '@atoms/Button/Button';
import Heading from '@atoms/Heading/Heading';
import Rhythm from '@atoms/Rhythm/Rhythm';
import {
  Card,
  Card__header,
  Card__body,
  Card__footer
} from '@molecules/Card/Card';

import ReactDOMServer from 'react-dom/server';
import ReactElementToString from 'react-element-to-string';
import pretty from 'pretty';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-json.min';
import GuideConfig from '../../guide.config.js';

export const Guide__examples = (props) => {
  const classStack = Utils.createClassStack([
    'guide__examples'
  ]);

  // JSX Prisim Code Snips
  const getJSXPrisim = (component, data) => {
    const prisimData = ReactElementToString(component, {
      displayName: data.name,
      showDefaultProps: false
    }).replace(/<Unknown>/g, '').replace(/<\/Unknown>/g, '').trim();

    return Prism.highlight(prisimData, Prism.languages.jsx);
  };

  // Props Prisim Code Snips
  const getPropsPrisim = (component) => {
    const prisimData = {};
    Object.keys(component.props).map((i) => {
      if (i === 'children') { return false; }
      prisimData[i] = component.props[i].toString();
      return true;
    });

    return Prism.highlight(['[', JSON.stringify(prisimData, null, 4), ']'].join(''), Prism.languages.json);
  };

  // HTML Prisim Code Snips
  const getHTMLPrisim = (component) => {
    let prisimData = ReactDOMServer.renderToStaticMarkup(component);
    if (component.props.devonly === 'true') {
      prisimData = prisimData.replace(/<(.*)devonly="true">((.|\n)*)<\/(.*)>/m, '$2').trim();
    }
    return Prism.highlight(pretty(prisimData), Prism.languages.html);
  };

  // Gather data
  const data = {
    docs: undefined,
    name: undefined,
    atomic: undefined,
    examples: GuideUtils.getExamples()[0]
  };

  // C# Prisim Code Snips
  const getCSharpPrisim = (component) => [
    '// https://reactjs.net/getting-started/aspnet.html \n',
    '// when consuming JSX components directly in CSHTML \n\r',
    '@Html.React("',
    component.type.name,
    '", new { ',
    Object.keys(props).map((j) => [j, ' = Model.', j].join('')),
    ' });'
  ].join('');

  data.examples = Object.keys(data.examples).map((index) => {
    const element = data.examples[index];

    if ((element.atomic === props.match.params.category) && (element.name === props.match.params.element)) {
      data.docs = element.docs;
      data.atomic = element.atomic;
      data.name = element.name;
      return element.examples;
    }

    return false;
  }).filter((n) => n[0]);

  return (
    <Rhythm tagName="section" className={classStack}>
      <Readme docs={data.docs} />
      <Rhythm className="examples__listing">
        {
          Object.keys(data.examples[0]).map((index) => {
            const example = data.examples[0][index];

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
                    <p dangerouslySetInnerHTML={{ __html: example.description }} />
                    <div
                      className="examples__pallet"
                      style={{
                        '--speed': '0s',
                        '--brightness': options.brightness,
                        '--background': ['url(', options.background, ')'].join(''),
                        '--padding': options.padding
                      }}
                    >
                      <div className="examples__pallet-inner">
                        {example.component}
                      </div>
                    </div>
                  </Rhythm>
                </Card__body>
                <Card__footer className="examples__footer">
                  <div>
                    <Button size="small" data-index="0">React</Button>
                    <Button size="small" data-index="1">HTML</Button>
                    <Button size="small" data-index="2">Props</Button>
                    { (example.component.type.name) ? <Button size="small" data-index="3">C#</Button> : '' }
                  </div>
                  <div className="examples__codes">
                    <pre className="examples__code hide">
                      <code dangerouslySetInnerHTML={{ __html: getJSXPrisim(example.component, data) }} />
                    </pre>
                    <pre className="examples__code hide">
                      <code dangerouslySetInnerHTML={{ __html: getHTMLPrisim(example.component) }} />
                    </pre>
                    <pre className="examples__code hide">
                      {(example.component.props) ? <code dangerouslySetInnerHTML={{ __html: getPropsPrisim(example.component) }} /> : ''}
                    </pre>
                    {
                      (example.component.type.name)
                        ? (
                          <pre className="examples__code hide">
                            {
                              (example.component.props)
                                ? (
                                  <code
                                    dangerouslySetInnerHTML={{
                                      __html: Prism.highlight(getCSharpPrisim(example.component), Prism.languages.clike)
                                    }}
                                  />
                                )
                                : ''
                            }
                          </pre>
                        )
                        : ''
                    }
                  </div>
                </Card__footer>
              </Card>
            );
          })
        }
      </Rhythm>
      <Stylist examples={data.examples[0]} />
    </Rhythm>
  );
};

export default Guide__examples;
