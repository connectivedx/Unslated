import test from 'tape';
import { shallow } from 'enzyme';

import Divider from './Divider';

test('<Divider>', (t) => {
  const component = shallow(<Divider>Hello World</Divider>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.divider'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
