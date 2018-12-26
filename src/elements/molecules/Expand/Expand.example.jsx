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

import Expand from './Expand';
import docs from '!!docgen-loader?htmlDescription!./Expand';

export default [{
  docs,
  examples: [
    {
      name: 'Default state (align bottom)',
      component: (
        <div>
          <Expand title="Toggle me" level="h5">Lorem ipsum</Expand>
        </div>
      ),
      devNotes: ''
    }, {
      name: 'Overloaded state (align bottom)',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5">Lorem ipsum</Expand>
        </div>
      ),
      devNotes: ''
    }, {
      name: 'Align top',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5" align="top">Lorem ipsum</Expand>
        </div>
      ),
      devNotes: ''
    }, {
      name: 'Align left',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5" align="left">Lorem ipsum</Expand>
        </div>
      ),
      devNotes: ''
    }, {
      name: 'Align right',
      component: (
        <div>
          <Expand title="Toggle me also" defaultState="open" level="h5" align="right">Lorem ipsum</Expand>
        </div>
      ),
      devNotes: ''
    }
  ]
}];
