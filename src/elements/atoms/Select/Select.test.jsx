import test from 'tape';
import { shallow } from 'enzyme';

import Select from './Select';

test('<Select>', (t) => {
  const component = shallow(<Select>Hello World</Select>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.select'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
