import test from 'tape';
import { shallow } from 'enzyme';

import Modal from './Modal';

test('<Modal>', (t) => {
  const component = shallow(<Modal>Hello World</Modal>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.modal'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
