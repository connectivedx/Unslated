/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (padding: true|false)
    - Background Image (background: path|blank)
    - Dark Background variant (brightness: 0.0-1.0)

  Example:
    ```
      export default [{
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

import Icon from './Icon';

export default [{
  examples: [
    {
      name: 'default',
      component: (
        <Icon name="close" label="Close icon" />
      )
    }, {
      name: 'small size',
      component: (
        <Icon size="small" name="cancel" label="Cancel icon" />
      )
    }, {
      name: 'large size',
      component: (
        <Icon size="large" name="plus" label="Plus icon" />
      )
    }, {
      name: 'wide custom size',
      component: (
        <Icon size="wide" name="minus" label="Minus icon" />
      )
    }, {
      name: 'light icon on dark background',
      options: {
        brightness: 0.5
      },
      component: (
        <Icon name="plus" variant="light" label="Plus icon" />
      )
    }, {
      name: 'extra attribute',
      component: (
        <Icon name="plus" data-id="yoyoyo" label="Plus icon" />
      )
    }, {
      name: 'hidden from screen readers',
      component: (
        <Icon name="plus" ariaHidden={true} label="Plus icon" />
      )
    }, {
      name: 'left chevron',
      component: (
        <Icon name="left" label="Left chevron" />
      )
    }
  ]
}];
