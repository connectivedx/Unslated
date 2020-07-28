import test from 'tape';
import { shallow } from 'enzyme';

import Carousel from './Carousel';

test('<Carousel>', (t) => {
  const component = shallow(<Carousel>Hello World</Carousel>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.carousel'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
