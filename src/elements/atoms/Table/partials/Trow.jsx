export class Table__row extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Children nodes being passed through */
    children: PropTypes.node
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'table__row',
      className
    ]);

    return (
      <tr className={classStack} {...attrs}>
        {children}
      </tr>
    );
  }
}

export default Table__row;
