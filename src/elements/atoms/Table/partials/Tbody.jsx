export class Table__body extends React.Component {
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
      'table__body',
      className
    ]);

    return (
      <tbody className={classStack} {...attrs}>
        {children}
      </tbody>
    );
  }
}

export default Table__body;
