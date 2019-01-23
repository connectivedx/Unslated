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

import Rhythm from './Rhythm';
import docs from '!!docgen-loader?htmlDescription!./Rhythm';

const children = [
  <div key="1">abc</div>,
  <div key="2">123</div>,
  <div key="3">
    <section>9990</section>
    <div>3758</div>
    <div>2389</div>
  </div>
];


export default [{
  docs,
  examples: [
    {
      name: 'default',
      component: (
        <Rhythm>{children}</Rhythm>
      )
    }, {
      name: 'small size',
      component: (
        <Rhythm size="small">{children}</Rhythm>
      )
    }, {
      name: 'large size',
      component: (
        <Rhythm size="large">{children}</Rhythm>
      )
    }, {
      name: 'deep',
      component: (
        <Rhythm deep>{children}</Rhythm>
      )
    }, {
      name: 'size/deep',
      component: (
        <Rhythm deep size="small">{children}</Rhythm>
      )
    }, {
      name: 'size/deep/tagName/class',
      component: (
        <Rhythm tagName="section" deep size="large" className="my-custom-class">{children}</Rhythm>
      )
    }
  ]
}];
