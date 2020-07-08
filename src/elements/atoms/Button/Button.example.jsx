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

import Icon from '@atoms/Icon/Icon';
import Button from './Button';

export default [{
  examples: [{
    name: 'Default styling',
    component: (
      <Button>Hello World</Button>
    ),
    options: {
      background: '#666'
    }
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
  }, {
    name: 'Icon button',
    component: (
      <Button tagName="icon" variant="icon" aria-label="use when there's no button text">
        <Icon name="close" aria-hidden="true" focusable="false" />
      </Button>
    )
  }]
}];
