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

import Modal from './Modal';
import Button from '@atoms/Button/Button';
import { List, List__item } from '@atoms/List/List';
import docs from '!!docgen-loader?htmlDescription!./Modal';

export default [{
  docs,
  examples: [
    {
      name: 'Default (large size, medium padding)',
      description: 'A default modal example that has a default size of large',
      component: (
        <React.Fragment>
          <Button data-modal="my-modal-id-01">Click to open</Button>
          <Modal data-modal="my-modal-id-01">
            <List tagName="ul" className="list--small list--ordered list--color-light">
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Mauris commodo purus lectus, quis mattis lorem pulvinar sit amet. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Curabitur tincidunt leo ut sem pharetra, consequat luctus mauris semper. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sem, volutpat id justo ac, rhoncus congue nibh. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Nullam odio sem, volutpat id justo ac, rhoncus congue nibh. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Curabitur tincidunt leo ut sem pharetra, consequat luctus mauris semper. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
            </List>
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Small',
      description: 'A small size modal example (with small padding)',
      component: (
        <React.Fragment>
          <Button data-modal="my-modal-id-02">Click to open</Button>
          <Modal data-modal="my-modal-id-02" size="small" padding="small">
            <List tagName="ul" className="list--small list--ordered list--color-light">
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Mauris commodo purus lectus, quis mattis lorem pulvinar sit amet. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Curabitur tincidunt leo ut sem pharetra, consequat luctus mauris semper. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sem, volutpat id justo ac, rhoncus congue nibh. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
            </List>
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Medium',
      description: 'A medium size modal example (with medium padding)',
      component: (
        <React.Fragment>
          <Button data-modal="my-modal-id-03">Click to open</Button>
          <Modal data-modal="my-modal-id-03" size="medium" padding="medium">
            <List tagName="ul" className="list--small list--ordered list--color-light">
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Mauris commodo purus lectus, quis mattis lorem pulvinar sit amet. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Curabitur tincidunt leo ut sem pharetra, consequat luctus mauris semper. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sem, volutpat id justo ac, rhoncus congue nibh. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Nullam odio sem, volutpat id justo ac, rhoncus congue nibh. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Curabitur tincidunt leo ut sem pharetra, consequat luctus mauris semper. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
            </List>
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Extra large',
      description: 'A large size modal example (with large padding)',
      component: (
        <React.Fragment>
          <Button data-modal="my-modal-id-04">Click to open</Button>
          <Modal data-modal="my-modal-id-04" size="extraLarge" padding="large">
            <List tagName="ul" className="list--small list--ordered list--color-light">
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Mauris commodo purus lectus, quis mattis lorem pulvinar sit amet. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Curabitur tincidunt leo ut sem pharetra, consequat luctus mauris semper. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sem, volutpat id justo ac, rhoncus congue nibh. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Nullam odio sem, volutpat id justo ac, rhoncus congue nibh. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Curabitur tincidunt leo ut sem pharetra, consequat luctus mauris semper. Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
              <List__item>
                Sed eu lacinia ante. Nullam odio sem, volutpat id justo ac, rhoncus congue nibh.
              </List__item>
            </List>
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Modal history example',
      description: 'In this example, we are going to open a second modal on top of this already open modal.<br/> <strong>Note</strong> that a history of modals is being taken care of for you, so as you close the second modal you will be taken back to first modal.',
      component: (
        <React.Fragment>
          <Button data-modal="my-modal-id-05">Click to open</Button>
          <Modal data-modal="my-modal-id-05" size="medium">
            <p>Now click the button below to open another modal and main a modal history.</p>
            <Button data-modal="my-modal-id-04">Click to open another modal</Button>
          </Modal>
        </React.Fragment>
      )
    }
  ]
}];
