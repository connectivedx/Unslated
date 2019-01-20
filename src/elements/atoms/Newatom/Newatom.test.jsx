import test from 'tape';
import { shallow } from 'enzyme';

import Newatom from './Newatom';

test('<Newatom>', (t) => {
  const component = shallow(<Newatom>Hello World</Newatom>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.newatom'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
