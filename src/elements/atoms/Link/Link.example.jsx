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

import Icon from '@atoms/Icon/Icon';
import Image from '@atoms/Image/Image';
import imageSrc from '@atoms/Image/assets/rancheria-falls.jpg';
import Link from './Link';

export default [{
  examples: [
    {
      name: 'Default styling',
      component: (
        <Link href="#slime">Lorem ipsum</Link>
      )
    }, {
      name: 'Cta styling',
      component: (
        <Link href="#slime" variant="cta">Click me</Link>
      )
    }, {
      name: 'Span as link',
      component: (
        <Link
          tagName="span"
          href="#slime-span"
          aria-label="Accessible name for screen readers (required)"
        >
          Span link
        </Link>
      )
    }, {
      name: 'Image as link',
      component: (
        <Link
          href="#slime-image"
          aria-label="Accessible name for screen readers"
        >
          <Image src={imageSrc} alt="" />
        </Link>
      )
    },
    {
      name: 'Icon as link',
      component: (
        <Link
          href="#/"
          variant="icon"
          aria-label="Accessible name for screen readers (required)"
        >
          <Icon name="close" ariaHidden={true} />
        </Link>
      )
    }
  ]
}];
