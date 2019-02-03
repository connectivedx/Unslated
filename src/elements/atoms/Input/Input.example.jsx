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
import docs from '!!docgen-loader?htmlDescription!./Input';

export default [{
  docs,
  examples: [
    {
      name: 'Text Input',
      component: (
        <Input label="Basic input label text" type="text" name="text-input" id="01" required={true} error="This text field is required!" />
      ),
      notes: ''
    }, {
      name: 'Text Input',
      component: (
        <Input label="Basic input label text" type="text" name="text-input" id="02" align="top" required={true} error="This text field is required!" />
      ),
      notes: ''
    }, {
      name: 'Text Inputs',
      component: (
        <Input label="Inline input label text" type="text" name="text-input" id="03" align="left" required={true} error="This text field is required!" />
      ),
      notes: ''
    }, {
      name: 'Text Inputs',
      component: (
        <Input label="Inline input label text" type="text" name="text-input" id="04" align="right" required={true} error="This text field is required!" />
      ),
      notes: ''
    }, {
      name: 'Text Inputs (without label, with basic placeholder)',
      component: (
        <Input label={false} type="text" name="text-input" id="05" placeholder="Basic placeholder" required={true} error="This text field is required!" />
      ),
      notes: ''
    }, {
      name: 'Radio Inputs',
      component: (
        <Input label="Inline radio label text" type="radio" id="08" name="radio-inline-left" required={true} error="This radio field is required!" />
      ),
      notes: ''
    }, {
      name: 'Radio Inputs (Inline right)',
      component: (
        <Input label="Inline radio label text" type="radio" id="09" align="right" name="radio-inline-right" required={true} error="This radio field is required!" />
      ),
      notes: ''
    }, {
      name: 'Radio Inputs (Muti field / single selection)',
      component: (
        <React.Fragment>
          <Input label="Inline radio one label text" type="radio" id="10" name="multi-field-same-name" required={true} error="This radio field is required!" />
          <Input label="Inline radio two label text" type="radio" id="11" name="multi-field-same-name" required={true} error="This radio field is required!" />
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Checkbox Inputs (Default inline left)',
      component: (
        <Input label="Inline checkbox label text" type="checkbox" id="12" name="checkbox-input" required={true} error="This checkbox field is required!" />
      ),
      notes: ''
    }, {
      name: 'Checkbox Inputs (Inline right)',
      component: (
        <Input label="Inline checkbox label text" type="checkbox" id="13" name="checkbox-input" align="right" required={true} error="This checkbox field is required!" />
      ),
      notes: ''
    }, {
      name: 'Checkbox Inputs (Muti-field)',
      component: (
        <React.Fragment>
          <Input label="Inline checkbox one label text" type="checkbox" id="14" name="multi-field-one" required={true} error="This checkbox field is required!" />
          <Input label="Inline checkbox two label text" type="checkbox" id="15" name="multi-field-two" required={true} error="This checkbox field is required!" />
        </React.Fragment>
      ),
      notes: ''
    }
  ]
}];
