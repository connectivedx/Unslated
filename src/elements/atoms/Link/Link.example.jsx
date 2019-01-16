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

import Link from './Link';
import docs from '!!docgen-loader?htmlDescription!./Link';

export default [{
  docs,
  examples: [
    {
      name: 'Default styling',
      component: (
        <Link href="#slime">Lorem ipsum</Link>
      )
    }, {
      name: 'Cta styling',
      component: (
        <Link href="#slime" variant="cta">Click me</Link>
      )
    }
  ]
}];
