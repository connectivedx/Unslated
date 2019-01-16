/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (noPadding: true)
    - Dark Background variant (darkBackground: true)

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

import Button from './Button';
import docs from '!!docgen-loader?htmlDescription!./Button';

export default [{
  docs,
  examples: [{
    name: 'Default styling',
    component: (
      <Button>Hello World</Button>
    )
  }, {
    name: 'Linked button',
    component: (
      <Button href="#/">Hello World</Button>
    )
  }, {
    name: 'Generic element with button styling',
    component: (
      <Button tagName="div">Hello World</Button>
    )
  }, {
    name: 'Cta styling',
    component: (
      <Button variant="cta">Hello World</Button>
    )
  }, {
    name: 'Full width styling',
    component: (
      <Button width="full">Hello World</Button>
    )
  }, {
    name: 'Linked Cta button',
    component: (
      <Button href="#/" variant="cta">Hello World</Button>
    )
  }]
}];

