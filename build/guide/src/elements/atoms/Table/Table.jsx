/** Table should be used in place of <table> and comes with Thead, Tbody, Tfoot, Theader, Trow and Tdata. */

export class Table__head extends React.Component {
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
      'guide__table__head',
      className
    ]);

    return (
      <thead className={classStack} {...attrs}>
        {children}
      </thead>
    );
  }
}

export class Table__header extends React.Component {
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
      'guide__table__header',
      className
    ]);

    return (
      <th className={classStack} {...attrs}>
        {children}
      </th>
    );
  }
}

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
      'guide__table__body',
      className
    ]);

    return (
      <tbody className={classStack} {...attrs}>
        {children}
      </tbody>
    );
  }
}

export class Table__foot extends React.Component {
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
      'guide__table__foot',
      className
    ]);

    return (
      <tfoot className={classStack} {...attrs}>
        {children}
      </tfoot>
    );
  }
}

export class Table__data extends React.Component {
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
      'guide__table__data',
      className
    ]);

    return (
      <td className={classStack} {...attrs}>
        {children}
      </td>
    );
  }
}

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
      'guide__table__row',
      className
    ]);

    return (
      <tr className={classStack} {...attrs}>
        {children}
      </tr>
    );
  }
}

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
      'guide__table',
      `guide__table--${variant}`,
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

export default Table;
