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

import Button from '@atoms/Button/Button';
import { List, List__item } from '@atoms/List/List';
import Modal from './Modal';

export default [{
  examples: [
    {
      name: 'Small Layout / Small Padding',
      description: 'A small size modal example (with small padding)',
      component: (
        <React.Fragment>
          <Button data-modal="my-modal-id-02">Click to open</Button>
          <Modal data-modal="my-modal-id-02" size="small">
            <List tagName="ul" className="list--small list--ordered list--color-light">
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
            </List>
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Medium Layout / Small Padding',
      description: 'A medium size modal example (with medium padding)',
      component: (
        <React.Fragment>
          <Button data-modal="my-modal-id-03">Click to open</Button>
          <Modal data-modal="my-modal-id-03" size="medium">
            <List tagName="ul" className="list--small list--ordered list--color-light">
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
            </List>
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Large Layout / Small Padding',
      description: 'A default modal example that has a default size of large',
      component: (
        <React.Fragment>
          <Button data-modal="my-modal-id-01">Click to open</Button>
          <Modal data-modal="my-modal-id-01" size="large">
            <List tagName="ul" className="list--small list--ordered list--color-light">
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
            </List>
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Extra Large Layout / Medium Padding',
      description: 'A large size modal example (with large padding)',
      component: (
        <React.Fragment>
          <Button data-modal="my-modal-id-04">Click to open</Button>
          <Modal data-modal="my-modal-id-04" size="extraLarge" padding="medium">
            <List tagName="ul" className="list--small list--ordered list--color-light">
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
              <List__item>
                <p>{Utils.ipsum('sentence', 1)}</p>
              </List__item>
            </List>
          </Modal>
        </React.Fragment>
      )
    }
  ]
}];
