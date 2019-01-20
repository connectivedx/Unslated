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

import {
  Card,
  Card__header,
  Card__body,
  Card__footer,
  Card__group,
  Card__deck,
  Card__grid
} from './Card';
import Heading from '@atoms/Heading/Heading';
import docs from '!!docgen-loader?htmlDescription!./Card';

export default [{
  docs,
  examples: [
    {
      name: 'Default styling',
      description: 'As basic a card you can get',
      component: (
        <Card>
          <Card__body>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus enim. Donec molestie euismod velit, id fringilla purus fermentum id. Nullam ultricies pretium lacus sit amet rhoncus. Aliquam non turpis elit. Maecenas ornare libero non scelerisque tempus. Pellentesque efficitur enim turpis, euismod iaculis nibh tristique ac. Nullam molestie tortor a lorem auctor, vitae placerat velit eleifend. Fusce tempus ultrices dui, sed commodo enim viverra sit amet. Praesent elementum elit non sem dignissim congue. Sed lacinia vestibulum mi id ornare. Donec rhoncus molestie mi a vestibulum. Vestibulum ultrices finibus magna, nec semper dolor. Ut posuere aliquet purus at sagittis. Aliquam mattis semper semper.</p>
            <p>Cras rutrum est dolor, vel placerat magna consectetur et. Integer at faucibus nibh. Ut semper pharetra tortor, dictum consequat arcu porta quis. Donec metus justo, placerat nec sollicitudin id, bibendum sed lorem. Donec diam mi, ullamcorper eu tellus sed, dignissim eleifend tellus. Morbi suscipit ex non neque varius, nec cursus libero tempus. Donec laoreet accumsan odio vel venenatis. Duis convallis lectus nec tempus finibus. Vestibulum diam justo, laoreet ac posuere et, faucibus eu lacus. Donec vel rutrum metus, ut tempus augue.</p>
            <p>Integer tempus tellus risus, quis lobortis felis dictum quis. Integer rutrum nisi quis semper laoreet. Aenean sit amet pellentesque odio. Cras vehicula eros sit amet placerat dignissim. Morbi faucibus et mauris vitae imperdiet. Praesent rhoncus ut urna in venenatis. Curabitur sed tortor orci. Integer dapibus rhoncus cursus. Morbi sit amet libero a est ultrices pretium vitae eget purus. Sed pulvinar ligula nulla, non fermentum nibh tempus nec. Cras nibh leo, euismod ac porttitor non, feugiat sed orci. Sed ac enim libero. Phasellus lorem justo, ullamcorper pulvinar sapien sit amet, pulvinar porta ex. Nulla facilisi. Aliquam nec pellentesque mi. Fusce et nunc mauris.</p>
          </Card__body>
        </Card>
      ),
      notes: ''
    }, {
      name: 'Card Header, Body, Footer',
      description: 'As basic a card you can get',
      component: (
        <Card>
          <Card__header>
            <Heading level="h2">Header</Heading>
          </Card__header>
          <Card__body>
            <Heading level="h3">Body</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus enim. Donec molestie euismod velit, id fringilla purus fermentum id. Nullam ultricies pretium lacus sit amet rhoncus. Aliquam non turpis elit. Maecenas ornare libero non scelerisque tempus. Pellentesque efficitur enim turpis, euismod iaculis nibh tristique ac. Nullam molestie tortor a lorem auctor, vitae placerat velit eleifend. Fusce tempus ultrices dui, sed commodo enim viverra sit amet. Praesent elementum elit non sem dignissim congue. Sed lacinia vestibulum mi id ornare. Donec rhoncus molestie mi a vestibulum. Vestibulum ultrices finibus magna, nec semper dolor. Ut posuere aliquet purus at sagittis. Aliquam mattis semper semper.</p>
            <p>Cras rutrum est dolor, vel placerat magna consectetur et. Integer at faucibus nibh. Ut semper pharetra tortor, dictum consequat arcu porta quis. Donec metus justo, placerat nec sollicitudin id, bibendum sed lorem. Donec diam mi, ullamcorper eu tellus sed, dignissim eleifend tellus. Morbi suscipit ex non neque varius, nec cursus libero tempus. Donec laoreet accumsan odio vel venenatis. Duis convallis lectus nec tempus finibus. Vestibulum diam justo, laoreet ac posuere et, faucibus eu lacus. Donec vel rutrum metus, ut tempus augue.</p>
            <p>Integer tempus tellus risus, quis lobortis felis dictum quis. Integer rutrum nisi quis semper laoreet. Aenean sit amet pellentesque odio. Cras vehicula eros sit amet placerat dignissim. Morbi faucibus et mauris vitae imperdiet. Praesent rhoncus ut urna in venenatis. Curabitur sed tortor orci. Integer dapibus rhoncus cursus. Morbi sit amet libero a est ultrices pretium vitae eget purus. Sed pulvinar ligula nulla, non fermentum nibh tempus nec. Cras nibh leo, euismod ac porttitor non, feugiat sed orci. Sed ac enim libero. Phasellus lorem justo, ullamcorper pulvinar sapien sit amet, pulvinar porta ex. Nulla facilisi. Aliquam nec pellentesque mi. Fusce et nunc mauris.</p>
          </Card__body>
          <Card__footer>
            <Heading level="h4">Footer</Heading>
          </Card__footer>
        </Card>
      ),
      notes: ''
    }, {
      name: 'Card group with card colors',
      description: 'A card group is a container for cards that layout cards horizontal with equal height and stack at mobile.',
      component: (
        <Card__group>
          <Card>
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus enim. Donec molestie euismod velit, id fringilla purus fermentum id. Nullam ultricies pretium lacus sit amet rhoncus. Aliquam non turpis elit. Maecenas ornare libero non scelerisque tempus. Pellentesque efficitur enim turpis, euismod iaculis nibh tristique ac. Nullam molestie tortor a lorem auctor, vitae placerat velit eleifend. Fusce tempus ultrices dui, sed commodo enim viverra sit amet. Praesent elementum elit non sem dignissim congue. Sed lacinia vestibulum mi id ornare. Donec rhoncus molestie mi a vestibulum. Vestibulum ultrices finibus magna, nec semper dolor. Ut posuere aliquet purus at sagittis. Aliquam mattis semper semper.</p>
            </Card__body>
          </Card>
          <Card color="red">
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus enim. Donec molestie euismod velit, id fringilla purus fermentum id. Nullam ultricies pretium lacus sit amet rhoncus. Aliquam non turpis elit. Maecenas ornare libero non scelerisque tempus. Pellentesque efficitur enim turpis, euismod iaculis nibh tristique ac. Nullam molestie tortor a lorem auctor, vitae placerat velit eleifend. Fusce tempus ultrices dui, sed commodo enim viverra sit amet. Praesent elementum elit non sem dignissim congue. Sed lacinia vestibulum mi id ornare. Donec rhoncus molestie mi a vestibulum. Vestibulum ultrices finibus magna, nec semper dolor. Ut posuere aliquet purus at sagittis. Aliquam mattis semper semper.</p>
            </Card__body>
          </Card>
          <Card color="green">
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus enim. Donec molestie euismod velit, id fringilla purus fermentum id. Nullam ultricies pretium lacus sit amet rhoncus. Aliquam non turpis elit. Maecenas ornare libero non scelerisque tempus. Pellentesque efficitur enim turpis, euismod iaculis nibh tristique ac. Nullam molestie tortor a lorem auctor, vitae placerat velit eleifend. Fusce tempus ultrices dui, sed commodo enim viverra sit amet. Praesent elementum elit non sem dignissim congue. Sed lacinia vestibulum mi id ornare. Donec rhoncus molestie mi a vestibulum. Vestibulum ultrices finibus magna, nec semper dolor. Ut posuere aliquet purus at sagittis. Aliquam mattis semper semper.</p>
            </Card__body>
          </Card>
          <Card color="blue">
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus enim. Donec molestie euismod velit, id fringilla purus fermentum id. Nullam ultricies pretium lacus sit amet rhoncus. Aliquam non turpis elit. Maecenas ornare libero non scelerisque tempus. Pellentesque efficitur enim turpis, euismod iaculis nibh tristique ac. Nullam molestie tortor a lorem auctor, vitae placerat velit eleifend. Fusce tempus ultrices dui, sed commodo enim viverra sit amet. Praesent elementum elit non sem dignissim congue. Sed lacinia vestibulum mi id ornare. Donec rhoncus molestie mi a vestibulum. Vestibulum ultrices finibus magna, nec semper dolor. Ut posuere aliquet purus at sagittis. Aliquam mattis semper semper.</p>
            </Card__body>
          </Card>
        </Card__group>
      ),
      notes: ''
    }, {
      name: 'Card deck with card colors',
      description: 'A card deck is the same as a card group, but with spacing between cards.',
      component: (
        <Card__deck>
          <Card>
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus enim. Donec molestie euismod velit, id fringilla purus fermentum id. Nullam ultricies pretium lacus sit amet rhoncus. Aliquam non turpis elit. Maecenas ornare libero non scelerisque tempus. Pellentesque efficitur enim turpis, euismod iaculis nibh tristique ac. Nullam molestie tortor a lorem auctor, vitae placerat velit eleifend. Fusce tempus ultrices dui, sed commodo enim viverra sit amet. Praesent elementum elit non sem dignissim congue. Sed lacinia vestibulum mi id ornare. Donec rhoncus molestie mi a vestibulum. Vestibulum ultrices finibus magna, nec semper dolor. Ut posuere aliquet purus at sagittis. Aliquam mattis semper semper.</p>
            </Card__body>
          </Card>
          <Card color="red">
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus enim. Donec molestie euismod velit, id fringilla purus fermentum id.</p>
            </Card__body>
          </Card>
          <Card color="green">
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus enim. Donec molestie euismod velit, id fringilla purus fermentum id. Nullam ultricies pretium lacus sit amet rhoncus. Aliquam non turpis elit. Maecenas ornare libero non scelerisque tempus. Pellentesque efficitur enim turpis, euismod iaculis nibh tristique ac. Nullam molestie tortor a lorem auctor, vitae placerat velit eleifend. Fusce tempus ultrices dui, sed commodo enim viverra sit amet. Praesent elementum elit non sem dignissim congue. Sed lacinia vestibulum mi id ornare. Donec rhoncus molestie mi a vestibulum. Vestibulum ultrices finibus magna, nec semper dolor. Ut posuere aliquet purus at sagittis. Aliquam mattis semper semper.</p>
            </Card__body>
          </Card>
          <Card color="blue">
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis lectus enim. Donec molestie euismod velit, id fringilla purus fermentum id. Nullam ultricies pretium lacus sit amet rhoncus. Aliquam non turpis elit. Maecenas ornare libero non scelerisque tempus. Pellentesque efficitur enim turpis, euismod iaculis nibh tristique ac. Nullam molestie tortor a lorem auctor, vitae placerat velit eleifend. Fusce tempus ultrices dui, sed commodo enim viverra sit amet. Praesent elementum elit non sem dignissim congue. Sed lacinia vestibulum mi id ornare. Donec rhoncus molestie mi a vestibulum. Vestibulum ultrices finibus magna, nec semper dolor. Ut posuere aliquet purus at sagittis. Aliquam mattis semper semper.</p>
            </Card__body>
          </Card>
        </Card__deck>
      ),
      notes: ''
    }, {
      name: 'Card grid',
      description: 'A card grid is like a desk, but begins to wrap cards after configured number (see Cards.css :root for number).',
      component: (
        <Card__grid>
          <Card>
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </Card__body>
          </Card>
          <Card>
            <Card__body>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </Card__body>
          </Card>
        </Card__grid>
      ),
      notes: ''
    }
  ]
}];
