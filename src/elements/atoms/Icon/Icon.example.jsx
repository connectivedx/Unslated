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
        <Icon name="close" />
      )
    }, {
      name: 'small size',
      component: (
        <Icon size="small" name="cancel" />
      )
    }, {
      name: 'large size',
      component: (
        <Icon size="large" name="plus" />
      )
    }, {
      name: 'wide custom size',
      component: (
        <Icon size="wide" name="minus" />
      )
    }, {
      name: 'light icon on dark background',
      options: {
        darkBackground: true
      },
      component: (
        <Icon name="plus" variant="light" />
      )
    }, {
      name: 'extra attribute',
      component: (
        <Icon name="plus" data-id="yoyoyo" />
      )
    }, {
      name: 'left chevron',
      component: (
        <Icon name="left" />
      )
    }
  ]
}];
