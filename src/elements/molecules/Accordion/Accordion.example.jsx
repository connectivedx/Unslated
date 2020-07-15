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
        <Accordion>
          <Accordion__section title="Accordion section one" id="accordion-1">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section two" id="accordion-2">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section three" id="accordion-3">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
        </Accordion>
      ),
      notes: ''
    }, {
      name: 'Spread styling',
      component: (
        <Accordion variant="spread">
          <Accordion__section title="Accordion section one" id="accordion-4">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section two" id="accordion-5">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section three" id="accordion-6">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
        </Accordion>
      ),
      notes: ''
    }, {
      name: 'Align bottom',
      component: (
        <Accordion variant="spread">
          <Accordion__section title="Accordion section one" align="bottom" id="accordion-7">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section two" align="bottom" id="accordion-8">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section three" align="bottom" id="accordion-9">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
        </Accordion>
      ),
      notes: ''
    }, {
      name: 'Disabled multiple sections',
      component: (
        <Accordion multi={false}>
          <Accordion__section title="Accordion section one" id="accordion-10">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section two" id="accordion-11">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
          <Accordion__section title="Accordion section three" id="accordion-12">
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Accordion__section>
        </Accordion>
      ),
      notes: ''
    }
  ]
}];
