import Nav from '@guide/partials/nav/guide__nav';
import Welcome from '@guide/partials/welcome/guide__welcome';
import Examples from '@guide/partials/examples/guide__examples';
import { Guide__pages, BadAddress } from '@guide/partials/pages/guide__pages';

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
      <ReactRouterDOM.BrowserRouter>
        <div className="guide__main">
          <ReactRouterDOM.Switch>
            <ReactRouterDOM.Route exact path="/" component={Welcome} />
            <ReactRouterDOM.Route exact path="/examples" component={Welcome} />
            <ReactRouterDOM.Route path="/examples/:category/:element" component={Examples} />
            <ReactRouterDOM.Route path="/pages/:page" component={Guide__pages} />
            <ReactRouterDOM.Route path="/tools/:tool" component={Guide__pages} />
            <ReactRouterDOM.Route component={BadAddress} />
          </ReactRouterDOM.Switch>
          <Nav />
        </div>
      </ReactRouterDOM.BrowserRouter>
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
