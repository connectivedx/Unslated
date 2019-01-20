import test from 'tape';
import { shallow } from 'enzyme';

import Asdfasdf from './Asdfasdf';

test('<Asdfasdf>', (t) => {
  const component = shallow(<Asdfasdf>Hello World</Asdfasdf>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.asdfasdf'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
