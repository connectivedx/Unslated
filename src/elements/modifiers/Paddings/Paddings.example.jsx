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

export default [{
  examples: [
    {
      name: 'Small padding',
      description: '',
      staticPath: '',
      component: (
        <div className="padding--small">{Utils.ipsum('paragraph', 2)}</div>
      ),
      notes: ''
    }, {
      name: 'Medium padding',
      description: '',
      staticPath: '',
      component: (
        <div className="padding--medium">{Utils.ipsum('paragraph', 2)}</div>
      ),
      notes: ''
    }, {
      name: 'Large padding',
      description: '',
      staticPath: '',
      component: (
        <div className="padding--large">{Utils.ipsum('paragraph', 2)}</div>
      ),
      notes: ''
    }, {
      name: 'Extra large padding',
      description: '',
      staticPath: '',
      component: (
        <div className="padding--extra-large">{Utils.ipsum('paragraph', 2)}</div>
      ),
      notes: ''
    }
  ]
}];
