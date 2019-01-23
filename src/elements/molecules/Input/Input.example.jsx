/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (padding: true|false)
    - Background Image (background: path|blank)
    - Dark Background variant (brightness: 0.0-1.0)

  Example:
    ```
      examples: [{
        name: 'Default styling',
        component: (
          <Component>Lorem ipsum</Component>
        ),
        options: {
          padding: '1rem',
          background: 'path/or/url/to/image(.jpg|.gif|.png|.svg)',
          brightness: 0.5,
        }
      },
    ```
*/

import Input from './Input';
import List from '@atoms/List/List';
import docs from '!!docgen-loader?htmlDescription!./Input';

export default [{
  docs,
  examples: [
    {
      name: 'Text Inputs (Default stacked bottom)',
      component: (
        <List devonly="true" variant="blank">
          <Input label="Basic input label text" type="text" name="text-input" required={true} />
        </List>
      ),
      notes: ''
    }, {
      name: 'Text Inputs (Stacked top)',
      component: (
        <List devonly="true" variant="blank">
          <Input label="Basic input label text" type="text" name="text-input" align="stacked-top" required={true} />
        </List>
      ),
      notes: ''
    }, {
      name: 'Text Inputs (Inline left)',
      component: (
        <List devonly="true" variant="blank">
          <Input label="Inline input label text" type="text" name="text-input" align="inline-left" required={true} />
        </List>
      ),
      notes: ''
    }, {
      name: 'Text Inputs (Inline right)',
      component: (
        <List devonly="true" variant="blank">
          <Input label="Inline input label text" type="text" name="text-input" align="inline-right" required={true} />
        </List>
      ),
      notes: ''
    }, {
      name: 'Text Inputs (without label, with placeholder)',
      component: (
        <List devonly="true" variant="blank">
          <Input label={false} type="text" name="text-input" placeholder="Labeless with placeholder" required={true} />
        </List>
      ),
      notes: ''
    }, {
      name: 'Radio Inputs (Default inline left)',
      component: (
        <List devonly="true" variant="blank">
          <Input label="Inline radio label text" type="radio" name="radio-inline-left" required={true} />
        </List>
      ),
      notes: ''
    }, {
      name: 'Radio Inputs (Inline right)',
      component: (
        <List devonly="true" variant="blank">
          <Input label="Inline radio label text" type="radio" align="inline-right" name="radio-inline-right" required={true} />
        </List>
      ),
      notes: ''
    }, {
      name: 'Radio Inputs (Muti field / single selection)',
      component: (
        <List devonly="true" variant="blank">
          <Input label="Inline radio one label text" type="radio" name="multi-field-same-name" required={true} />
          <Input label="Inline radio two label text" type="radio" name="multi-field-same-name" required={true} />
        </List>
      ),
      notes: ''
    }, {
      name: 'Checkbox Inputs (Default inline left)',
      component: (
        <List devonly="true" variant="blank">
          <Input label="Inline checkbox label text" type="checkbox" name="checkbox-input" required={true} />
        </List>
      ),
      notes: ''
    }, {
      name: 'Checkbox Inputs (Inline right)',
      component: (
        <List devonly="true" variant="blank">
          <Input label="Inline checkbox label text" type="checkbox" name="checkbox-input" align="inline-right" required={true} />
        </List>
      ),
      notes: ''
    }, {
      name: 'Checkbox Inputs (Muti-field)',
      component: (
        <List devonly="true" variant="blank">
          <Input label="Inline checkbox one label text" type="checkbox" name="multi-field-one" required={true} />
          <Input label="Inline checkbox two label text" type="checkbox" name="multi-field-two" required={true} />
        </List>
      ),
      notes: ''
    }
  ]
}];
