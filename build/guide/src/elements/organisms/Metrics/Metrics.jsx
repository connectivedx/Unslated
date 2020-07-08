import Rhythm from '@guideAtoms/Rhythm/Rhythm';
import Heading from '@guideAtoms/Heading/Heading';
import Link from '@guideAtoms/Link/Link';
import {
  Tabs,
  Tabs__triggers,
  Tabs__targets
} from '@guideMolecules/Tabs/Tabs';

import {
  Card,
  Card__body
} from '@guideMolecules/Card/Card';

export const Metrics = () => {
  const classStack = Utils.createClassStack([
    'guide__metrics'
  ]);

  return (
    <Rhythm tagName="section" className={classStack}>
      <Tabs className="card__deck" defaultTab="0" align="top" variant="metrics" justify="center">
        <Tabs__triggers>
          <Card className="tabs__trigger fall-flip tabs-state--open">
            <Card__body className="jsx-size" tagName="h2" />
          </Card>
          <Card className="tabs__trigger fall-flip tabs-state--open">
            <Card__body className="js-size" tagName="h2" />
          </Card>
          <Card className="tabs__trigger fall-flip">
            <Card__body className="css-size" tagName="h2" />
          </Card>
          <Card className="tabs__trigger fall-flip">
            <Card__body className="media-size" tagName="h2" />
          </Card>
        </Tabs__triggers>

        <Tabs__targets>
          {/* JSX React */}
          <div className="tabs__section">
            <Card>
              <canvas id="jsx-chart" />
              <Card__body className="atomic-jsx" />
            </Card>
            <Card className="chart-container">
              <Card__body>
                <Heading level="h2">General JSX Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers roots" />
                  <div className="mini-numbers subs" />
                </div>

                <Heading level="h2">JSX Prop Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers props" />
                  <div className="mini-numbers strings" />
                  <div className="mini-numbers elements" />
                  <div className="mini-numbers funcs" />
                  <div className="mini-numbers nodes" />
                  <div className="mini-numbers oneOfs" />
                  <div className="mini-numbers oneOfTypes" />
                  <div className="mini-numbers isReuireds" />
                </div>

                <Heading level="h2">JSX Usage Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers used" />
                  <div className="mini-numbers used-roots" />
                  <div className="mini-numbers used-subs" />
                  <div className="mini-numbers used-atoms" />
                  <div className="mini-numbers used-molecules" />
                  <div className="mini-numbers used-organisms" />
                  <div className="mini-numbers used-templates" />
                </div>

                <Heading level="h2">JSX Example Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers examples" />
                  <div className="mini-numbers example-exported" />
                  <div className="mini-numbers example-reused" />
                  <div className="mini-numbers example-atoms" />
                  <div className="mini-numbers example-molecules" />
                  <div className="mini-numbers example-organisms" />
                  <div className="mini-numbers example-templates" />
                </div>
              </Card__body>
            </Card>
          </div>

          {/* JAVASCRIPT */}
          <div className="tabs__section">
            <Card>
              <canvas id="js-chart" />
              <Card__body className="atomic-js" />
            </Card>
            <Card className="chart-container">
              <Card__body>
                <Heading level="h2">General JS Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers variables" />
                  <div className="mini-numbers methods" />
                  <div className="mini-numbers expressions" />
                  <div className="mini-numbers loops" />
                </div>

                <Heading level="h2">Variable Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers const" />
                  <div className="mini-numbers lets" />
                </div>

                <Heading level="h2">Loop Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers for" />
                  <div className="mini-numbers forIn" />
                  <div className="mini-numbers forOf" />
                  <div className="mini-numbers while" />
                  <div className="mini-numbers object" />
                </div>

                <Heading level="h2">Method Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers functions" />
                  <div className="mini-numbers arrows" />
                </div>

                <Heading level="h2">Expression Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers calls" />
                  <div className="mini-numbers members" />
                  <div className="mini-numbers assignments" />
                </div>
              </Card__body>
            </Card>
          </div>

          {/* CSS */}
          <div className="tabs__section">
            <Card>
              <canvas id="css-chart" />
              <Card__body className="atomic-css" />
            </Card>
            <Card className="chart-container">
              <Card__body>
                <Heading level="h2">General CSS Metrics (<Link href="//developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics#Anatomy_of_a_CSS_ruleset">anatomy</Link>)</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers selectors" />
                  <div className="mini-numbers declarations" />
                  <div className="mini-numbers properties" />
                  <div className="mini-numbers ids" />
                  <div className="mini-numbers classes" />
                  <div className="mini-numbers pseudo__class" />
                  <div className="mini-numbers pseudo__element" />
                </div>

                <Heading level="h2">CSS Layout Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers display" />
                  <div className="mini-numbers float" />
                  <div className="mini-numbers width" />
                  <div className="mini-numbers height" />
                  <div className="mini-numbers maxWidth" />
                  <div className="mini-numbers minWidth" />
                  <div className="mini-numbers maxHeight" />
                  <div className="mini-numbers minHeight" />
                </div>

                <Heading level="h2">CSS Skin Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers color" />
                  <div className="mini-numbers backgroundColor" />
                  <div className="mini-numbers borderColor" />
                  <div className="mini-numbers boxShadow" />
                </div>

                <Heading level="h2">CSS Typography Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers family" />
                  <div className="mini-numbers size" />
                  <div className="mini-numbers weight" />
                  <div className="mini-numbers alignment" />
                  <div className="mini-numbers lineHeight" />
                  <div className="mini-numbers letterSpace" />
                  <div className="mini-numbers decoration" />
                  <div className="mini-numbers transform" />
                  <div className="mini-numbers shadow" />
                </div>

                <Heading level="h2">CSS Spacing Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers spacing__padding" />
                  <div className="mini-numbers spacing__padding-top" />
                  <div className="mini-numbers spacing__padding-right" />
                  <div className="mini-numbers spacing__padding-bottom" />
                  <div className="mini-numbers spacing__padding-left" />

                  <div className="mini-numbers spacing__margin" />
                  <div className="mini-numbers spacing__margin-top" />
                  <div className="mini-numbers spacing__margin-right" />
                  <div className="mini-numbers spacing__margin-bottom" />
                  <div className="mini-numbers spacing__margin-left" />
                </div>

                <Heading level="h2">CSS Reset Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers reset__padding" />
                  <div className="mini-numbers reset__padding-top" />
                  <div className="mini-numbers reset__padding-right" />
                  <div className="mini-numbers reset__padding-bottom" />
                  <div className="mini-numbers reset__padding-left" />

                  <div className="mini-numbers reset__margin" />
                  <div className="mini-numbers reset__margin-top" />
                  <div className="mini-numbers reset__margin-right" />
                  <div className="mini-numbers reset__margin-bottom" />
                  <div className="mini-numbers reset__margin-left" />
                </div>

                <Heading level="h2">CSS Comparison Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers comp__display" />
                  <div className="mini-numbers comp__float" />
                  <div className="mini-numbers comp__width" />
                  <div className="mini-numbers comp__height" />
                  <div className="mini-numbers comp__max-width" />
                  <div className="mini-numbers comp__min-width" />
                  <div className="mini-numbers comp__min-height" />
                  <div className="mini-numbers comp__max-height" />
                </div>

                <div className="flex flex--wrap">
                  <div className="mini-numbers comp__margin" />
                  <div className="mini-numbers comp__margin-top" />
                  <div className="mini-numbers comp__margin-right" />
                  <div className="mini-numbers comp__margin-bottom" />
                  <div className="mini-numbers comp__margin-left" />
                </div>

                <div className="flex flex--wrap">
                  <div className="mini-numbers comp__padding" />
                  <div className="mini-numbers comp__padding-top" />
                  <div className="mini-numbers comp__padding-right" />
                  <div className="mini-numbers comp__padding-bottom" />
                  <div className="mini-numbers comp__padding-left" />
                </div>
              </Card__body>
            </Card>
          </div>

          {/* MEDIA */}
          <div className="tabs__section">
            <Card>
              <canvas id="media-chart" />
              <Card__body className="atomic-media" />
            </Card>
            <Card className="chart-container">
              <Card__body>
                <Heading level="h2">General Media Type Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers all-media" />
                  <div className="mini-numbers jpg" />
                  <div className="mini-numbers png" />
                  <div className="mini-numbers gif" />
                  <div className="mini-numbers svg" />
                </div>

                <Heading level="h2">Media Size Metrics</Heading>
                <div className="flex flex--wrap">
                  <div className="mini-numbers jpgs" />
                  <div className="mini-numbers pngs" />
                  <div className="mini-numbers gifs" />
                  <div className="mini-numbers svgs" />
                </div>
              </Card__body>
            </Card>
          </div>
        </Tabs__targets>
      </Tabs>
    </Rhythm>
  );
};

export default Metrics;
