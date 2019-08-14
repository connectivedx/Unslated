/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (padding: true|false)
    - Background Image (background: path|blank)
    - Dark Background variant (brightness: 0.0-1.0)

  Example:
    ```
      examples: [{
        name: 'Default styling',
        component: (
          <Component>Lorem ipsum</Component>
        ),
        options: {
          padding: '1rem',
          background: 'path/or/url/to/image(.jpg|.gif|.png|.svg)',
          brightness: 0.5,
        }
      },
    ```
*/

import Link from '@atoms/Link/Link';
import Rhythm from '@atoms/Rhythm/Rhythm';
import { Tabs, Tabs__triggers, Tabs__targets } from './Tabs';

export default [{
  examples: [
    {
      name: 'Align top, justify left (default)',
      component: (
        <Tabs defaultTab="0">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm data-tabs-target="1">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm data-tabs-target="2">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm data-tabs-target="3">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align top, justify center',
      component: (
        <Tabs justify="center" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align top, justify right',
      component: (
        <Tabs justify="right" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align bottom, justify left',
      component: (
        <Tabs align="bottom" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align bottom, justify center',
      component: (
        <Tabs align="bottom" justify="center" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align bottom, justify right',
      component: (
        <Tabs align="bottom" justify="right" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align left, Justify Top',
      component: (
        <Tabs align="left">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align left, Justify Center',
      component: (
        <Tabs align="left" justify="center">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align left, Justify Bottom',
      component: (
        <Tabs align="left" justify="bottom">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align right, justify top',
      component: (
        <Tabs align="right">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align right, justify center',
      component: (
        <Tabs align="right" justify="center">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Align right, justify bottom',
      component: (
        <Tabs align="right" justify="bottom">
          <Tabs__triggers>
            <Link href="/#">Tab one</Link>
            <Link href="/#">Tab two</Link>
            <Link href="/#">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }
  ]
}];
