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

import RichText from './RichText';

export default [{
  examples: [
    {
      name: 'default',
      component: (
        <RichText>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <p>
            {Utils.ipsum('sentence', 2)}
          </p>
          <ul>
            <li>apple</li>
            <li>grape</li>
            <li>banana</li>
          </ul>
          <ol>
            <li>Brad</li>
            <li>Anna</li>
            <li>Kim</li>
          </ol>
          <p>
            {Utils.ipsum('sentence', 5)}, <a href="#/">{Utils.ipsum('word', 3)}</a> {Utils.ipsum('sentence', 1)}
          </p>
          <button type="button">This button</button>
        </RichText>
      )
    }
  ]
}];
