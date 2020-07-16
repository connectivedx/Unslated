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
  Card__footer
} from './Card';

export default [{
  examples: [
    {
      name: 'Default styling',
      description: 'As basic a card you can get',
      component: (
        <Card id="card-01">
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
        <Card id="card-02">
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
    }
  ]
}];
