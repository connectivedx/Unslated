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

import Heading from '@atoms/Heading/Heading';
import imageSrc from '@atoms/Image/assets/rancheria-falls.jpg';
import imageSrcMd from '@atoms/Image/assets/rancheria-falls-md.jpg';
import imageSrcLg from '@atoms/Image/assets/rancheria-falls-lg.jpg';
import Image from './Image';

export default [{
  examples: [
    {
      name: 'Auto inline vs. full width',
      component: (
        <React.Fragment>
          <Image
            src={imageSrc}
            variant="auto"
            alt="Rancheria Falls"
          />

          <Image
            src={imageSrc}
            variant="full"
            alt="Rancheria Falls"
          />
        </React.Fragment>
      )
    }, {
      name: 'Image srcset (uses <picture> with IE11 fallback)',
      component: (
        <Image
          src={imageSrc}
          srcSet={`${imageSrcMd} 720w, ${imageSrcLg} 1440w`}
          alt="Rancheria Falls"
          variant="full"
        />
      )
    }, {
      name: 'Image as background with color mixing',
      component: (
        <React.Fragment>
          <Image
            srcSet="https://via.placeholder.com/480 480w, https://via.placeholder.com/768x480 768w, https://via.placeholder.com/1440x640 1024w"
            backgroundSize="100%"
            backgroundColor="red"
            backgroundPosition="center"
            backgroundColorOpacity={0.2}
            alt="Background image"
          >
            <Heading level="h2">Hello World!</Heading>
            <p>{Utils.ipsum('paragraph', 2)}</p>
          </Image>

          <Image
            srcSet="https://via.placeholder.com/480 480w, https://via.placeholder.com/768x480 768w, https://via.placeholder.com/1440x640 1024w"
            backgroundSize="100%"
            backgroundColor="blue"
            backgroundColorOpacity={0.2}
            alt="Background image"
          >
            <Heading level="h2">Hello World!</Heading>
            <p>{Utils.ipsum('paragraph', 2)}</p>
          </Image>

          <Image
            srcSet="https://via.placeholder.com/480 480w, https://via.placeholder.com/768x480 768w, https://via.placeholder.com/1440x640 1024w"
            backgroundSize="100%"
            backgroundColor="green"
            backgroundColorOpacity={0.1}
            alt="Background image"
          >
            <Heading level="h2">Hello World!</Heading>
            <p>{Utils.ipsum('paragraph', 2)}</p>
          </Image>

        </React.Fragment>
      )
    }
  ]
}];
