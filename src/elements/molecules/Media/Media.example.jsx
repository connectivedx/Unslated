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

import Image from '@atoms/Image/Image';
import Heading from '@atoms/Heading/Heading';
import Rhythm from '@atoms/Rhythm/Rhythm';

import randySavage from './assets/randy-savage.jpg';
import {
  Media,
  Media__figure,
  Media__body
} from './Media';


export default [{
  examples: [{
    name: 'media to the left',
    component: (
      <Media>
        <Media__figure>
          <Image src={randySavage} alt="Randy Savage" />
        </Media__figure>

        <Media__body>
          <Rhythm size="small">
            <Heading level="h3">Randy Savage Buddy</Heading>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Rhythm>
        </Media__body>
      </Media>
    )
  }, {
    name: 'media to the right',
    component: (
      <Media>
        <Media__body>
          <Rhythm size="small">
            <Heading level="h3">Randy Savage Buddy</Heading>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Rhythm>
        </Media__body>

        <Media__figure>
          <Image src={randySavage} alt="Randy Savage" />
        </Media__figure>
      </Media>
    )
  }, {
    name: 'media align middle',
    component: (
      <Media align="middle">
        <Media__figure>
          <Image src={randySavage} alt="Randy Savage" />
        </Media__figure>

        <Media__body>
          <Rhythm size="small">
            <Heading level="h3">Randy Savage Buddy</Heading>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Rhythm>
        </Media__body>
      </Media>
    )
  }, {
    name: 'media align bottom',
    component: (
      <Media align="bottom">
        <Media__figure>
          <Image src={randySavage} alt="Randy Savage" />
        </Media__figure>

        <Media__body>
          <Rhythm size="small">
            <Heading level="h3">Randy Savage Buddy</Heading>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Rhythm>
        </Media__body>
      </Media>
    )
  }, {
    name: 'media to each side, different alignment',
    component: (
      <Media>
        <Media__figure>
          <Image src={randySavage} alt="Randy Savage" />
        </Media__figure>

        <Media__body>
          <Rhythm size="small">
            <Heading level="h3">Randy Savage Buddy</Heading>
            <p>{Utils.ipsum('paragraph', 1)}</p>
            <p>{Utils.ipsum('paragraph', 1)}</p>
          </Rhythm>
        </Media__body>

        <Media__figure align="bottom">
          <Image src={randySavage} alt="Randy Savage" />
        </Media__figure>
      </Media>
    )
  }, {
    name: 'media nested',
    component: (
      <Media>
        <Media__figure>
          <Image src={randySavage} alt="Randy Savage" />
        </Media__figure>

        <Media__figure>
          <Image src={randySavage} alt="Randy Savage" />
        </Media__figure>

        <Media__body>
          <Rhythm size="large">
            <Rhythm size="small">
              <Heading level="h3">Randy Savage Buddy</Heading>
              <p>{Utils.ipsum('paragraph', 1)}</p>
            </Rhythm>

            <Media>
              <Media__figure>
                <Image src={randySavage} alt="Randy Savage" />
              </Media__figure>

              <Media__body>
                <Rhythm size="small">
                  <Heading level="h3">Lorem ipsum dolor sit.</Heading>
                  <p>{Utils.ipsum('paragraph', 1)}</p>
                  <p>{Utils.ipsum('paragraph', 1)}</p>
                </Rhythm>
              </Media__body>
            </Media>

            <Media>
              <Media__body>
                <Rhythm size="small">
                  <Heading level="h3">Lorem ipsum dolor sit.</Heading>
                  <p>{Utils.ipsum('paragraph', 1)}</p>
                </Rhythm>
              </Media__body>

              <Media__figure>
                <Image src={randySavage} alt="Randy Savage" />
              </Media__figure>

              <Media__figure align="bottom">
                <Image src={randySavage} alt="Randy Savage" />
              </Media__figure>
            </Media>
          </Rhythm>
        </Media__body>
      </Media>
    )
  }]
}];
