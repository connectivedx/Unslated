import test from 'tape';
import { shallow } from 'enzyme';

import Video from './Video';

test('<Video>', (t) => {
  const component = shallow(<Video>Hello World</Video>);
  t.ok(component.is('div'), 'tag name');
  t.ok(component.is('.video'), 'tag class');
  t.equal(component.text(), 'Hello World', 'text');
  t.end();
});
