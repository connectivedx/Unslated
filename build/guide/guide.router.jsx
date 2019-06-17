import Nav from '@guide/partials/nav/guide__nav';
import Welcome from '@guide/partials/welcome/guide__welcome';
import { Guide__pages, BadAddress } from '@guide/partials/pages/guide__pages';
import Examples from '@guide/partials/examples/guide__examples';
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
      <BrowserRouter>
        <div className="guide__main">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/examples" component={Welcome} />
            <Route path="/examples/:category/:element" component={Examples} />
            <Route path="/pages/:page" component={Guide__pages} />
            <Route path="/tools/:tool" component={Guide__pages} />
            <Route component={BadAddress} />
          </Switch>
          <Nav />
        </div>
      </BrowserRouter>
    </Tag>
  );
};

Guide.defaultProps = {
  tagName: 'div'
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
