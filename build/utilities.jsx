/*
  Utilities: reduces code bloat by opening up space for developers to sum up repeated code into reusable methods instead.
  
  All methods crafted here can be accessed from anywhere in the project by calling the "Utils" alias.
  Because utils has its own alias namespace, you do not need to ever import this file into your JS or JSX files.
  
  ```
    const aGrulingTask = Utils.GrulingTaskMethod();
  ```

  IMPORTANT NOTE: Never remove any methods marked "CORE:" as they are dependencies for the framework.
*/

/*
  CORE: Recursive gathering of folders from a directory
*/

const readDirectory = (context) => {
  const collection = [];
  context.keys().forEach(key => collection[key] = context(key));

  return collection;
};

/*
  CORE: Returns the build information being currently run
*/

const getBuildInfo = () => {
  return buildInfo;
};


/*
  CORE: Returns the build type being currently run
*/

const getBuildType = () => {
  return buildInfo.buildType;
};


/*
  CORE: Returns the entry path for the build currently being run
*/

const getBuildEntry = () => {
  return buildInfo.buildEntry;
};


/*
  CORE: Returns the output path for the build currently being run
*/

const getBuildOutput = () => {
  return buildInfo.buildOutput;
};


/*
  CORE: Gathering pages
*/

const getPages = () => {
  const pages = readDirectory(require.context('../src/pages/', true, /\.jsx$/));

  if (pages) {
    return pages;
  }

  return;
};


/*
  CORE: Gathering examples from elements directory
*/

const getExamples = () => {
  const elements = readDirectory(require.context('../src/elements/', true, /\.example.jsx$/));
  const collection = [];

  Object.keys(elements).map((key, index) => {
    collection.push({
      url: ['examples', key.split('.').slice(0, -1).slice(0, -1).pop()].join(''),
      atomicLevel: key.replace('./', '').split('/')[0],
      name: key.split('/').slice(-1)[0].split('.')[0],
      examples: [...elements[key].default],
      docs: (elements[key].default[0].docs) ? elements[key].default[0].docs[0] : undefined
    });
  });

  if (collection) {
    return collection;
  }

  return;
};


/*
  CORE: Gathering examples from modifiers directory
*/

const getModifierExamples = () => {
  const modifiers = this.readDirectory(require.context('../src/elements/modifiers/', true, /\.example.jsx$/));
  if (modifiers) {
    return modifiers;
  }
  return;
}


/*
  CORE: Gathering examples from atoms directory
*/

const getAtomExamples = () => {
  const atoms = this.readDirectory(require.context('../src/elements/atoms/', true, /\.example.jsx$/));
  if (atoms) {
    return atoms;
  }
  return;
}


/*
  CORE: Gathering examples from molecules directory
*/

const getMoleculeExamples = () => {
  const molecules = this.readDirectory(require.context('../src/elements/molecules/', true, /\.example.jsx$/));
  if (molecules) {
    return molecules;
  }
  return;
}


/*
  CORE: Gathering examples from organisms directory
*/

const getOrganism = () => {
  const organisms = this.readDirectory(require.context('../src/elements/organisms/', true, /\.example.jsx$/));
  if (organisms) {
    return organisms;
  }
  return;
}


/*
  CORE: Creating a nice className from an array of unknown values
*/

const createClassStack = (classList) => (
  classList
    .map((className) => {
      if (Array.isArray(className)) {
        return createClassStack(className);
      }

      return className;
    })
    .filter((a) => a)
    .join(' ')
);


/*
  CORE: Creating a basic component with a className
*/

const createBasicComponent = (config) => {
  const {
    name,
    variants,
    defaultProps
  } = config;

  const Component = (props) => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = props;

    const classStack = createClassStack([
      name,
      variants && `${name}--${variant}`,
      className
    ]);

    return (
      <Tag className={classStack} {...attrs}>
        {children}
      </Tag>
    );
  };

  Component.displayName = name;

  Component.defaultProps = defaultProps || { tagName: 'div' };

  Component.propTypes = {
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    className: PropTypes.string,
    children: PropTypes.node
  };

  if (variants) {
    Component.propTypes.variant =
      PropTypes.oneOf(variants);
  }

  return Component;
};


module.exports = {
  getBuildInfo,
  getBuildType,
  getBuildEntry,
  getBuildOutput,
  getPages,
  getExamples,
  createBasicComponent,
  createClassStack
};
