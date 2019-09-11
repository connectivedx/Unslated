import Icon from '@guideAtoms/Icon/Icon';
import Input from '@guideAtoms/Input/Input';
import Rhythm from '@guideAtoms/Rhythm/Rhythm';
import Button from '@guideAtoms/Button/Button';
import Heading from '@guideAtoms/Heading/Heading';

import Readme from '@guideMolecules/readme/Readme';
import Stylist from '@guideMolecules/stylist/Stylist';
import {
  Card,
  Card__header,
  Card__body,
  Card__footer
} from '@guideMolecules/Card/Card';

import GuideConfig from '@guide/guide.config.js';

export const Examples = (props) => {
  const classStack = Utils.createClassStack([
    'guide__examples'
  ]);

  // const ElementToString = new reactElementToJSXString(); // eslint-disable-line
  const data = global.guide.examples[props.match.params.element];

  // JSX Prisim Code Snips
  const getJSXPrisim = (component, options) => {
    const prisimData = GuideUtils.JSXFormat(component, options)
      .replace(/<Unknown>/g, '')
      .replace(/<\/Unknown>/g, '')
      .replace(/<(.*)devonly="true">((.|\n)*)<\/(.*)>/m, '$2')
      .trim();

    return Prism.highlight(prisimData, Prism.languages.jsx, 'jsx'); // eslint-disable-line
  };

  // Props Prisim Code Snips
  const getPropsPrisim = (component) => {
    const prisimData = {};
    Object.keys(component.props).map((i) => {
      if (i === 'children') { return false; }
      prisimData[i] = component.props[i].toString();
      return true;
    });

    return Prism.highlight(`[${JSON.stringify(prisimData, null, 4)}]`, Prism.languages.json, 'javascript'); // eslint-disable-line
  };

  // HTML Prisim Code Snips
  const getHTMLPrisim = (component) => {
    let prisimData = ReactDOMServer.renderToStaticMarkup(component);
    let indent = '';
    prisimData = prisimData.replace(/></g, (x) => {
      indent += '  ';
      return x.replace('><', `>\n${indent}<`);
    }).trim();
    if (component.props.devonly === 'true') {
      prisimData = prisimData.replace(/<(.*)devonly="true">((.|\n)*)<\/(.*)>/m, '$2').trim();
    }
    prisimData = prisimData.replace(/&gt;/g, '>');
    prisimData = prisimData.replace(/&lt;/g, '<');
    prisimData = prisimData.replace(/&#x27;/g, "'");
    prisimData = prisimData.replace(/is="sly"/g, '');
    return Prism.highlight(GuideUtils.XMLFormat(prisimData), Prism.languages.html, 'html'); // eslint-disable-line
  };

  // C# Prisim Code Snips
  const getCSharpPrisim = (component) => `// https://reactjs.net/getting-started/aspnet.html\n// when consuming JSX components directly in CSHTML\n@Html.React(\n "${component.type.name}",\n  new {\n    ${Object.keys(props).map((j) => `${j} = Model.${j}`)}\n  }\n);`;

  return (
    <Rhythm tagName="section" className={classStack}>
      <Readme data={data} />
      <Rhythm className="examples__listing">
        {
          Object.keys(data.examples).map((index) => {
            const example = data.examples[index];
            const exampleConfig = GuideConfig.example.options;

            // for permalinks to examples
            const exampleName = example.name;
            const exampleNameNoSpace = exampleName.replace(/\s+/g, '');
            const exampleLink = `#${exampleNameNoSpace}`;

            const options = {
              background: exampleConfig.background,
              padding: exampleConfig.padding,
              brightness: exampleConfig.brightness
            };

            if (example.options) {
              if (typeof example.options.background !== 'undefined') {
                if (example.options.background === '') {
                  options.background = '#ffffff';
                } else {
                  options.background = example.options.background;
                }
              }

              if (
                typeof example.options.padding !== 'undefined'
              ) {
                options.padding = example.options.padding;
              }

              if (
                typeof example.options.brightness !== 'undefined'
              ) {
                options.brightness = example.options.brightness;
              }
            }

            return (
              <Card key={index} className="examples">
                <Card__header className="examples__header">
                  <a href={exampleLink} className="examples__header-jumplink">
                    <Heading level="h5" className="examples__heading" id={exampleNameNoSpace}>{exampleName} <Icon name="unlink" /></Heading>
                    <Input type="text" id={`jumplink-path-${index}`} name="jumplink-path" className="examples__header-jumplink-path" />
                  </a>
                </Card__header>
                <Card__body className="examples__body examples__item">
                  <Rhythm>
                    <p dangerouslySetInnerHTML={{ __html: example.description }} />
                    <div
                      className="examples__pallet"
                      style={{
                        '--speed': '0s',
                        '--brightness': options.brightness,
                        '--background': (
                          options.background.match('#')
                          || options.background.match('rgb')
                        ) ? options.background
                          : `url(${options.background})`,
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
                    <pre className="examples__code hidden">
                      <code dangerouslySetInnerHTML={{ __html: getJSXPrisim(example.component, { displayName: data.name, showDefaultProps: false }) }} />
                    </pre>
                    <pre className="examples__code hidden">
                      <code dangerouslySetInnerHTML={{ __html: getHTMLPrisim(example.component) }} />
                    </pre>
                    <pre className="examples__code hidden">
                      {(example.component.props) ? <code dangerouslySetInnerHTML={{ __html: getPropsPrisim(example.component) }} /> : ''}
                    </pre>
                    {
                      (example.component.type.name)
                        ? (
                          <pre className="examples__code hidden">
                            {
                              (example.component.props)
                                ? (
                                  <code
                                    dangerouslySetInnerHTML={{
                                      __html: Prism.highlight(getCSharpPrisim(example.component), Prism.languages.clike) // eslint-disable-line
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
      <Stylist data={data.examples} />
    </Rhythm>
  );
};

export default Examples;
