## JS
Unslated has decided to remain vanilla for component javascript logic. This means that although we use react / jsx as a templating engine on the guide.js side of things; unless explicitly told to do so the production assets.js side is not bundled with react libs. If you would like to use react API within your components for react applications its as simple as including the CDN libs needed along side assets.js out in production.

Please note, react libs are rather large (sometimes 100kb+) and at the expense of global users and mobile devices, be careful about choosing to use react API for JS logic when vanilla JS could equally do the job.

## Container.js files
Out of the box Unslated is ES6+ ready to go using babel as a transpiler for older browsers.
When installing new components, you have the option to include what are called Container.js files. These files contain our components JS logic and get installed in our `src/scripts.js` (more on that in a sec).

Baseline container files are setup to be functional programming vs. class based object oriented programming. Nothing is preventing the usage of classes and object oriented programming in Container.js files, its just that we have found it to be easier to write, read and use functional JS in large scale projects.

Here is your baseline Container.js file:
```js
// Some component client side namespace
export const SomeComponent = (el) => {
  // SomeComponent's helper UI object
  const ui = {
    el
  };

  // SomeComponent's main init point
  const init = () => {
    // SomeComponent's init logic here
  };

  // Self init
  init();
};

export default SomeComponent;

```

We being with a export of our main logic variable which Unslated by default names after the component it was created for. Notice we are passing a el (element) param which we will use later on.

Immediately at the start of this Container.js you should find a UI object which is used to house common DOM selectors you can use within your logic.

Next is our init method, it is here you being the initial setup of a component's logic such as conditioning for things, adding event listeners etc. Consider init like the constructor of a class.

Lastly, the init method is self initing in a way that makes it quickly optional during development.

## Installing Container.js files
Lastly, all component container.js files get installed in the `src/scripts.js` file by using the `Utils.initComponent([component name], [component selector], [import component variable])` method.

```js
import SomeComponent from '@atoms/SomeComponent/SomeComponent.container';

document.addEventListener('DOMContentLoaded', () => {
  Utils.initComponent('SomeComponent', '.some-componnt', SomeComponent);
}, false);

```

The Utils.initComponent method will take the pass arguments given and install the container.js logic on found elements by passing found elements as el to our container.js.

## Sharing methods
In a functional approach, to share a method from component to component it is suggested you hang the method onto the DOM of the component or component element vs importing the file as you would in classic object orient programming. This keeps the bundle size to a minimal by leveraging the client end machine and DOM to access methods.

```js
// component A container.js
...

const sharedMethod = () => {
	console.log('Hello world!');
};

...

const init = () => {
  el.sharedMethod = sharedMethod;
};

...
```

```js
// component B container.js
...

const ui = {
  el,
  componentA: document.querySelector('.component-a')
};

...

const init = () => {
  el.addEventListener('click', () => {
  	componentA.sharedMethod();
  });
};

...
```

## ESLint
Both JSX and JS project files are ESLinted, and is here to make you and I a better developer wither you like it or not.
ESLinting means that your syntax practices, not just API usage is not being reviewed and must align to project standard before a build will complete. With each syntax error, there should be both a title and file/line number around what cause the error. ESLinting errors are not public without documentation behind it, so googling any ESLint error should render you a quick result on how to resolve it.

Here are a few common mistakes made...

Immediate method return:
```js
const method = (thing) => {
 return (thing / 32) * 100
};

// Because there is no logic between the opening curly brace and the return statement, you will get a ESLint error asking you to change it to the following:

const method = () => (thing / 32) * 100;
```

Conditions:
```js
if(this == that){
   ...
}

// Missing spaces and triple equals operator. Should be written as:
if (this === that) {
   ...
}
```

Missing return closure:
```js
const thing = { ...large data set... };
const collection = [];
Object.keys(thing).map((i) => {
	if (!thing[i].value) { return false; }
	collection.push(thing[i]);
});

// This will fail to build due to the usage of a return false above our collection.push(). This requires closure with a final return at the end like so:
Object.keys(thing).map((i) => {
	if (!thing[i].value) { return false; }
	collection.push(thing[i]);
	return true;
});
```


## Utilities
Unslated offers a way to sum up common JS logic across a project by means of a utilities file found in `src/utilities.jsx` with a global namespace of `Utils`.

To use a `Utils` method, simply call the namespace and method with dot notation across any src/**/**js files.

```js
Utils.methodName();
```

Out of the box Unslated offers a number of helpful utilities, some of which are core to the baseline components and are commented as such.

Here is a list of Unslated's baseline utilities:
- XHR
- Fetch
- checkValidity
- titleCapitalize
- getCookie
- setCookie
- deleteCookie
- parents
- toggleClass
- replaceClass
- serialize
- objectReverse
- ipsum
- initComponent

For more information about each method see comments above the method within `src/utilities.jsx`. Please note there is a export object at the end of the `src/utilities.jsx` file you must fill out if adding new methods.

## Installing JS plugins
Installing NPM community plugins is as simple as adding them to the Unslated package.json file via plugins recommended install command line and importing the plugin using the `import from 'some-plugin';` statement within a container.js file.

```js
// example install command for some-plugin
npm install some-plugin --save-dev

// Once installed import the plugin for usage
import SomePlugin from 'some-plugin';

```

For CDN usage instead, navigate to `build/configs/html/html.config.js` to add to the CDN webpack plugin. Please note CDN libs added to the webpack CDN plugin will only install a script block into the compiled index.html file for component guide and will require you to also include said script block along side compiled assets.js out in a production environment.

Please stick with //unpkg.com/ for CDN usage as it is a mirror of NPM and should have anything you need.
Note: pinging `//unpkg.com/browse/pluginname` is the quickest way to search unpkg for plugin availability, but do remember to exclude the `/browse/` portion from the url once used in `html.config.js`.
