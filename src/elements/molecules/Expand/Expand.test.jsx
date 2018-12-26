import test from 'tape';
import { shallow } from 'enzyme';

import Expandable from './Expandable';

test('<Expandable>', (t) => {
  const component = shallow(<Expandable title="Click me!">Hello World</Expandable>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.expandable'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
