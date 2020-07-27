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
          <Card style={{ width: '100%' }} id="flex-01">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '100%' }} id="flex-02">
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
          <Card style={{ width: '100%' }} id="flex-03">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '100%' }} id="flex-04">
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
          <Card style={{ width: '25%' }} id="flex-05">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '25%' }} id="flex-06">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '25%' }} id="flex-07">
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
          <Card style={{ width: '25%' }} id="flex-08">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '25%' }} id="flex-09">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '25%' }} id="flex-10">
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
          <Card style={{ width: '30%' }} id="flex-11">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }} id="flex-12">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }} id="flex-13">
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
          <Card style={{ width: '30%' }} id="flex-14">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }} id="flex-15">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }} id="flex-16">
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
          <Card style={{ width: '30%' }} id="flex-17">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }} id="flex-18">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card style={{ width: '30%' }} id="flex-19">
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
          <Card id="flex-20">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-21">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-22">
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
          <Card id="flex-23">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-24">
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
          <Card id="flex-25">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-26">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-27">
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
          <Card id="flex-28">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-29">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-30">
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
          <Card id="flex-31">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-32">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-33">
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
          <Card id="flex-35">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-36">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-37">
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
          <Card id="flex-38">
            <Card__header>Item One</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-39">
            <Card__header>Item Two</Card__header>
            <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
          </Card>
          <Card id="flex-40">
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
            <Card style={{ width: '100%' }} id="flex-41">
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }} id="flex-42">
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Medium breakpoint and up</Heading>
          <FlexRow breakpoint="medium">
            <Card style={{ width: '100%' }} id="flex-43">
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }} id="flex-44">
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Large breakpoint and up</Heading>
          <FlexRow breakpoint="large">
            <Card style={{ width: '100%' }} id="flex-45">
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }} id="flex-46">
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Extra-large breakpoint and up</Heading>
          <FlexRow breakpoint="extra-large">
            <Card style={{ width: '100%' }} id="flex-47">
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }} id="flex-48">
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Small breakpoint and below</Heading>
          <FlexRow breakpoint="below-small">
            <Card style={{ width: '100%' }} id="flex-49">
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }} id="flex-50">
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Medium breakpoint and below</Heading>
          <FlexRow breakpoint="below-medium">
            <Card style={{ width: '100%' }} id="flex-51">
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }} id="flex-52">
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Large breakpoint and below</Heading>
          <FlexRow breakpoint="below-large">
            <Card style={{ width: '100%' }} id="flex-53">
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }} id="flex-54">
              <Card__header>Item Two</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
          </FlexRow>

          <Heading level="h4">Extra-large breakpoint and below</Heading>
          <FlexRow breakpoint="below-extra-large">
            <Card style={{ width: '100%' }} id="flex-55">
              <Card__header>Item One</Card__header>
              <Card__body><p>{Utils.ipsum('word', 40)}</p></Card__body>
            </Card>
            <Card style={{ width: '100%' }} id="flex-56">
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
