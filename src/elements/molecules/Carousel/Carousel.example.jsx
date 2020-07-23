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
// import Icon from '@atoms/Icon/Icon';
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
      name: 'With Autoplay',
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
      name: 'With Autoplay and Custom Delay',
      description: '',
      exports: '',
      notes: '',
      component: (
        <Carousel autoplay={true} delay="3500">
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
      name: 'No Loop',
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
      name: 'No Pagination',
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
      name: 'Custom Pagination',
      description: '',
      exports: '',
      notes: '',
      component: (
        <Carousel>
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
          <div className="carousel__pagination carousel__pagination-custom">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>4</Button>
          </div>
        </Carousel>
      )
    }, {
      name: 'Icon Wrapped Custom Pagination (custom required)',
      description: '',
      exports: '',
      notes: '',
      component: (
        <Carousel>
          <Carousel__container>
            <Carousel__slide style={{ textAlign: 'center' }}>
              <Image src="https://picsum.photos/id/10/600" variant="auto" alt="" />
            </Carousel__slide>
            <Carousel__slide style={{ textAlign: 'center' }}>
              <Image src="https://picsum.photos/id/1016/600" variant="auto" alt="" />
            </Carousel__slide>
            <Carousel__slide style={{ textAlign: 'center' }}>
              <Image src="https://picsum.photos/id/1057/600" variant="auto" alt="" />
            </Carousel__slide>
            <Carousel__slide style={{ textAlign: 'center' }}>
              <Image src="https://picsum.photos/id/1018/600" variant="auto" alt="" />
            </Carousel__slide>
          </Carousel__container>
          <Carousel__controls>
            <div className="carousel__pagination carousel__pagination-custom tns-nav">
              <button type="button" />
              <button type="button" />
              <button type="button" />
              <button type="button" />
            </div>
          </Carousel__controls>
        </Carousel>
      )
    }
  ]
}];
