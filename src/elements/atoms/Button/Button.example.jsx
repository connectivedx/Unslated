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
import Rhythm from '@atoms/Rhythm/Rhythm';
import { List, List__item } from '@atoms/List/List';
import Button from './Button';

export default [{
  examples: [{
    name: 'Button style variants',
    component: (
      <React.Fragment>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Seconary Button</Button>
        <Button variant="tertiary">Tertiary Button</Button>
      </React.Fragment>
    )
  }, {
    name: 'Button size variants (relative to parent)',
    component: (
      <List tagName={Rhythm} variant="blank">
        <List__item><Button>Inline</Button></List__item>
        <List__item><Button size="small">Small</Button></List__item>
        <List__item><Button size="medium">Medium</Button></List__item>
        <List__item><Button size="large">Large</Button></List__item>
      </List>
    )
  }, {
    name: 'Button with anchor tag',
    component: (
      <Button href="#/">Link Button</Button>
    )
  }, {
    name: 'Button with foreign tag',
    component: (
      <Button tagName="div" aria-label="Specific link info for screen readers (required)">Div Button</Button>
    )
  }, {
    name: 'Toggle aria-pressed attribute',
    component: (
      <Button tagName="div" aria-pressed="false" aria-label="Specific link info for screen readers (required)">I have a pressed state.. Try me!</Button>
    )
  }, {
    name: 'Icon button',
    component: (
      <Button variant="icon" aria-label="Specific link info for screen readers (required)">
        <Icon name="close" aria-hidden="true" />
      </Button>
    )
  }]
}];
