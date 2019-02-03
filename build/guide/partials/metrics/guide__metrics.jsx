import Rhythm from '@atoms/Rhythm/Rhythm';
import {
  Card,
  Card__body
} from '@molecules/Card/Card';

import { Tabs, Tabs__section } from '@molecules/Tabs/Tabs';

export const Guide__metrics = () => {
  const classStack = Utils.createClassStack([
    'guide__metrics'
  ]);

  return (
    <Rhythm tagName="section" className={classStack}>
      <Tabs className="card__deck" defaultTab={false}>
        <Card className="tabs__trigger fall-flip tabs-state--open" color="green">
          <Card__body className="js-size" tagName="h2" />
        </Card>
        <Tabs__section>
          <Card>
            <Card__body className="atomic-js" />
          </Card>
          <Card className="chart-container">
            <Card__body>
              <canvas id="js-chart" />
            </Card__body>
          </Card>
        </Tabs__section>

        <Card className="tabs__trigger fall-flip" color="green">
          <Card__body className="css-size" tagName="h2" />
        </Card>
        <Tabs__section>
          <Card>
            <Card__body className="atomic-css" />
          </Card>
          <Card className="chart-container">
            <Card__body>
              <canvas id="css-chart" />
            </Card__body>
          </Card>
        </Tabs__section>

        {
          (process.env.NODE_ENV === 'development')
            ? (
              <React.Fragment>
                <Card className="tabs__trigger fall-flip builds">
                  <Card__body className="total-builds" tagName="h2" />
                </Card>
                <Tabs__section />

                <Card color="red" className="tabs__trigger fall-flip errors">
                  <Card__body className="total-errors" tagName="h2" />
                </Card>
                <Tabs__section />
              </React.Fragment>
            )
            : ''
        }
      </Tabs>
    </Rhythm>
  );
};

export default Guide__metrics;
