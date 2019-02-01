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
import Form from '@molecules/Form/Form';
import docs from '!!docgen-loader?htmlDescription!./Textarea';

export default [{
  docs,
  examples: [
    {
      name: 'Textarea (Default stacked bottom)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea label="Basic input label text" type="text" name="text-input" required={true} cols="80" rows="5">
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }, {
      name: 'Textarea (Stacked top)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea label="Basic input label text" type="text" name="text-input" align="top" required={true} cols="80" rows="5">
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }, {
      name: 'Textarea (Inline left)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea label="Inline input label text" type="text" name="text-input" align="left" required={true} cols="80" rows="5">
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }, {
      name: 'Textarea (Inline right)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea label="Inline input label text" type="text" name="text-input" align="right" required={true} cols="80" rows="5">
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }, {
      name: 'Textarea (without label)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea label={false} type="text" name="text-input" required={true} cols="80" rows="5">
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }, {
      name: 'Textarea (inline label)',
      component: (
        <Form legend="Fieldset legend">
          <Textarea label="Inline label" variant="inline-label" type="text" name="text-input" required={true} cols="80" rows="5">
            This is my test content within a textarea.
          </Textarea>
        </Form>
      ),
      notes: ''
    }
  ]
}];
