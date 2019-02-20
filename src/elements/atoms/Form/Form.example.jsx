/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (padding: true|false)
    - Background Image (background: path|blank)
    - Dark Background variant (brightness: 0.0-1.0)

  Example:
    ```
      export default [{
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

import Fieldset from '@atoms/Fieldset/Fieldset';
import Button from '@atoms/Button/Button';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Input from '@atoms/Input/Input';
import Select from '@atoms/Select/Select';
import Textarea from '@atoms/Textarea/Textarea';
import List from '@atoms/List/List';
import Form from './Form';

export default [{
  examples: [
    {
      name: 'Basic form example',
      component: (
        <Form action="#/" method="post">
          <Fieldset legend="Use the form below as an example on how to construct forms">
            <Rhythm tagName="ol">
              <Input tagName="li" type="text" id="01" label="First text input example" name="first-text" required={true} />
              <Input tagName="li" type="text" id="02" label="Second text input example" name="second-text" required={true} />
              <List variant="blank">
                <Fieldset legend="Yes or no?" legendHide={false}>
                  <Input type="radio" id="03" label="Yes" name="yes-no" required={true} />
                  <Input type="radio" id="04" label="No" name="yes-no" required={true} />
                </Fieldset>
              </List>
              <Input tagName="li" type="checkbox" id="05" name="agree" label="Please check this box to agree to terms." required={true} />
              <Select tagName="li" label="Inline select label text" id="06" name="select" required={true} defaultValue="0">
                <option value="0" />
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Select>
              <Textarea tagName="li" name="textarea" label="Textarea label" id="07" rows="4" cols="50" required={true} />
              <li>
                <Button type="submit">Submit</Button>
              </li>
            </Rhythm>
          </Fieldset>
        </Form>
      ),
      options: {
        background: ''
      }
    }, {
      name: 'XHR form example',
      component: (
        <Form xaction="#/" method="get">
          <Fieldset legend="Use the form below as an example on how to construct forms">
            <Rhythm tagName="ol">
              <Input tagName="li" type="text" id="01" label="First text input example" name="first-text" required={true} />
              <Input tagName="li" type="text" id="02" label="Second text input example" name="second-text" required={true} />
              <li>
                <Button type="submit">Submit</Button>
              </li>
            </Rhythm>
          </Fieldset>
        </Form>
      ),
      options: {
        background: ''
      }
    }
  ]
}];
