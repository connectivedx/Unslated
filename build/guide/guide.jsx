import Nav from '@guide/partials/nav/guide__nav';
import Pages from '@guide/partials/pages/guide__pages';
import Welcome from '@guide/partials/welcome/guide__welcome';
import Examples from '@guide/partials/examples/guide__examples';
import Readme from '@guide/partials/readme/guide__readme.jsx';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

export const Guide = (props) => {
  const {
    tagName,
    className,
    ...attrs
  } = props;

  let Tag = tagName;
  let classStack = Utils.createClassStack([
    'guide',
    className
  ]);

  return (
    <Tag className={classStack} {...attrs}>
      <Nav />
      <main className="guide__main">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/examples' component={Welcome} />
            <Route path='/examples/:category/:element' component={Examples} />
            <Route path='/pages/:page' component={Pages} />
          </Switch>
        </BrowserRouter>
      </main>
    </Tag>
  );
};

Guide.defaultProps = {
  tagName: 'main'
};

Guide.propTypes = {
  tagName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  className: PropTypes.string
};


export default Guide;
