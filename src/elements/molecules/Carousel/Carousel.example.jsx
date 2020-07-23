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

import Image from '@atoms/Image/Image';
import Icon from '@atoms/Icon/Icon';
import Button from '@atoms/Button/Button';
import Card from '@molecules/Card/Card';
import {
  Carousel,
  Carousel__container,
  Carousel__controls,
  Carousel__slide
} from './Carousel';

export default [{
  examples: [
    {
      name: 'Default Carousel',
      description: '',
      exports: '',
      notes: '',
      component: (
        <Carousel>
          <Carousel__controls />
          <Carousel__container style={{ textAlign: 'center' }}>
            <Carousel__slide>
              <Card id="carousel-card-01" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-02" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-03" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-04" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
          </Carousel__container>
        </Carousel>
      )
    }, {
      name: 'Default Style With Autoplay',
      description: '',
      exports: '',
      notes: '',
      component: (
        <Carousel autoplay={true}>
          <Carousel__controls />
          <Carousel__container style={{ textAlign: 'center' }}>
            <Carousel__slide>
              <Card id="carousel-card-05" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-06" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-07" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-08" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
          </Carousel__container>
        </Carousel>
      )
    }, {
      name: 'Default Style No Loop',
      description: '',
      exports: '',
      notes: '',
      component: (
        <Carousel loop={false}>
          <Carousel__controls />
          <Carousel__container style={{ textAlign: 'center' }}>
            <Carousel__slide>
              <Card id="carousel-card-05" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-06" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-07" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-08" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
          </Carousel__container>
        </Carousel>
      )
    }, {
      name: 'Default Style No Pagination',
      description: '',
      exports: '',
      notes: '',
      component: (
        <Carousel pagination={false}>
          <Carousel__controls />
          <Carousel__container style={{ textAlign: 'center' }}>
            <Carousel__slide>
              <Card id="carousel-card-05" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-06" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-07" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
            <Carousel__slide>
              <Card id="carousel-card-08" className="padding--medium">
                <p>{Utils.ipsum('paragraph', 2)}</p>
              </Card>
            </Carousel__slide>
          </Carousel__container>
        </Carousel>
      )
    }, {
      name: 'Icon Wrapper Variant & Custom Pagination',
      description: '',
      exports: '',
      notes: '',
      component: (
        <Carousel variant="icon-wrapper" style={{ width: '50%' }}>
          <div className="flex" aria-label="Carousel navigation">
            <Button variant="icon" aria-label="previous slide" className="carousel__button carousel__button-prev">
              <Icon name="left" ariaHidden />
            </Button>
            <Carousel__container>
              <Carousel__slide style={{ textAlign: 'center' }}>
                <Image src="https://picsum.photos/id/10/400" variant="auto" alt="" />
              </Carousel__slide>
              <Carousel__slide style={{ textAlign: 'center' }}>
                <Image src="https://picsum.photos/id/1016/400" variant="auto" alt="" />
              </Carousel__slide>
              <Carousel__slide style={{ textAlign: 'center' }}>
                <Image src="https://picsum.photos/id/1057/400" variant="auto" alt="" />
              </Carousel__slide>
              <Carousel__slide style={{ textAlign: 'center' }}>
                <Image src="https://picsum.photos/id/1018/400" variant="auto" alt="" />
              </Carousel__slide>
            </Carousel__container>
            <Button variant="icon" aria-label="next slide" className="carousel__button carousel__button-next">
              <Icon name="right" ariaHidden />
            </Button>
          </div>
          <div className="carousel__pagination carousel__pagination-custom">
            <button type="button" aria-label="">1</button>
            <button type="button" aria-label="">2</button>
            <button type="button" aria-label="">3</button>
            <button type="button" aria-label="">4</button>
          </div>
        </Carousel>
      )
    }
  ]
}];
