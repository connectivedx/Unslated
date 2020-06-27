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
      name: 'Justify top, Align start (default)',
      component: (
        <Tabs align="start" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify top, Align center',
      component: (
        <Tabs align="center" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify top, Align end',
      component: (
        <Tabs align="end" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify bottom, Align start',
      component: (
        <Tabs align="start" justify="bottom" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify bottom, Align center',
      component: (
        <Tabs align="center" justify="bottom" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify bottom, Align end',
      component: (
        <Tabs align="end" justify="bottom" defaultTab="0">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify left, Align top',
      component: (
        <Tabs justify="left">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify left, Align center',
      component: (
        <Tabs justify="left" align="center">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify left, Align bottom',
      component: (
        <Tabs justify="left" align="bottom">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify right, Align top',
      component: (
        <Tabs justify="right">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify right, Align center',
      component: (
        <Tabs justify="right" align="center">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }, {
      name: 'Justify right, Align bottom',
      component: (
        <Tabs justify="right" align="bottom">
          <Tabs__triggers>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab one</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab two</Link>
            <Link href="/#" className="padding--top padding--bottom padding--small-left padding--small-right">Tab three</Link>
          </Tabs__triggers>

          <Tabs__targets>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
            <Rhythm className="padding--small">
              <p>{Utils.ipsum('paragraph', 5)}</p>
            </Rhythm>
          </Tabs__targets>
        </Tabs>
      ),
      notes: ''
    }
  ]
}];
