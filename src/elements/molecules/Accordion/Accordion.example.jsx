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

import { Accordion, Accordion__section } from './Accordion';

export default [{
  examples: [
    {
      name: 'Default styling',
      component: (
        <Accordion id="accordion-1">
          <Accordion__section title="Accordion section one">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section two">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section three">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
        </Accordion>
      ),
      notes: ''
    }, {
      name: 'Spread styling',
      component: (
        <Accordion variant="spread" id="accordion-2">
          <Accordion__section title="Accordion section one" level="h2">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section two">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section three">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
        </Accordion>
      ),
      notes: ''
    }, {
      name: 'Align bottom',
      component: (
        <Accordion variant="spread" id="accordion-3">
          <Accordion__section title="Accordion section one" align="bottom">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section two" align="bottom">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section three" align="bottom">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
        </Accordion>
      ),
      notes: ''
    }, {
      name: 'Disabled multiple sections',
      component: (
        <Accordion multi={false} id="accordion-4">
          <Accordion__section title="Accordion section one">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section two">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section three">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
        </Accordion>
      ),
      notes: ''
    }
  ]
}];
