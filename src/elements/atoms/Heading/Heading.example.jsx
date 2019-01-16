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

import Heading from './Heading';
import docs from '!!docgen-loader?htmlDescription!./Heading';

export default [{
  docs,
  examples: [{
    name: 'default',
    component: (
      <Heading>
        Hello
      </Heading>
    )
  }, {
    name: 'tagName',
    component: (
      <Heading tagName="h3">
        Wowie Zowie
      </Heading>
    )
  }, {
    name: 'className/variant',
    component: (
      <Heading className="super" weight="medium">
        Leg Shaking
      </Heading>
    )
  }, {
    name: 'tagName/className/variant',
    component: (
      <Heading tagName="div" className="duper" level="h3" weight="thin">
        Back Breaking
      </Heading>
    )
  }]
}];
