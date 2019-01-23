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

import PlaceholderSvg from './PlaceholderSvg';
import docs from '!!docgen-loader?htmlDescription!./PlaceholderSvg';

export default [{
  docs,
  examples: [
    {
      name: 'Default',
      component: (
        <PlaceholderSvg />
      )
    },
    {
      name: 'With all available props passed in',
      component: (
        <PlaceholderSvg
          width={2000}
          height="600"
          fontSize="200%"
          fontFamily="monospace"
          fontWeight="normal"
          imgColor="tomato"
          textColor="bisque"
          text="I’m an SVG!"
        />
      )
    }
  ]
}];
