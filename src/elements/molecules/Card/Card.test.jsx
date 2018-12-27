import test from 'tape';
import { shallow } from 'enzyme';

import Card from './Card';

test('<Card>', (t) => {
  const component = shallow(<Card>Hello World</Card>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.card'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
