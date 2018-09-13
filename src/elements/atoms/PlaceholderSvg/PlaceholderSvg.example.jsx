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
