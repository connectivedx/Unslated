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

import Form from './Form';
import Link from '@atoms/Link/Link';
import Input from '@molecules/Input/Input';
import Select from '@molecules/Select/Select';
import Textarea from '@molecules/Textarea/Textarea';
import docs from '!!docgen-loader?htmlDescription!./Form';

export default [{
  docs,
  examples: [
    {
      name: 'Form tag (with fields as realworld example)',
      component: (
        <Form legend="Use the form below to complete X task">
          <Input type="text" label="First text input example" name="first-text" align="inline-left" required={true} />
          <Input type="text" label="Second text input example" name="second-text" align="inline-left" required={true} />
          <li className="list list__item">
            <ol className="list list--blank">
              <Input type="radio" label="Yes" name="yes-no" align="inline-left" required={true} />
              <Input type="radio" label="No" name="yes-no" align="inline-left" required={true} />
            </ol>
          </li>
          <Input type="checkbox" label="Agreement" name="agree" align="inline-right" label="Please check this box to agree to terms." required={true} />
          <Select label="Inline select label text" align="inline-left" name="select" required={true} defaultValue="1">
            <option></option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Select>
          <Textarea name="textarea" label="Textarea label" rows="4" cols="50" required={true}>Hello world, this is a textarea text</Textarea>
        </Form>
      ),
      devNotes: 'Form elements come primed fieldsets, legends (for screen readers), ordered list and submit button. Submit button\'s text can be changed or compleatly overloaded by passing either text or elements to the submit prop. Legends are requried and you use them to describe the form or group of fields associated to them for screen readers. Ordered list matches up to form field molecules who are wrapped in a list item. The ordered list to list item relationship built into forms is for accessibility purposes and promotes easy tabbing experince for handicap users.'
    }
  ]
}];
