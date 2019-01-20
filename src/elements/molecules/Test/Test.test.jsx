import test from 'tape';
import { shallow } from 'enzyme';

import Test from './Test';

test('<Test>', (t) => {
  const component = shallow(<Test>Hello World</Test>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.test'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
