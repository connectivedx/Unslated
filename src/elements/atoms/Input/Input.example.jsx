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
import Link from '@atoms/Link/Link';
import Input from './Input';

export default [{
  examples: [
    {
      name: 'Text Input',
      component: (
        <Input label="Basic input label text" type="text" name="text-input" id="01" required={true} error="This text field is required!" />
      ),
      notes: ''
    }, {
      name: 'Text Inputs (with placeholder and no label)',
      component: (
        <Input label={false} type="text" name="text-input" id="05" placeholder="Basic placeholder" required={true} error="This text field is required!" />
      ),
      notes: ''
    }, {
      name: 'Text Inputs (with custom label)',
      component: (
        <Input label={<React.Fragment>Custom label&nbsp;<Link href="#/">with link</Link></React.Fragment>} type="text" name="text-input" id="01" required={true} error="This text field is required!" />
      ),
      notes: ''
    }, {
      name: 'Radio Inputs',
      component: (
        <Input label="Inline radio label text" type="radio" id="08" name="radio-inline-left" required={true} error="This radio field is required!" />
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
      name: 'Checkbox Inputs',
      component: (
        <Input label="Inline checkbox label text" type="checkbox" id="12" name="checkbox-input" required={true} error="This checkbox field is required!" />
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
