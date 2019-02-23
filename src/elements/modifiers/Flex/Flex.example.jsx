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

import Heading from '@atoms/Heading/Heading';
import Rhythm from '@atoms/Rhythm/Rhythm';

export default [{
  examples: [
    {
      name: 'Flex class (native behavoir)',
      description: '',
      component: (
        <div className="flex">
          <div>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex row reverse',
      description: '',
      component: (
        <div className="flex flex--row-reverse">
          <div>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items start',
      description: '',
      component: (
        <div className="flex flex--justify-content-start">
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column Three</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items end',
      description: '',
      component: (
        <div className="flex flex--justify-content-end">
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column Three</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items between',
      description: '',
      component: (
        <div className="flex flex--justify-content-between">
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column Three</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items around',
      description: '',
      component: (
        <div className="flex flex--justify-content-around">
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column Three</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex row, justify content/items evenly',
      description: '',
      component: (
        <div className="flex flex--justify-content-even">
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div style={{ width: '30%' }}>
            <Heading level="h2">Column Three</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </div>
      ),
      notes: ''
    }, {
      name: 'Flex column',
      description: '',
      component: (
        <Rhythm className="flex flex--column">
          <div>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </Rhythm>
      ),
      notes: ''
    }, {
      name: 'Flex column reverse',
      description: '',
      component: (
        <Rhythm className="flex flex--column-reverse">
          <div>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </Rhythm>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items start',
      description: '',
      component: (
        <Rhythm className="flex flex--column flex--justify-content-start" style={{ minHeight: '400px' }}>
          <div>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Three</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </Rhythm>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items end',
      description: '',
      component: (
        <Rhythm className="flex flex--column flex--justify-content-end" style={{ minHeight: '400px' }}>
          <div>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Three</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </Rhythm>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items between',
      description: '',
      component: (
        <Rhythm className="flex flex--column flex--justify-content-between" style={{ minHeight: '500px' }}>
          <div>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Three</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </Rhythm>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items evenly',
      description: '',
      component: (
        <Rhythm className="flex flex--column flex--justify-content-even" style={{ minHeight: '500px' }}>
          <div>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Three</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </Rhythm>
      ),
      notes: ''
    }, {
      name: 'Flex column, justify content/items around',
      description: '',
      component: (
        <Rhythm className="flex flex--column flex--justify-content-around" style={{ minHeight: '500px' }}>
          <div>
            <Heading level="h2">Column One</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Two</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
          <div>
            <Heading level="h2">Column Three</Heading>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id arcu eget est tincidunt convallis ut at nisi. Suspendisse quis lorem lacus. Praesent molestie interdum tellus ac laoreet. Praesent id aliquet nisl. Sed nec tincidunt dolor. Aenean accumsan euismod odio. Aliquam erat volutpat. In sit amet vulputate augue. Etiam ac nulla venenatis, luctus nisl sed, euismod est. Nulla dictum euismod nibh eu efficitur. Nunc in sodales mauris. Maecenas quis sollicitudin est, ac elementum augue.</p>
          </div>
        </Rhythm>
      ),
      notes: ''
    }
  ]
}];
