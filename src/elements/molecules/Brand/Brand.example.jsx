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
          noPadding: true,
          darkBackground: true
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
