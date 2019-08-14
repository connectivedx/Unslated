/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (padding: true|false)
    - Background Image (background: path|blank)
    - Dark Background variant (brightness: 0.0-1.0)

  Example:
    ```
      export default [{
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

import Rhythm from '@atoms/Rhythm/Rhythm';
import Heading from './Heading';

export default [{
  examples: [{
    name: 'Light (h1-h6)',
    component: (
      <Rhythm devonly="true">
        <Heading level="h1" weight="thin">H1 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h2" weight="thin">H2 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h3" weight="thin">H3 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h4" weight="thin">H4 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h5" weight="thin">H5 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h6" weight="thin">H6 {Utils.ipsum('word', 35)}</Heading>
      </Rhythm>
    )
  }, {
    name: 'Medium (h1-h6)',
    component: (
      <Rhythm devonly="true">
        <Heading level="h1" weight="medium">H1 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h2" weight="medium">H2 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h3" weight="medium">H3 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h4" weight="medium">H4 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h5" weight="medium">H5 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h6" weight="medium">H6 {Utils.ipsum('word', 35)}</Heading>
      </Rhythm>
    )
  }, {
    name: 'Bold (h1-h6)',
    component: (
      <Rhythm devonly="true">
        <Heading level="h1" weight="bold">H1 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h2" weight="bold">H2 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h3" weight="bold">H3 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h4" weight="bold">H4 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h5" weight="bold">H5 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h6" weight="bold">H6 {Utils.ipsum('word', 35)}</Heading>
      </Rhythm>
    )
  }, {
    name: 'Alternative element tagName',
    component: (
      <Rhythm devonly="true">
        <Heading level="h1" tagName="div">H1 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h2" tagName="div">H2 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h3" tagName="div">H3 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h4" tagName="div">H4 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h5" tagName="div">H5 {Utils.ipsum('word', 35)}</Heading>
        <Heading level="h6" tagName="div">H6 {Utils.ipsum('word', 35)}</Heading>
      </Rhythm>
    )
  }]
}];
