/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (noPadding: true)
    - Dark Background variant (darkBackground: true)

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

import Brand from './Brand';
import docs from '!!docgen-loader?htmlDescription!./Brand';

export default [{
  docs,
  examples: [{
    name: 'Default variant',
    component: (
      <Brand />
    )
  }, {
    name: 'Compact variant',
    component: (
      <Brand variant="compact" />
    )
  }]
}];
