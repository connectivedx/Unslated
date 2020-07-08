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
import Icon from '@atoms/Icon/Icon';
import Heading from '@atoms/Heading/Heading';
import Modal from '@molecules/Modal/Modal';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Alert from './Alert';

export default [{
  examples: [
    {
      name: 'Inline Alert',
      description: '',
      staticPath: '',
      component: (
        <React.Fragment>
          <Rhythm>
            <Heading level="h5">Inline alert example. Refresh page after closing to rerender.</Heading>
            <Alert variant="inline" className="flex flex--justify-content-between" role="alert">
              <div className="alert--inline-container" role="alertdialog">
                <Heading level="h4" weight="thin">This is an inline alert!</Heading>
              </div>
              <Button variant="icon" className="alert--close-icon" aria-label="close alert">
                <Icon name="close" />
              </Button>
            </Alert>
          </Rhythm>
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Modal Alert',
      description: '',
      staticPath: '',
      component: (
        <React.Fragment>
          <Alert>
            <Button data-modal="alert-modal-id-01">Click Me</Button>
          </Alert>
          <Modal data-modal="alert-modal-id-01" className="alert-modal-id-01" size="medium" padding="medium" role="alert">
            <Rhythm size="large" role="alertdialog">
              <Heading>Alert!!</Heading>
              <p>{Utils.ipsum('sentence', 1)}</p>
              <div className="flex flex--justify-content-end">
                <Button variant="cta">Primary Cta</Button>
                <Button>Secondary Button</Button>
              </div>
            </Rhythm>
          </Modal>
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Default styling',
      description: '',
      staticPath: '',
      component: (
        <Alert>This is an Alert!</Alert>
      ),
      notes: ''
    }
  ]
}];
