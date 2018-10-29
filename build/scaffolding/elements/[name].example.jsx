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
          noPadding: true,
          darkBackground: true
        }
      },
    ```
*/

import {{name}} from './{{name}}';
import docs from '!!docgen-loader?htmlDescription!./{{name}}';

export default [{
  docs,
  examples: [
    {
      name: 'Default styling',
      component: (
        <{{name}}>Lorem ipsum</{{name}}>
      ),
      devNotes: ''
    }
  ]
}];
