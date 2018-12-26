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

import Modal from './Modal';
import Button from '@atoms/Button/Button';
import Link from '@atoms/Link/Link';
import Form from '@molecules/Form/Form';
import Input from '@molecules/Input/Input';
import { List, List__item } from '@atoms/List/List';
import docs from '!!docgen-loader?htmlDescription!./Modal';

export default [{
  docs,
  examples: [
    {
      name: "default (large)",
      component: (
        <div>
          <Button data-modal="my-modal-id-01">Click me</Button>
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
        </div>
      )
    }, {
      name: "small",
      component: (
        <div>
          <Button data-modal="my-modal-id-02">Click me</Button>
          <Modal data-modal="my-modal-id-02" size="small">
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
        </div>
      )
    }, {
      name: "medium",
      component: (
        <div>
          <Button data-modal="my-modal-id-03">Click me</Button>
          <Modal data-modal="my-modal-id-03" size="medium">
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
        </div>
      )
    }, {
      name: "extra large",
      component: (
        <div>
          <Button data-modal="my-modal-id-04">Click me</Button>
          <Modal data-modal="my-modal-id-04" size="extraLarge">
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
        </div>
      )
    }, {
      name: "Modal history example",
      description: 'In this example, we are going to open a second modal on top of this already open modal. Note that a history of modals is being taken care of for you, so as you close the second modal you will be taken back here to this first modal.',
      component: (
        <div>
          <Button data-modal="my-modal-id-05">Click me</Button>
          <Modal data-modal="my-modal-id-05">
            <Button data-modal="my-modal-id-02">Click me to open another modal</Button>
          </Modal>
        </div>
      )
    }
  ]
}];
