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

import Heading from '@atoms/Heading/Heading';
import {
  Card,
  Card__header,
  Card__body,
  Card__footer,
  Card__group,
  Card__deck,
  Card__grid
} from './Card';

export default [{
  examples: [
    {
      name: 'Default styling',
      description: 'As basic a card you can get',
      component: (
        <Card>
          <Card__body>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Card__body>
        </Card>
      ),
      notes: ''
    }, {
      name: 'Card Header, Body, Footer',
      description: 'As basic a card you can get',
      component: (
        <Card>
          <Card__header>
            <Heading level="h2">Header</Heading>
          </Card__header>
          <Card__body>
            <Heading level="h3">Body</Heading>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Card__body>
          <Card__footer>
            <Heading level="h4">Footer</Heading>
          </Card__footer>
        </Card>
      ),
      notes: ''
    }, {
      name: 'Card group with card colors',
      description: 'A card group is a container for cards that layout cards horizontal with equal height and stack at mobile.',
      component: (
        <Card__group>
          <Card>
            <Card__body>
              <p>{Utils.ipsum('paragraph', 1)}</p>
            </Card__body>
          </Card>
          <Card color="red">
            <Card__body>
              <p>{Utils.ipsum('paragraph', 1)}</p>
            </Card__body>
          </Card>
          <Card color="green">
            <Card__body>
              <p>{Utils.ipsum('paragraph', 1)}</p>
            </Card__body>
          </Card>
          <Card color="blue">
            <Card__body>
              <p>{Utils.ipsum('paragraph', 1)}</p>
            </Card__body>
          </Card>
        </Card__group>
      ),
      notes: ''
    }, {
      name: 'Card deck with card colors',
      description: 'A card deck is the same as a card group, but with spacing between cards.',
      component: (
        <Card__deck>
          <Card>
            <Card__body>
              <p>{Utils.ipsum('paragraph', 1)}</p>
            </Card__body>
          </Card>
          <Card color="red">
            <Card__body>
              <p>{Utils.ipsum('paragraph', 1)}</p>
            </Card__body>
          </Card>
          <Card color="green">
            <Card__body>
              <p>{Utils.ipsum('paragraph', 1)}</p>
            </Card__body>
          </Card>
          <Card color="blue">
            <Card__body>
              <p>{Utils.ipsum('paragraph', 1)}</p>
            </Card__body>
          </Card>
        </Card__deck>
      ),
      notes: ''
    }, {
      name: 'Card grid',
      description: 'A card grid is like a desk, but begins to wrap cards after configured number (see Cards.css :root for number).',
      component: (
        <Card__grid>
          <Card>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
          </Card>
        </Card__grid>
      ),
      notes: ''
    }
  ]
}];
