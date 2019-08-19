## JSX
Each component created in Unslated comes with a main .JSX file and a example.JSX file.
The main.JSX is used to craft the heart of our component's markup while example.JSX used to demonstrate how our main.JSX component ought to be used.

Its recommended that you keep any and all children usage out of the main.JSX file and retain that for the example.JSX file to keep re-usage and static exporting of example later on a possibility.

## main.JSX Files

A component main.JSX file will looks like this:
```jsx
/**
  This is my component that wil be used for X Y and possibly Z reasons.
  It helps with A B and C logic.
*/

export class SomeComponent extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node
  };

  static defaultProps = {
    tagName: 'div',
    variant: 'default'
  };

  /** Element level options */
  static options = {};

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'some-component',
      `some-component--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        {children}
      </Tag>
    );
  }
}

export default SomeComponent;

```

Lets break these parts down a tad:

## Props
Each main.JSX element (main.JSX can have multiple elements) ought to have a props object that defines some rules around props that our element tag can and ought to use:

```jsx
static propTypes = {
  /** Tag overload */
  tagName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  /** Class stacking */
  className: PropTypes.string,
  /** Style variants */
  variant: PropTypes.oneOf(['default']),
  /** Children passed through */
  children: PropTypes.node
};
```
In the above example, we have a tagName prop that uses the oneOfType operator to only allow strings, other elements or a function to be pass through it.

While className and children as a bit simpler and only allow a string or a node to be passed. Variant makes use of oneOf operator that allows you to pass one of an arrow of array items (strings in this case).

## Defaults
Along with defining rules and operators for element props, you can also set the default value of a prop if the prop is not used:
```jsx
static defaultProps = {
	tagName: 'div',
	variant: 'default'
};
```

## Render
Finally we have the render block that returns our markup and prop values.

```jsx
render = () => {
  const {
    tagName: Tag,
    className,
    variant,
    children,
    ...attrs
  } = this.props;

  const classStack = Utils.createClassStack([
    'some-component',
    `some-component--${variant}`,
    className
  ]);

  return (
    <Tag
      className={classStack}
      {...attrs}
    >
      {children}
    </Tag>
  );
}
```
Out of the box, the render is broken up into three areas.
- Variables
- Stacking / logic
- Return

At the top of the render method, we are creating a number of variables off the `this.props` object by means of ES6 object destructuring.

Next, we are using one of these props and a Utils method to build up a classStack for our component markup. It is here where most logic with newly available prop variables comes into play and is common to find more logic in and around classStack in real world scenarios.

Finally, our return of the markup. Out of the box we make use of the Tag variable which is setup in a way for the end developer to pass custom tagNames such as span, div, p etc to overload the default div value of tagName. Note that we use the {...attrs} prop variable in our return markup to allow all other markup props to be pass to this element.

## Imports
The main.JSX file is auto documented from the description block at the top to the comments above the props.
Make sure imports are after the first comment block of your main.JSX.

Lastly Unslated offers pathing alias to speedup getting around different areas of the project during imports. For instance instead of having to deal with relative pathing during the import of one or another src file see `build/config/webpack/alias.config.js` for all the available @alias namespace availabl to you to speed up your development experince.

```jsx
import SomeElement from '@atoms/SomeElement/SomeElement';
import AnotherElement from '@molecules/AnotherElement/AnotherElement';
```

## Example.JSX files
After building your main.JSX elements, its time to put them to practice within our example.JSX file to show off variants and prop logic in the component guide.

The example.JSX file is just an object of examples:

```jsx
import SomeComponent from './SomeComponent';

export default [{
  examples: [
    {
      name: 'Default styling',
      description: '',
      staticPath: '',
      component: (
        <SomeComponent>Lorem ipsum</SomeComponent>
      ),
      options: {},
      notes: ''
    }, {
      name: 'Special styling',
      description: '',
      staticPath: '',
      component: (
        <SomeComponent variant="special">Lorem ipsum</SomeComponent>
      ),
      options: {},
      notes: ''
    }
  ]
}];
```

We start off example files with our importing of our main.JSX file.
Once imported, we can begin extending out the `examples` object with entries. Example entries can be given names, description, developer notes and options, but most importantly allows you to define and author component examples.

- name = Gives a title to the example within component guide
- description = Gives a description to example within component guide
- staticPath = if configured to do so from package.json, setting a path here will flag the build system to export this example as static .html
- component = Where you author the component, its variants and/or children usage per example.
- options = Example pallet background and padding settings
- notes = notes only within the source and not rendered in the component guide

It is important to note that Unslated has decided to remain vanilla and only use react / JSX as a templating engine within the component guide of Unslated. This means that unless explicitly told to be within a production environment, react API will not work from assets.js alone.

