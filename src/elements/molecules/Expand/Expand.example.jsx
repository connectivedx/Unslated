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

import Expand from './Expand';
import docs from '!!docgen-loader?htmlDescription!./Expand';

export default [{
  docs,
  examples: [
    {
      name: 'Default state (align top)',
      component: (
        <div>
          <Expand title="Toggle me" level="h5">Lorem ipsum</Expand>
        </div>
      ),
      notes: ''
    }, {
      name: 'Overloaded state (align top)',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5">Lorem ipsum</Expand>
        </div>
      ),
      notes: ''
    }, {
      name: 'Align bottom',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5" align="bottom">Lorem ipsum</Expand>
        </div>
      ),
      notes: ''
    }, {
      name: 'Align left',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5" align="left">Lorem ipsum</Expand>
        </div>
      ),
      notes: ''
    }, {
      name: 'Align right',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5" align="right">Lorem ipsum</Expand>
        </div>
      ),
      notes: ''
    }
  ]
}];
