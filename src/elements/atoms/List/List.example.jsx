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

import {
  List,
  List__item
} from './List';

export default [{
  examples: [
    {
      name: 'Blank list',
      component: (
        <List variant="blank">
          <List__item className="is-leader">Pig</List__item>
          <List__item>Dog</List__item>
          <List__item>Horse</List__item>
        </List>
      )
    }, {
      name: 'Unordered List (default)',
      component: (
        <List>
          <List__item>Horse</List__item>
          <List__item>Dog</List__item>
          <List__item className="is-leader">Pig</List__item>
        </List>
      )
    }, {
      name: 'Ordered list',
      component: (
        <List variant="ordered">
          <List__item className="is-leader">Pig</List__item>
          <List__item>Dog</List__item>
          <List__item>Horse</List__item>
        </List>
      )
    }, {
      name: 'Definition list',
      component: (
        <List variant="definition">
          <List__item variant="term">Pig</List__item>
          <List__item variant="description">Leader</List__item>

          <List__item variant="term">Dog</List__item>
          <List__item variant="description">Enforcer</List__item>

          <List__item variant="term">Horse</List__item>
          <List__item variant="description">Laborer</List__item>
        </List>
      )
    }, {
      name: 'Foreign tag list',
      component: (
        <List tagName="section">
          <List__item tagName="div">Pig</List__item>
          <List__item tagName="div">Dog</List__item>
          <List__item tagName="div">Horse</List__item>
        </List>
      )
    }
  ]
}];
