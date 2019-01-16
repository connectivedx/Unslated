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

import {{name}} from './{{name}}';
import docs from '!!docgen-loader?htmlDescription!./{{name}}';

export default [{
  docs,
  examples: [
    {
      name: 'Default styling',
      description:'',
      component: (
        <{{name}}>Lorem ipsum</{{name}}>
      ),
      notes: ''
    }
  ]
}];
