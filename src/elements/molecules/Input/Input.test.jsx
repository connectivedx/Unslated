import test from 'tape';
import { shallow } from 'enzyme';

import Input from './Input';

test('<Input>', (t) => {
  const component = shallow(<Input>Hello World</Input>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.input'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
