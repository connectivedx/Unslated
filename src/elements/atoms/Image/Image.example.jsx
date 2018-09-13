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
          noPadding: true,
          darkBackground: true
        }
      },
    ```
*/

import Image from './Image';
import imageSrc from '@atoms/Image/assets/rancheria-falls.jpg';
import imageSrcMd from '@atoms/Image/assets/rancheria-falls-md.jpg';
import imageSrcLg from '@atoms/Image/assets/rancheria-falls-lg.jpg';
import docs from '!!docgen-loader?htmlDescription!./Image';

export default [{
  docs,
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
