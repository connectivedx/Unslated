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

export default [{
  examples: [{
    name: 'Default Select Inputs (Stacked bottom)',
    component: (
      <Select id="select-01" label="Inline select label text" name="select" required={true} error="This field is required" defaultValue="1">
        <option value="" />
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    ),
    notes: ''
  }, {
    name: 'Select Inputs (Without label)',
    component: (
      <Select id="select-05" label={false} required={true} name="select" error="This field is required" defaultValue="1">
        <option value="" />
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    ),
    notes: ''
  }, {
    name: 'Multi-select',
    component: (
      <Select id="select-05" label="Multiple select" required={true} name="select" error="This field is required" multiple>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    ),
    notes: ''
  }]
}];
