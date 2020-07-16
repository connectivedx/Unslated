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
  Card__deck,
  Card__grid
} from './Card';

export default [{
  examples: [
    {
      name: 'Card & No Body',
      description: '',
      component: (
        <Card id="card-01" className="padding--small">
          <p>{Utils.ipsum('paragraph', 1)}</p>
          <p>{Utils.ipsum('paragraph', 1)}</p>
          <p>{Utils.ipsum('paragraph', 1)}</p>
        </Card>
      ),
      notes: ''
    }, {
      name: 'Card & Body',
      description: '',
      component: (
        <Card id="card-02">
          <Card__body>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Card__body>
        </Card>
      ),
      notes: ''
    }, {
      name: 'Card Header, Body & Footer',
      description: '',
      component: (
        <Card id="card-03">
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
      name: 'Card deck (Nth-up)',
      description: 'A card deck is the same as a card group, but with spacing between cards.',
      component: (
        <Card__deck>
          <Card id="card-08">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-09">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-10">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-11">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-12">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-13">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>
          <Card id="card-14">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>
        </Card__deck>
      ),
      notes: ''
    }, {
      name: 'Card grid',
      description: 'A card grid is like a deck, but begins to wrap cards after configured number (see Cards.css :root for number).',
      component: (
        <Card__grid>
          <Card id="card-15">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-16">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-17">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-18">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-19">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-20">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-21">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>

          <Card id="card-22">
            <Card__header>
              <Heading level="h5">{Utils.ipsum('word', 1)}</Heading>
            </Card__header>
            <Card__body>
              <p>{Utils.ipsum('sentence', 1)}</p>
            </Card__body>
            <Card__footer>
              <p>{Utils.ipsum('word', 1)}</p>
            </Card__footer>
          </Card>
        </Card__grid>
      ),
      notes: ''
    }
  ]
}];
