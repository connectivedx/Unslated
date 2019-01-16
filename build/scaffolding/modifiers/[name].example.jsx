/*
  Example:
    ```
      examples: [{
        name: 'Default styling',
        component: (
          <div className={{name}}></div>
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
      name: 'Default styling',
      description:'',
      component: (
        <div className="{{name}}">Lorem ipsum</div>
      ),
      notes: ''
    }
  ]
}];
