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

import Select from './Select';
import Form from '@molecules/Form/Form';
import docs from '!!docgen-loader?htmlDescription!./Select';

export default [{
  docs,
  examples: [{
    name: 'Default Select Inputs (Stacked bottom)',
    component: (
      <Form legend="Fieldset legend">
        <Select label="Inline select label text" name="select" required={true} defaultValue="1">
          <option></option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
      </Form>
    ),
    devNotes: ''
  }, {
    name: 'Select Inputs (Stacked top)',
    component: (
      <Form legend="Fieldset legend">
        <Select label="Inline select label text" name="select" align="stacked-top" required={true} defaultValue="1">
          <option></option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
      </Form>
    ),
    devNotes: ''
  }, {
    name: 'Select Inputs (Inline left)',
    component: (
      <Form legend="Fieldset legend">
        <Select label="Inline select label text" name="select" align="inline-left" required={true} defaultValue="1">
          <option></option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
      </Form>
    ),
    devNotes: ''
  }, {
    name: 'Select Inputs (Inline right)',
    component: (
      <Form legend="Fieldset legend">
        <Select label="Inline select label text" name="select" align="inline-right" required={true} defaultValue="1">
          <option></option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
      </Form>
    ),
    devNotes: ''
  }, {
    name: 'Select Inputs (Without label)',
    component: (
      <Form legend="Fieldset legend">
        <Select label={false} required={true} name="select" defaultValue="1">
          <option></option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Select>
      </Form>
    ),
    devNotes: ''
  }]
}];
