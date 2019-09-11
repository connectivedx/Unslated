import Nav from '@guideMolecules/Nav/Nav';
import Examples from '@guideMolecules/Examples/Examples';

import Dashboard from '@guideOrganisms/Dashboard/Dashboard';
import { Pages, BadAddress } from '@guideOrganisms/Pages/Pages';

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
            <ReactRouterDOM.Route exact path="/" component={Dashboard} />
            <ReactRouterDOM.Route exact path="/examples" component={Dashboard} />
            <ReactRouterDOM.Route path="/examples/:category/:element" component={Examples} />
            <ReactRouterDOM.Route path="/pages/:page" component={Pages} />
            <ReactRouterDOM.Route path="/tools/:tool" component={Pages} />
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
