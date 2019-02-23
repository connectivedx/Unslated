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

import Textarea from './Textarea';

export default [{
  examples: [
    {
      name: 'Textarea',
      component: (
        <Textarea id="01" label="Basic input label text" type="text" name="text-input" required={true} error="This field is required" cols="80" rows="5">
          This is my test content within a textarea.
        </Textarea>
      ),
      notes: ''
    }, {
      name: 'Textarea (without label)',
      component: (
        <Textarea id="05" label={false} type="text" name="text-input" required={true} error="This field is required" cols="80" rows="5">
          This is my test content within a textarea.
        </Textarea>
      ),
      notes: ''
    }
  ]
}];
