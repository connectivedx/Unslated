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

import { Accordion, Accordion__section } from './Accordion';
import docs from '!!docgen-loader?htmlDescription!./Accordion';

export default [{
  docs,
  examples: [
    {
      name: 'Default styling',
      component: (
        <Accordion>
          <Accordion__section title="Accordion section one">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla elit odio. Proin nec felis sit amet mi lobortis venenatis. Pellentesque porta leo in neque volutpat cursus. Fusce at urna facilisis, convallis turpis ac, vulputate eros. Cras mattis luctus dui, vel blandit est malesuada ultrices. Duis dignissim facilisis rutrum.</p>
          </Accordion__section>
          <Accordion__section title="Accordion section two">
            <p>Etiam mauris libero, porttitor ut aliquet ac, tempus vel neque. Integer venenatis dolor a sapien efficitur luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dolor lacus, auctor nec lectus quis, imperdiet laoreet metus. Quisque id tortor diam. Donec leo metus, suscipit quis accumsan commodo, suscipit aliquet velit. Sed ut semper leo.</p>
          </Accordion__section>
          <Accordion__section title="Accordion section three">
            <p>Sed eget urna sed sapien faucibus mattis. Aliquam vel mauris ullamcorper, maximus metus sed, pharetra nunc. Duis neque ligula, gravida quis massa sit amet, semper feugiat dolor. Fusce ut malesuada dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sed suscipit magna. Vivamus massa felis, consequat et massa nec, rhoncus eleifend justo.</p>
          </Accordion__section>
        </Accordion>
      ),
      devNotes: ''
    }
  ]
}];
