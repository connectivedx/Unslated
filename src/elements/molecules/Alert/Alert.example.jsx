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
import Heading from '@atoms/Heading/Heading';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Alert from './Alert';

export default [{
  examples: [
    {
      name: 'Default Inline Alerts',
      description: '',
      staticPath: '',
      component: (
        <Rhythm>
          <Alert variant="default">
            <Heading level="h4" weight="thin">Inline default style variant example!</Heading>
          </Alert>

          <Alert variant="error">
            <Heading level="h4" weight="thin">Inline error style variant example!</Heading>
          </Alert>

          <Alert variant="success">
            <Heading level="h4" weight="thin">Inline success style variant example!</Heading>
          </Alert>

          <Alert variant="warning">
            <Heading level="h4" weight="thin">Inline warning style variant example!</Heading>
          </Alert>
        </Rhythm>
      ),
      notes: ''
    }, {
      name: 'Store state and persistently hide',
      description: '',
      staticPath: '',
      component: (
        <Rhythm>
          <Alert
            className="flex flex--justify-content-between"
            persistent={true}
            id="unslated-alert-demo"
            variant="warning"
          >
            <div>
              <Heading level="h4" weight="thin">
                After you dismiss me, my state is stored in localStorage and I'm persitently hidden.<br />
                Id attribute is required! Used to store the alert state in localStorage.
              </Heading>
            </div>
          </Alert>
        </Rhythm>
      ),
      notes: ''
    }, {
      name: 'Modal Alert',
      description: '',
      staticPath: '',
      component: (
        <React.Fragment>
          <p>You seen me at page load!</p>
          <Alert
            type="modal"
            title="Alert modal example"
            close={false}
            hasEscapeClose={false}
            hasOverlayClose={false}
          >
            <Rhythm>
              <p>{Utils.ipsum('paragraph', 4)}</p>
              <div className="flex flex--justify-content-end alert--buttons">
                <Button className="alert--accept">Okay</Button>
                <Button className="alert--deny">Nope</Button>
              </div>
            </Rhythm>
          </Alert>
        </React.Fragment>
      ),
      notes: ''
    }
  ]
}];
