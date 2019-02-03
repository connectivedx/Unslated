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

import Fieldset from './Fieldset';
import Input from '@atoms/Input/Input';
import List from '@atoms/List/List';
import docs from '!!docgen-loader?htmlDescription!./Fieldset';

export default [{
  docs,
  examples: [
    {
      name: 'Legend hidden',
      description: '',
      component: (
        <Fieldset legend="This is a fieldset legend">
          <List tagName="ol">
            <Input tagName="li" type="radio" label="yes" id="example1-answer-yes" name="yes-no-01" value="yes" />
            <Input tagName="li" type="radio" label="no" id="example1-answer-yes" name="yes-no-01" value="no" />
          </List>
        </Fieldset>
      ),
      notes: ''
    }, {
      name: 'Legend visible',
      description: '',
      component: (
        <Fieldset legend="This is a fieldset legend" legendHide={false}>
          <List tagName="ol">
            <Input tagName="li" type="radio" label="yes" id="example2-answer-yes" name="yes-no-02" value="yes" />
            <Input tagName="li" type="radio" label="no" id="example2-answer-no" name="yes-no-02" value="no" />
          </List>
        </Fieldset>
      ),
      notes: ''
    }
  ]
}];
