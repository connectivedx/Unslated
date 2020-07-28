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
import Heading from '@atoms/Heading/Heading';
import Image from './Image';

export default [{
  examples: [
    {
      name: 'Auto inline vs. full width',
      component: (
        <React.Fragment>
          <Image
            src="https://via.placeholder.com/1024x480"
            variant="auto"
            alt="Rancheria Falls"
          />

          <Image
            src="https://via.placeholder.com/1024x480"
            variant="full"
            alt="Rancheria Falls"
          />
        </React.Fragment>
      )
    }, {
      name: 'Inline Image srcSet (resize me)',
      component: (
        <Image
          src="https://via.placeholder.com/1440x640"
          srcSet="https://via.placeholder.com/480 720w, https://via.placeholder.com/1440x640 1440w"
          alt="Rancheria Falls"
          variant="full"
        />
      )
    }, {
      name: 'Background Image with srcSet (resize me)',
      component: (
        <Image
          srcSet="https://via.placeholder.com/480 480w, https://via.placeholder.com/768x480 768w, https://via.placeholder.com/1440x640 1024w"
          size="100%"
          position="center"
          alt="Background image"
        >
          <div className="padding--large">
            <Heading level="h2">Hello World!</Heading>
            <p>{Utils.ipsum('paragraph', 2)}</p>
          </div>
        </Image>
      )
    }, {
      name: 'Background Image / color overlay mixing / srcSet (resize me)',
      component: (
        <Rhythm deep={true}>
          <Image
            srcSet="https://via.placeholder.com/480 480w, https://via.placeholder.com/768x480 768w, https://via.placeholder.com/1440x640 1024w"
            size="100%"
            color="red"
            position="center"
            opacity={0.2}
            alt="Background image"
          >
            <div className="padding--large">
              <Heading level="h2">Hello World!</Heading>
              <p>{Utils.ipsum('paragraph', 2)}</p>
            </div>
          </Image>

          <Image
            srcSet="https://via.placeholder.com/480 480w, https://via.placeholder.com/768x480 768w, https://via.placeholder.com/1440x640 1024w"
            size="100%"
            color="blue"
            opacity={0.2}
            alt="Background image"
          >
            <div className="padding--large">
              <Heading level="h2">Hello World!</Heading>
              <p>{Utils.ipsum('paragraph', 2)}</p>
            </div>
          </Image>

          <Image
            srcSet="https://via.placeholder.com/480 480w, https://via.placeholder.com/768x480 768w, https://via.placeholder.com/1440x640 1024w"
            size="100%"
            color="green"
            opacity={0.1}
            alt="Background image"
          >
            <div className="padding--large">
              <Heading level="h2">Hello World!</Heading>
              <p>{Utils.ipsum('paragraph', 2)}</p>
            </div>
          </Image>
        </Rhythm>
      )
    }
  ]
}];
