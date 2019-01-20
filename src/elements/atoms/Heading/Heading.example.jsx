/*
  OPTIONS:
  The following options are available for Component examples:
    - No Padding variant (noPadding: true)
    - Dark Background variant (darkBackground: true)

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

import Heading from './Heading';
import Rhythm from '@atoms/Rhythm/Rhythm';
import docs from '!!docgen-loader?htmlDescription!./Heading';

export default [{
  docs,
  examples: [{
    name: 'Light (h1-h6)',
    component: (
      <React.Fragment>
        <Rhythm>
          <Heading level="h1" weight="thin">The brown fox jumps over the h1</Heading>
          <Heading level="h2" weight="thin">The brown fox jumps over the h2</Heading>
          <Heading level="h3" weight="thin">The brown fox jumps over the h3</Heading>
          <Heading level="h4" weight="thin">The brown fox jumps over the h4</Heading>
          <Heading level="h5" weight="thin">The brown fox jumps over the h5</Heading>
          <Heading level="h6" weight="thin">The brown fox jumps over the h6</Heading>
        </Rhythm>
      </React.Fragment>
    )
  }, {
    name: 'Medium (h1-h6)',
    component: (
      <React.Fragment>
        <Rhythm>
          <Heading level="h1" weight="medium">The brown fox jumps over the h1</Heading>
          <Heading level="h2" weight="medium">The brown fox jumps over the h2</Heading>
          <Heading level="h3" weight="medium">The brown fox jumps over the h3</Heading>
          <Heading level="h4" weight="medium">The brown fox jumps over the h4</Heading>
          <Heading level="h5" weight="medium">The brown fox jumps over the h5</Heading>
          <Heading level="h6" weight="medium">The brown fox jumps over the h6</Heading>
        </Rhythm>
      </React.Fragment>
    )
  }, {
    name: 'Bold (h1-h6)',
    component: (
      <React.Fragment>
        <Rhythm>
          <Heading level="h1" weight="bold">The brown fox jumps over the h1</Heading>
          <Heading level="h2" weight="bold">The brown fox jumps over the h2</Heading>
          <Heading level="h3" weight="bold">The brown fox jumps over the h3</Heading>
          <Heading level="h4" weight="bold">The brown fox jumps over the h4</Heading>
          <Heading level="h5" weight="bold">The brown fox jumps over the h5</Heading>
          <Heading level="h6" weight="bold">The brown fox jumps over the h6</Heading>
        </Rhythm>
      </React.Fragment>
    )
  }, {
    name: 'Alternative element tagName',
    component: (
      <React.Fragment>
        <Rhythm>
          <Heading level="h1" tagName="div">The brown fox jumps over the h1</Heading>
          <Heading level="h2" tagName="div">The brown fox jumps over the h2</Heading>
          <Heading level="h3" tagName="div">The brown fox jumps over the h3</Heading>
          <Heading level="h4" tagName="div">The brown fox jumps over the h4</Heading>
          <Heading level="h5" tagName="div">The brown fox jumps over the h5</Heading>
          <Heading level="h6" tagName="div">The brown fox jumps over the h6</Heading>
        </Rhythm>
      </React.Fragment>
    )
  }]
}];
