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
import docs from '!!docgen-loader?htmlDescription!./Textarea';

export default [{
  docs,
  examples: [
    {
      name: 'Textarea (Default stacked bottom)',
      component: (
        <Textarea id="01" label="Basic input label text" type="text" name="text-input" required={true} error="This field is required" cols="80" rows="5">
          This is my test content within a textarea.
        </Textarea>
      ),
      notes: ''
    }, {
      name: 'Textarea (Stacked top)',
      component: (
        <Textarea id="02" label="Basic input label text" type="text" name="text-input" align="top" required={true} error="This field is required" cols="80" rows="5">
          This is my test content within a textarea.
        </Textarea>
      ),
      notes: ''
    }, {
      name: 'Textarea (Inline left)',
      component: (
        <Textarea id="03" label="Inline input label text" type="text" name="text-input" align="left" required={true} error="This field is required" cols="80" rows="5">
          This is my test content within a textarea.
        </Textarea>
      ),
      notes: ''
    }, {
      name: 'Textarea (Inline right)',
      component: (
        <Textarea id="04" label="Inline input label text" type="text" name="text-input" align="right" required={true} error="This field is required" cols="80" rows="5">
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
    }, {
      name: 'Textarea (inline label)',
      component: (
        <Textarea id="06" label="Inline label" variant="inline-label" type="text" name="text-input" required={true} error="This field is required" cols="80" rows="5">
          This is my test content within a textarea.
        </Textarea>
      ),
      notes: ''
    }
  ]
}];
