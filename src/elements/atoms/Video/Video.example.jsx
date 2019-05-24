/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (padding: true|false)
    - Background Image (background: path|blank)
    - Dark Background variant (brightness: 0.0-1.0)

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

import Video from './Video';

export default [{
  examples: [
    {
      name: 'Default Ratio 16:9',
      description: '',
      staticPath: '',
      component: (
        <Video src="https://www.youtube.com/embed/XSGBVzeBUbk" ratio="default" />
      ),
      notes: ''
    }, {
      name: 'Wide Ratio 21:9',
      description: '',
      staticPath: '',
      component: (
        <Video src="https://www.youtube.com/embed/XSGBVzeBUbk" ratio="wide" />
      ),
      notes: ''
    }, {
      name: 'Tall ratio 4:3',
      description: '',
      staticPath: '',
      component: (
        <Video src="https://www.youtube.com/embed/XSGBVzeBUbk" ratio="tall" />
      ),
      notes: ''
    }
  ]
}];
