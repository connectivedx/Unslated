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
        <Heading level="h1" weight="thin">The brown fox jumps over the h1</Heading>
        <Heading level="h2" weight="thin">The brown fox jumps over the h2</Heading>
        <Heading level="h3" weight="thin">The brown fox jumps over the h3</Heading>
        <Heading level="h4" weight="thin">The brown fox jumps over the h4</Heading>
        <Heading level="h5" weight="thin">The brown fox jumps over the h5</Heading>
        <Heading level="h6" weight="thin">The brown fox jumps over the h6</Heading>
      </Rhythm>
    )
  }, {
    name: 'Medium (h1-h6)',
    component: (
      <Rhythm devonly="true">
        <Heading level="h1" weight="medium">The brown fox jumps over the h1</Heading>
        <Heading level="h2" weight="medium">The brown fox jumps over the h2</Heading>
        <Heading level="h3" weight="medium">The brown fox jumps over the h3</Heading>
        <Heading level="h4" weight="medium">The brown fox jumps over the h4</Heading>
        <Heading level="h5" weight="medium">The brown fox jumps over the h5</Heading>
        <Heading level="h6" weight="medium">The brown fox jumps over the h6</Heading>
      </Rhythm>
    )
  }, {
    name: 'Bold (h1-h6)',
    component: (
      <Rhythm devonly="true">
        <Heading level="h1" weight="bold">The brown fox jumps over the h1</Heading>
        <Heading level="h2" weight="bold">The brown fox jumps over the h2</Heading>
        <Heading level="h3" weight="bold">The brown fox jumps over the h3</Heading>
        <Heading level="h4" weight="bold">The brown fox jumps over the h4</Heading>
        <Heading level="h5" weight="bold">The brown fox jumps over the h5</Heading>
        <Heading level="h6" weight="bold">The brown fox jumps over the h6</Heading>
      </Rhythm>
    )
  }, {
    name: 'Alternative element tagName',
    component: (
      <Rhythm devonly="true">
        <Heading level="h1" tagName="div">The brown fox jumps over the h1</Heading>
        <Heading level="h2" tagName="div">The brown fox jumps over the h2</Heading>
        <Heading level="h3" tagName="div">The brown fox jumps over the h3</Heading>
        <Heading level="h4" tagName="div">The brown fox jumps over the h4</Heading>
        <Heading level="h5" tagName="div">The brown fox jumps over the h5</Heading>
        <Heading level="h6" tagName="div">The brown fox jumps over the h6</Heading>
      </Rhythm>
    )
  }]
}];
