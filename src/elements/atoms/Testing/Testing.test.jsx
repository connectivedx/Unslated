import test from 'tape';
import { shallow } from 'enzyme';

import Testing from './Testing';

test('<Testing>', (t) => {
  const component = shallow(<Testing>Hello World</Testing>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.testing'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
