import test from 'tape';
import { shallow } from 'enzyme';

import Accordion from './Accordion';

test('<Accordion>', (t) => {
  const component = shallow(<Accordion>Hello World</Accordion>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.accordion'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
