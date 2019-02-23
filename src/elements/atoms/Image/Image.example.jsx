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

import imageSrc from '@atoms/Image/assets/rancheria-falls.jpg';
import imageSrcMd from '@atoms/Image/assets/rancheria-falls-md.jpg';
import imageSrcLg from '@atoms/Image/assets/rancheria-falls-lg.jpg';
import Image from './Image';

export default [{
  examples: [
    {
      name: 'Default image behavior',
      component: (
        <Image src={imageSrc} alt="Rancheria Falls" />
      )
    }, {
      name: 'Auto sizing variant',
      component: (
        <Image src={imageSrc} variant="auto" alt="Rancheria Falls" />
      )
    }, {
      name: 'Default Image with srcset',
      component: (
        <Image
          src={imageSrc}
          srcSet={`${imageSrcMd} 720w, ${imageSrcLg} 1440w`}
          variant="auto"
          alt="Rancheria Falls"
        />
      )
    }
  ]
}];
