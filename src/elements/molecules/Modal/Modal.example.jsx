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

import Icon from '@atoms/Icon/Icon';
import Button from '@atoms/Button/Button';
import Modal from './Modal';

export default [{
  examples: [
    {
      name: 'Modal Sizes',
      description: '',
      component: (
        <React.Fragment>
          <Button data-modal="modal-01">Small Layout (click me)</Button>
          <Modal id="modal-01" size="small" title="Small modal layout example">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Modal>

          <Button data-modal="modal-02">Medium Layout (click me)</Button>
          <Modal id="modal-02" size="medium" title="Medium modal layout example">
            <p>{Utils.ipsum('paragraph', 2)}</p>
          </Modal>

          <Button data-modal="modal-03">Large Layout (click me)</Button>
          <Modal id="modal-03" size="large" title="Large modal layout example">
            <p>{Utils.ipsum('paragraph', 3)}</p>
          </Modal>

          <Button data-modal="modal-04">Extra Layout large (click me)</Button>
          <Modal id="modal-04" size="extra-large" padding="medium" title="Extra large layout example">
            <p>{Utils.ipsum('paragraph', 4)}</p>
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Modal Paddings',
      description: '',
      component: (
        <React.Fragment>
          <Button data-modal="modal-05">Small Padding (click me)</Button>
          <Modal id="modal-05" size="extra-large" padding="small" title="Small padding example">
            {Utils.ipsum('paragraph', 4)}
          </Modal>

          <Button data-modal="modal-06">Medium Padding (click me)</Button>
          <Modal id="modal-06" size="extra-large" padding="medium" title="Medium padding example">
            {Utils.ipsum('paragraph', 3)}
          </Modal>

          <Button data-modal="modal-07">Large Padding (click me)</Button>
          <Modal id="modal-07" size="extra-large" padding="large" title="Large padding example">
            {Utils.ipsum('paragraph', 2)}
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Modal custom close',
      description: '',
      component: (
        <React.Fragment>
          <Button data-modal="modal-08">Textual Close (click me)</Button>
          <Modal id="modal-08" size="small" close="Close text" title="Textual close example">
            {Utils.ipsum('paragraph', 1)}
          </Modal>

          <Button data-modal="modal-09">Icon Close (click me)</Button>
          <Modal id="modal-09" size="small" close={<Icon name="down" label="Modal close icon" />} title="Icon close example">
            {Utils.ipsum('paragraph', 1)}
          </Modal>

          <Button data-modal="modal-10">Elemental Close (click me)</Button>
          <Modal
            id="modal-10"
            size="small"
            close={<span style={{ backgroundColor: '#999', color: '#fff', padding: '0.25rem' }}>Close element</span>}
            title="Elemental close example"
          >
            {Utils.ipsum('paragraph', 1)}
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Close Disabling',
      description: '',
      component: (
        <React.Fragment>
          <Button data-modal="modal-11">Disable Esc Close (click me)</Button>
          <Modal id="modal-11" size="small" hasEscapeClose={false} title="Disabled Esc example">
            {Utils.ipsum('paragraph', 1)}
          </Modal>

          <Button data-modal="modal-12">Disable Esc & Overlay Close (click me)</Button>
          <Modal id="modal-12" size="small" hasEscapeClose={false} hasOverlayClose={false} title="Disabled Esc & overlay example">
            {Utils.ipsum('paragraph', 1)}
          </Modal>

          <Button data-modal="modal-13">Disable Overlay Close & Close Button (click me)</Button>
          <Modal id="modal-13" size="small" hasOverlayClose={false} close={false} title="Disabled overlay & close example (hint: press esc)">
            {Utils.ipsum('paragraph', 1)}
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Disabling Overlay',
      description: '',
      component: (
        <React.Fragment>
          <Button data-modal="modal-14">Disable Overlay (click me)</Button>
          <Modal id="modal-14" size="small" hasOverlay={false} title="Disabled overlay example">
            {Utils.ipsum('paragraph', 1)}
          </Modal>

          <Button data-modal="modal-15">Disable Overlay & Overlay Close (click me)</Button>
          <Modal id="modal-15" size="small" hasOverlayClose={false} hasOverlay={false} title="Disabled overlay & overlay close">
            {Utils.ipsum('paragraph', 1)}
          </Modal>
        </React.Fragment>
      )
    }, {
      name: 'Hide Title',
      description: '',
      component: (
        <React.Fragment>
          <Button data-modal="modal-16">Simple Modal without title</Button>
          <Modal id="modal-16" size="small" hideTitle={true} title="Disabled overlay example">
            {Utils.ipsum('paragraph', 3)}
          </Modal>
        </React.Fragment>
      )
    }
  ]
}];
