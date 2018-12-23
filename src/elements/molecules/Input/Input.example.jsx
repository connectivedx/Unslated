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

import Input from './Input';
import Form from '@molecules/Form/Form';
import docs from '!!docgen-loader?htmlDescription!./Input';

export default [{
  docs,
  examples: [
    {
      name: 'Text Inputs (Default stacked bottom)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Basic input label text" type="text" name="text-input" required={true} />
        </Form>
      ),
      devNotes: ''
    }, {
      name: 'Text Inputs (Stacked top)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Basic input label text" type="text" name="text-input" align="stacked-top" required={true} />
        </Form>
      ),
      devNotes: ''
    }, {
      name: 'Text Inputs (Inline left)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline input label text" type="text" name="text-input" align="inline-left" required={true} />
        </Form>
      ),
      devNotes: ''
    }, {
      name: 'Text Inputs (Inline right)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline input label text" type="text" name="text-input" align="inline-right" required={true} />
        </Form>
      ),
      devNotes: ''
    }, {
      name: 'Text Inputs (without label, with placeholder)',
      component: (
        <Form legend="Fieldset legend">
          <Input name="test-name" label={false} type="text" name="text-input" placeholder="Labeless with placeholder" required={true} />
        </Form>
      ),
      devNotes: ''
    }, {
      name: 'Radio Inputs (Default inline left)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline radio label text" type="radio" name="radio-inline-left" required={true} />
        </Form>
      ),
      devNotes: ''
    }, {
      name: 'Radio Inputs (Inline right)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline radio label text" type="radio" align="inline-right" name="radio-inline-right" required={true} />
        </Form>
      ),
      devNotes: ''
    }, {
      name: 'Radio Inputs (Muti field / single selection)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline radio one label text" type="radio" name="multi-field-same-name" required={true} />
          <Input label="Inline radio two label text" type="radio" name="multi-field-same-name" required={true} />
        </Form>
      ),
      devNotes: ''
    }, {
      name: 'Checkbox Inputs (Default inline left)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline checkbox label text" type="checkbox" name="checkbox-input" required={true} />
        </Form>
      ),
      devNotes: ''
    }, {
      name: 'Checkbox Inputs (Inline right)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline checkbox label text" type="checkbox" name="checkbox-input" align="inline-right" required={true} />
        </Form>
      ),
      devNotes: ''
    }, {
      name: 'Checkbox Inputs (Muti-field)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline checkbox one label text" type="checkbox" name="multi-field-one" required={true} />
          <Input label="Inline checkbox two label text" type="checkbox" name="multi-field-two" required={true} />
        </Form>
      ),
      devNotes: ''
    }
  ]
}];
