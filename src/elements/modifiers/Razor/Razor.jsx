/**
  A simple re-abstraction of .NET Razor view functionality into JSX tag form.
  Allow .NET to do razor view data modeling with-in and exported of JSX examples.
*/

/**
  @using
*/

class Using extends React.Component {
  static propTypes = {
    /** The path or name of library */
    path: PropTypes.string,
    use: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.any
    ])
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      use,
      path,
      children
    } = this.props;

    if (use) {
      return (
        <React.Fragment>
          @using {'('}{use}{')'} {'{\r\n'}
          {children}
          {'\r\n}'}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>{`@using ${path};\r\n`}</React.Fragment>
    );
  }
}

/**
  @inherit
*/

class Inherit extends React.Component {
  static propTypes = {
    /** The path or name of library */
    path: PropTypes.string
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      path
    } = this.props;

    return (
      <React.Fragment>{`@inherits ${path};\r\n`}</React.Fragment>
    );
  }
}


/**
  @Model
*/

class Model extends React.Component {
  static propTypes = {
    /** Expresses what to use from the model */
    use: PropTypes.string,
    path: PropTypes.string
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      use,
      path
    } = this.props;

    if (use) {
      return (
        <React.Fragment>{`@Model.${use}`}</React.Fragment>
      );
    }

    return (
      <React.Fragment>{`@model ${path};\r\n`}</React.Fragment>
    );
  }
}

/**
  @Helper
*/

class Helper extends React.Component {
  static propTypes = {
    /** Conditional expression of if statement */
    use: PropTypes.string,
    /** Children passed through */
    children: PropTypes.oneOfType([
      PropTypes.any
    ])
  };


  /** Element level options */
  static options = {};

  render = () => {
    const {
      use,
      children
    } = this.props;

    return (
      <React.Fragment>
        @Helper {use} {'{\r\n'}
        {children}
        {'\r\n}'}
      </React.Fragment>
    );
  }
}

/**
  @Html
*/

class Html extends React.Component {
  static propTypes = {
    /** Expresses what to use from the model */
    use: PropTypes.string
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      use
    } = this.props;

    return (
      <React.Fragment>{`@Html.${use}`}</React.Fragment>
    );
  }
}

/**
  @Call
*/

class Call extends React.Component {
  static propTypes = {
    /** What to call or render */
    use: PropTypes.string
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      use
    } = this.props;

    return (
      <React.Fragment>{`@${use}`}</React.Fragment>
    );
  }
}


/**
  @If
*/
class If extends React.Component {
  static propTypes = {
    /** Conditional expression of if statement */
    condition: PropTypes.string,
    /** Children passed through */
    children: PropTypes.oneOfType([
      PropTypes.any
    ])
  };


  /** Element level options */
  static options = {};

  render = () => {
    const {
      condition,
      children
    } = this.props;

    return (
      <React.Fragment>
        @if {'('}{condition}{')'} {'{'}
        {children}
        {'}'}
      </React.Fragment>
    );
  }
}

/**
  @Else
*/

class Else extends React.Component {
  static propTypes = {
    /** Children passed through */
    children: PropTypes.oneOfType([
      PropTypes.any
    ])
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      children
    } = this.props;

    return (
      <React.Fragment>
        else {'{'}
        {children}
        {'}'}
      </React.Fragment>
    );
  }
}

/**
  @Foreach
*/

class Foreach extends React.Component {
  static propTypes = {
    expression: PropTypes.string,
    /** Children passed through */
    children: PropTypes.oneOfType([
      PropTypes.any
    ])
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      children,
      expression
    } = this.props;

    return (
      <React.Fragment>
        @foreach {'('}{expression}{')'} {'{'}
        {children}
        {'}'}
      </React.Fragment>
    );
  }
}

/**
  @
*/

class Code extends React.Component {
  static propTypes = {
    /** Children passed through */
    children: PropTypes.string
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      children
    } = this.props;

    return (
      <React.Fragment>
        @{'{'}
        {children}
        {'}'}
      </React.Fragment>
    );
  }
}


export {
  Using,
  Inherit,
  Model,
  Helper,
  Html,
  Call,
  If,
  Else,
  Foreach,
  Code
};
