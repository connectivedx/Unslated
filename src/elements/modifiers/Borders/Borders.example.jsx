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
import { FlexRow } from '@atoms/Flex/Flex';

export default [{
  examples: [
    {
      name: 'Border style variants',
      description: '',
      exports: '',
      notes: '',
      component: (
        <FlexRow justify="around">
          <div
            style={{ width: '30%' }}
            className="
              border--solid
              border--small
              border--gray
              padding--small
            "
          >
            {Utils.ipsum('words', 50)}
          </div>
          <div
            style={{ width: '30%' }}
            className="
              border--dashed
              border--small
              border--gray
              padding--small
            "
          >
            {Utils.ipsum('words', 50)}
          </div>
          <div
            style={{ width: '30%' }}
            className="
              border--dotted
              border--small
              border--gray
              padding--small
            "
          >
            {Utils.ipsum('words', 50)}
          </div>
        </FlexRow>
      )
    }, {
      name: 'Border size variants',
      description: '',
      exports: '',
      notes: '',
      component: (
        <FlexRow justify="around">
          <div
            style={{ width: '20%' }}
            className="
              border--gray-dark
              border--dotted
              border--small
              padding--small
            "
          >
            {Utils.ipsum('words', 50)}
          </div>
          <div
            style={{ width: '20%' }}
            className="
              border--gray-dark
              border--dotted
              border--medium
              padding--small
            "
          >
            {Utils.ipsum('words', 50)}
          </div>
          <div
            style={{ width: '20%' }}
            className="
              border--gray-dark
              border--dotted
              border--large
              padding--small
            "
          >
            {Utils.ipsum('words', 50)}
          </div>
          <div
            style={{ width: '20%' }}
            className="
              border--gray-dark
              border--dotted
              border--extra-large
              padding--small
            "
          >
            {Utils.ipsum('words', 50)}
          </div>
        </FlexRow>
      )
    }
  ]
}];
