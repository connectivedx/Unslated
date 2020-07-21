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

import Divider from './Divider';

export default [{
  examples: [
    {
      name: 'Default styling: horizontal, black, 2px',
      description: '',
      exports: '',
      notes: '',
      component: (
        <React.Fragment>
          <Divider />
        </React.Fragment>
      )
    }, {
      name: 'Length Variants',
      description: '',
      exports: '',
      notes: '',
      component: (
        <React.Fragment>
          <Divider />
          <Divider length="medium" />
          <Divider length="medium-small" />
          <Divider length="small" />
        </React.Fragment>
      )
    }, {
      name: 'Thickness Variants',
      description: '',
      exports: '',
      notes: '',
      component: (
        <React.Fragment>
          <Divider />
          <Divider thickness="large" />
          <Divider thickness="small" />
        </React.Fragment>
      )
    }, {
      name: 'Color Variants',
      description: '',
      exports: '',
      notes: '',
      component: (
        <React.Fragment>
          <Divider color="black" />
          <Divider color="gray" />
          <Divider color="red" />
          <Divider color="green" />
        </React.Fragment>
      )
    }, {
      name: 'Vertical Length Variant',
      description: '',
      exports: '',
      notes: '',
      component: (
        <React.Fragment>
          <div className="flex" style={{ height: '250px' }}>
            <Divider variant="vertical" />
            <Divider variant="vertical" length="medium" />
            <Divider variant="vertical" length="medium-small" />
            <Divider variant="vertical" length="small" />
          </div>
        </React.Fragment>
      )
    }, {
      name: 'Vertical Thickness Variant',
      description: '',
      exports: '',
      notes: '',
      component: (
        <React.Fragment>
          <div className="flex" style={{ height: '250px' }}>
            <Divider variant="vertical" />
            <Divider variant="vertical" thickness="small" />
            <Divider variant="vertical" thickness="large" />
          </div>
        </React.Fragment>
      )
    }, {
      name: 'Vertical Color Variant',
      description: '',
      exports: '',
      notes: '',
      component: (
        <React.Fragment>
          <div className="flex" style={{ height: '250px' }}>
            <Divider variant="vertical" />
            <Divider variant="vertical" color="gray" />
            <Divider variant="vertical" color="red" />
            <Divider variant="vertical" color="green" />
          </div>
        </React.Fragment>
      )
    }
  ]
}];
