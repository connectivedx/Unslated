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
import docs from '!!docgen-loader?htmlDescription!./Select';

export default [{
  docs,
  examples: [{
    name: 'Default Select Inputs (Stacked bottom)',
    component: (
      <Select id="01" label="Inline select label text" name="select" required={true} error="This field is required" defaultValue="1">
        <option value="0" />
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    ),
    notes: ''
  }, {
    name: 'Select Inputs (Stacked top)',
    component: (
      <Select id="02" label="Inline select label text" name="select" align="top" required={true} error="This field is required" defaultValue="1">
        <option value="0" />
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    ),
    notes: ''
  }, {
    name: 'Select Inputs (Inline left)',
    component: (
      <Select id="03" label="Inline select label text" name="select" align="left" required={true} error="This field is required" defaultValue="1">
        <option value="0" />
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    ),
    notes: ''
  }, {
    name: 'Select Inputs (Inline right)',
    component: (
      <Select id="04" label="Inline select label text" name="select" align="right" required={true} error="This field is required" defaultValue="1">
        <option value="0" />
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    ),
    notes: ''
  }, {
    name: 'Select Inputs (Without label)',
    component: (
      <Select id="05" label={false} required={true} name="select" error="This field is required" defaultValue="1">
        <option value="0" />
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    ),
    notes: ''
  }]
}];
