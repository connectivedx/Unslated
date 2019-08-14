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

import Wrapper from './Wrapper';

export default [{
  examples: [
    {
      name: 'normal wrapper',
      options: {
        noPadding: true
      },
      component: (
        <Wrapper>
          {Utils.ipsum('paragraph', 1)}
        </Wrapper>
      )
    }, {
      name: 'narrow wrapper',
      options: {
        noPadding: true
      },
      component: (
        <Wrapper size="narrow">
          {Utils.ipsum('paragraph', 1)}
        </Wrapper>
      )
    }, {
      name: 'wide wrapper',
      options: {
        noPadding: true
      },
      component: (
        <Wrapper size="wide">
          {Utils.ipsum('paragraph', 1)}
        </Wrapper>
      )
    }
  ]
}];
