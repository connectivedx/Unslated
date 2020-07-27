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
import { FlexColumn, FlexRow } from './Flex';

export default [{
  examples: [
    {
      name: 'Flex class (native behavoir)',
      description: '',
      component: (
        <FlexRow>
          <div style={{ width: '100%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '100%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexRow>
      ),
      notes: ''
    }, {
      name: 'Flex row reverse',
      description: '',
      component: (
        <FlexRow reverse={true}>
          <div style={{ width: '100%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '100%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexRow>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items start',
      description: '',
      component: (
        <FlexRow justify="start">
          <div style={{ width: '25%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '25%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '25%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Three</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexRow>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items end',
      description: '',
      component: (
        <FlexRow justify="end">
          <div style={{ width: '25%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '25%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '25%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Three</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexRow>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items between',
      description: '',
      component: (
        <FlexRow justify="between">
          <div style={{ width: '30%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '30%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '30%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Three</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexRow>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items around',
      description: '',
      component: (
        <div className="flex flex--justify-content-around">
          <div style={{ width: '30%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '30%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '30%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Three</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items evenly',
      description: '',
      component: (
        <div className="flex flex--justify-content-even">
          <div style={{ width: '30%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '30%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div style={{ width: '30%' }} className="border--gray-solid padding--small">
            <Heading level="h2">Item Three</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex column',
      description: '',
      component: (
        <FlexColumn>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column reverse',
      description: '',
      component: (
        <FlexColumn reverse={true}>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items start',
      description: '',
      component: (
        <FlexColumn justify="start" style={{ minHeight: '400px' }}>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Three</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items end',
      description: '',
      component: (
        <FlexColumn justify="end" style={{ minHeight: '400px' }}>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Three</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items between',
      description: '',
      component: (
        <FlexColumn justify="between" style={{ minHeight: '500px' }}>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Three</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items evenly',
      description: '',
      component: (
        <FlexColumn justify="even" style={{ minHeight: '500px' }}>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Three</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexColumn>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items around',
      description: '',
      component: (
        <FlexColumn justify="around" style={{ minHeight: '500px' }}>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item One</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Two</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
          <div className="border--gray-solid padding--small">
            <Heading level="h2">Item Three</Heading>
            <p>{Utils.ipsum('word', 40)}</p>
          </div>
        </FlexColumn>
      ),
      notes: ''
    }
  ]
}];
