import test from 'tape';
import { shallow } from 'enzyme';

import Fieldset from './Fieldset';

test('<Fieldset>', (t) => {
  const component = shallow(<Fieldset>Hello World</Fieldset>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.fieldset'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
