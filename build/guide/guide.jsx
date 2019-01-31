import Nav from '@guide/partials/nav/guide__nav';
import Welcome from '@guide/partials/welcome/guide__welcome';
import { Guide__pages, BadAddress } from '@guide/partials/pages/guide__pages';
import { Guide__examples, Guide__blank, Guide__data } from '@guide/partials/examples/guide__examples';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

export const Guide = (props) => {
  const {
    tagName,
    className,
    ...attrs
  } = props;

  const Tag = tagName;
  const classStack = Utils.createClassStack([
    'guide',
    className
  ]);

  return (
    <Tag className={classStack} {...attrs}>
      <Nav />
      <main className="guide__main">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/examples" component={Welcome} />
            <Route path="/examples/:category/:element" component={Guide__examples} />
            <Route path="/pages/:page" component={Guide__pages} />
            <Route path="/tools/:tool" component={Guide__pages} />
            <Route component={BadAddress} />
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

export const Blank = () => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route path="/blank/:category/:element/:id" component={Guide__blank} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>
);

export const Data = () => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route path="/data/:data" component={Guide__data} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>
);

export default Guide;
