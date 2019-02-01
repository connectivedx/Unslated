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
      name: 'Text Input',
      description: 'Default alignment of input bottom',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Basic input label text" type="text" name="text-input" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Text Input',
      description: 'Using top align',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Basic input label text" type="text" name="text-input" align="top" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Text Inputs',
      description: 'Using left align',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline input label text" type="text" name="text-input" align="left" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Text Inputs',
      description: 'Using right align',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline input label text" type="text" name="text-input" align="right" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Text Inputs (without label, with basic placeholder)',
      description: 'With label={false} and placeholder attribute',
      component: (
        <Form legend="Fieldset legend">
          <Input label={false} type="text" name="text-input" placeholder="Basic placeholder" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Text Inputs (with label, with basic placeholder)',
      description: 'With label={false} and placeholder attribute',
      component: (
        <Form legend="Fieldset legend">
          <Input type="text" name="text-input" label="Label inline with field" variant="inline-label" placeholder="Basic placeholder" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Text Inputs (without label, with dynamic placeholder)',
      description: 'With label={false} and placeholder attribute',
      component: (
        <Form legend="Fieldset legend">
          <Input type="text" name="text-input" variant="dynamic-placeholder" placeholder="Dynamic placeholder" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Radio Inputs',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline radio label text" type="radio" name="radio-inline-left" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Radio Inputs (Inline right)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline radio label text" type="radio" align="right" name="radio-inline-right" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Radio Inputs (Muti field / single selection)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline radio one label text" type="radio" name="multi-field-same-name" required={true} />
          <Input label="Inline radio two label text" type="radio" name="multi-field-same-name" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Checkbox Inputs (Default inline left)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline checkbox label text" type="checkbox" name="checkbox-input" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Checkbox Inputs (Inline right)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline checkbox label text" type="checkbox" name="checkbox-input" align="right" required={true} />
        </Form>
      ),
      notes: ''
    }, {
      name: 'Checkbox Inputs (Muti-field)',
      component: (
        <Form legend="Fieldset legend">
          <Input label="Inline checkbox one label text" type="checkbox" name="multi-field-one" required={true} />
          <Input label="Inline checkbox two label text" type="checkbox" name="multi-field-two" required={true} />
        </Form>
      ),
      notes: ''
    }
  ]
}];
