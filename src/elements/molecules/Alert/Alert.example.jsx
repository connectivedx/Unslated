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
// import Icon from '@atoms/Icon/Icon';
import Heading from '@atoms/Heading/Heading';
import Modal from '@molecules/Modal/Modal';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Alert from './Alert';

export default [{
  examples: [
    {
      name: 'Custom Modal styling',
      description: '',
      staticPath: '',
      component: (
        <React.Fragment>
          <Button id="alert-modal-btn">Open Alert</Button>
          <Alert variant="modal">
            <div className="alert-modal alert-hidden">
              <div className="alert-modal-content">
                <Rhythm size="large">
                  <span className="alert-close-btn">&times;</span>
                  <Heading level="h3">This is an alert!</Heading>
                  <div className="flex flex--justify-content-end">
                    <Button variant="cta">Primary Cta</Button>
                    <Button>Secondary Button</Button>
                  </div>
                </Rhythm>
              </div>
            </div>
          </Alert>
        </React.Fragment>
      ),
      notes: ''
    }, {
      name: 'Modal Molecule styling',
      description: '',
      staticPath: '',
      component: (
        <React.Fragment>
          <Alert>
            <Button data-modal="alert-modal-id-01">Open Modal</Button>
          </Alert>
          <Modal data-modal="alert-modal-id-01" className="alert-modal-id-01" role="alert">
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
    // }, {
    //   name: 'Default styling',
    //   description: '',
    //   staticPath: '',
    //   component: (
    //     <Alert>This is an Alert!</Alert>
    //   ),
    //   notes: ''
    }
  ]
}];
