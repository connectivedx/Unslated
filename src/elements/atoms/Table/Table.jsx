import Tbody from '@atoms/Table/partials/Tbody.jsx';
import Tdata from '@atoms/Table/partials/Tdata.jsx';
import Tfoot from '@atoms/Table/partials/Tfoot.jsx';
import Thead from '@atoms/Table/partials/Thead.jsx';
import Theader from '@atoms/Table/partials/Theader.jsx';
import Trow from '@atoms/Table/partials/Trow.jsx';

/** Table should be used in place of <table> and comes with Thead, Tbody, Tfoot, Theader, Trow and Tdata. */

export class Table extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variant */
    variant: PropTypes.oneOf(['default', 'auto', 'inline-data', 'responsive']),
    /** Children nodes being passed through */
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  /** Element level options */
  static options = {
    core: true
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'table',
      `table--${variant}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        <table className="table__root rich-text">
          {children}
        </table>
      </Tag>
    );
  }
}

export const Table__body = Tbody;
export const Table__data = Tdata;
export const Table__foot = Tfoot;
export const Table__head = Thead;
export const Table__header = Theader;
export const Table__row = Trow;


export default Table;
