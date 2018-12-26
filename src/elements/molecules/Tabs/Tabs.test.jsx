import test from 'tape';
import { shallow } from 'enzyme';

import Tabs from './Tabs';

test('<Tabs>', (t) => {
  const component = shallow(<Tabs>Hello World</Tabs>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.tabs'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
