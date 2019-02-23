import test from 'tape';
import { shallow } from 'enzyme';

import Textarea from './Textarea';

test('<Textarea>', (t) => {
  const component = shallow(<Textarea>Hello World</Textarea>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.textarea'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
