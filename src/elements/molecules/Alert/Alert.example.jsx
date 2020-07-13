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
      name: 'Default Inline Alert',
      description: '',
      staticPath: '',
      component: (
        <React.Fragment>
          <Rhythm>
            <Heading level="h5">Inline alert example. Refresh page after closing to rerender.</Heading>
            <Alert variant="inline" className="flex flex--justify-content-between">
              <div className="alert--inline-container" role="alertdialog">
                <Heading level="h4" weight="thin">This is an inline alert!</Heading>
              </div>
              <Button variant="icon" className="alert--close-icon" aria-label="close alert">
                <Icon name="close" aria-hidden="true" />
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
          <Alert variant="modal" role="alert">
            <Button className="alert--trigger" data-modal="alert-modal-id-01">Click me to open alert modal</Button>
          </Alert>
          <Modal data-modal="alert-modal-id-01" size="medium" hasOverlayClose={false} close={false} hasEscapeClose={false} title="Alert" role="alertdialog">
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 1)}</p>
              <div className="flex alert--buttons">
                <Button className="alert--accept">Okay</Button>
                <Button className="alert--deny">Nope</Button>
              </div>
            </Rhythm>
          </Modal>
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Stored in localStorage',
      description: '',
      staticPath: '',
      component: (
        <React.Fragment>
          <Rhythm>
            <Button className="alert--restore-button" data-alert="alert-id-01">Restore alert and remove from localStorage</Button>
            <Alert
              variant="inline"
              className="flex flex--justify-content-between"
              id="alert-id-01"
              data-alert="alert-id-01"
              persistent={true}
            >
              <div className="alert--inline-container" role="alertdialog">
                <Heading level="h4" weight="thin">After you dismiss me, I'll be stored in localStorage!</Heading>
              </div>
              <Button
                variant="icon"
                className="alert--close-icon"
                aria-label="close alert"
              >
                <Icon name="close" />
              </Button>
            </Alert>
          </Rhythm>
        </React.Fragment>
      ),
      notes: ''
    }
  ]
}];
