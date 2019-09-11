import Rhythm from '@guideAtoms/Rhythm/Rhythm';
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
            <Card__body className="js-size" tagName="h2" />
          </Card>
          <Card className="tabs__trigger fall-flip">
            <Card__body className="css-size" tagName="h2" />
          </Card>
          {
            (process.env.NODE_ENV === 'development')
              ? (
                <Card className="tabs__trigger fall-flip builds">
                  <Card__body className="total-builds" tagName="h2" />
                </Card>
              )
              : <React.Fragment />
          }
          {
            (process.env.NODE_ENV === 'development')
              ? (
                <Card color="red" className="tabs__trigger fall-flip errors">
                  <Card__body className="total-errors" tagName="h2" />
                </Card>
              )
              : <React.Fragment />
          }
        </Tabs__triggers>

        <Tabs__targets>
          <div className="tabs__section">
            <Card>
              <Card__body className="atomic-js" />
            </Card>
            <Card className="chart-container">
              <Card__body>
                <canvas id="js-chart" />
              </Card__body>
            </Card>
          </div>

          <div className="tabs__section">
            <Card>
              <Card__body className="atomic-css" />
            </Card>
            <Card className="chart-container">
              <Card__body>
                <canvas id="css-chart" />
              </Card__body>
            </Card>
          </div>
        </Tabs__targets>
      </Tabs>
    </Rhythm>
  );
};

export default Metrics;
