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
      name: 'Border style variants',
      description: '',
      exports: '',
      notes: '',
      component: (
        <React.Fragment>
          <div className="border--gray-solid">{Utils.ipsum('words', 200)}</div>
          <div className="border--gray-dashed">{Utils.ipsum('words', 200)}</div>
          <div className="border--gray-dotted">{Utils.ipsum('words', 200)}</div>
        </React.Fragment>
      )
    }, {
      name: 'Border size variants',
      description: '',
      exports: '',
      notes: '',
      component: (
        <React.Fragment>
          <div className="border--gray-solid border--small">{Utils.ipsum('words', 200)}</div>
          <div className="border--gray-solid border--medium">{Utils.ipsum('words', 200)}</div>
          <div className="border--gray-solid border--large">{Utils.ipsum('words', 200)}</div>
          <div className="border--gray-solid border--extra-large">{Utils.ipsum('words', 200)}</div>
        </React.Fragment>
      )
    }
  ]
}];
