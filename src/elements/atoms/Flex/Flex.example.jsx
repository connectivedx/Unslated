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

import {
  Card,
  Card__header,
  Card__body
} from '@molecules/Card/Card';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from '@atoms/Heading/Heading';
import { FlexColumn, FlexRow } from './Flex';

export default [{
  examples: [
    {
      name: 'Flex class (native behavoir)',
      description: '',
      component: (
        <FlexRow>
          <Card style={{ width: '100%' }}>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '100%' }}>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexRow>
      ),
      notes: ''
    }, {
      name: 'Flex row reverse',
      description: '',
      component: (
        <FlexRow reverse={true}>
          <Card style={{ width: '100%' }}>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '100%' }}>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexRow>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items start',
      description: '',
      component: (
        <FlexRow justify="start">
          <Card style={{ width: '25%' }}>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '25%' }}>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '25%' }}>
            <Card__header>Item Three</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexRow>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items end',
      description: '',
      component: (
        <FlexRow justify="end">
          <Card style={{ width: '25%' }}>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '25%' }}>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '25%' }}>
            <Card__header>Item Three</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexRow>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items between',
      description: '',
      component: (
        <FlexRow justify="between">
          <Card style={{ width: '30%' }}>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }}>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }}>
            <Card__header>Item Three</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexRow>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items around',
      description: '',
      component: (
        <div className="flex flex--justify-content-around">
          <Card style={{ width: '30%' }}>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }}>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }}>
            <Card__header>Item Three</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items evenly',
      description: '',
      component: (
        <div className="flex flex--justify-content-even">
          <Card style={{ width: '30%' }}>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }}>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }}>
            <Card__header>Item Three</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex column',
      description: '',
      component: (
        <FlexColumn>
          <Card>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column reverse',
      description: '',
      component: (
        <FlexColumn reverse={true}>
          <Card>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items start',
      description: '',
      component: (
        <FlexColumn justify="start" style={{ minHeight: '400px' }}>
          <Card>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Three</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items end',
      description: '',
      component: (
        <FlexColumn justify="end" style={{ minHeight: '400px' }}>
          <Card>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Three</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items between',
      description: '',
      component: (
        <FlexColumn justify="between" style={{ minHeight: '500px' }}>
          <Card>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Three</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items evenly',
      description: '',
      component: (
        <FlexColumn justify="even" style={{ minHeight: '500px' }}>
          <Card>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Three</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items around',
      description: '',
      component: (
        <FlexColumn justify="around" style={{ minHeight: '500px' }}>
          <Card>
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card>
            <Card__header>Item Three</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex and breakpoints',
      description: '',
      component: (
        <Rhythm>
          <p>The following examples show how you can define a particular breakpoint size to enable flexbox.<br /> This is useful for when you want to stack elements at mobile, but flex them at desktop:</p>
          <Heading level="h4">Small breakpoint and up</Heading>
          <FlexRow breakpoint="small">
            <Card style={{ width: '100%' }}>
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }}>
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Medium breakpoint and up</Heading>
          <FlexRow breakpoint="medium">
            <Card style={{ width: '100%' }}>
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }}>
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Large breakpoint and up</Heading>
          <FlexRow breakpoint="large">
            <Card style={{ width: '100%' }}>
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }}>
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Extra-large breakpoint and up</Heading>
          <FlexRow breakpoint="extra-large">
            <Card style={{ width: '100%' }}>
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }}>
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Small breakpoint and below</Heading>
          <FlexRow breakpoint="below-small">
            <Card style={{ width: '100%' }}>
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }}>
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Medium breakpoint and below</Heading>
          <FlexRow breakpoint="below-medium">
            <Card style={{ width: '100%' }}>
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }}>
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Large breakpoint and below</Heading>
          <FlexRow breakpoint="below-large">
            <Card style={{ width: '100%' }}>
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }}>
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Extra-large breakpoint and below</Heading>
          <FlexRow breakpoint="below-extra-large">
            <Card style={{ width: '100%' }}>
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }}>
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>
        </Rhythm>
      ),
      notes: ''
    }
  ]
}];
