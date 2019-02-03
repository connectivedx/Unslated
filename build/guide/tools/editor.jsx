import {
  Editor,
  Editor__toolbar,
  Editor__sidebar,
  Editor__pallet
} from '@guide/partials/editor/guide__editor.jsx';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Icon from '@atoms/Icon/Icon';

const page = () => (
  <Rhythm>
    <Editor>
      <Editor__toolbar>
        <Icon name="plus" />
      </Editor__toolbar>
      <div className="editor__wrapper">
        <Editor__pallet />
        <Editor__sidebar />
      </div>
    </Editor>
  </Rhythm>
);

page.options = {
  navless: true,
  headless: true
};

export default page;
