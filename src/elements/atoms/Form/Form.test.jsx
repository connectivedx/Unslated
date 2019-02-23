import test from 'tape';
import { shallow } from 'enzyme';

import Forms from './Forms';

test('<Forms>', (t) => {
  const component = shallow(<Forms>Hello World</Forms>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.forms'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
