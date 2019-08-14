## System Dependencies

Before you get up and running, make sure your environment has the following dependencies installed:

- [Node LTS+](https://nodejs.org/en/download)
- [Yarn](https://yarnpkg.com/en/docs/install) (optional)


## Install

To install project dependencies, start up the best terminal on your machine and do:

```
npm install
```

__Using Yarn instead__

[Yarn](https://github.com/yarnpkg/yarn) is an alternative package manager that offers great performance and predictability.  If you'd like to install dependencies using Yarn, do:

```
yarn
```


## Getting Started
f
After you've installed npm dependencies, Unslated provides command line scripts to automate common tasks. Tasks are divided below into common work flows.

> Use `npm run` or `yarn` to execute these commands in your favorite terminal.



### Configuration

Unslated has rolled up a number of common configurable points within its package.json file. This allows a high level of project configuration and ultimately unslated more portable across platforms it might be used under.

### Directories

Here you get to define the most important part of an Unslated build, the input and the output.

Prop | Description
--- | ---
`dest` | destination of Unslated production built files. (default: ./dist)
`source` | location of where Unslated source files live. (default: ./src)
`assetPath` | context path for all asset requests. (default: /assets)
`publicPath` | overload path request for all asset requests. (default: /)

In production, assets that are requested from the server from bundled CSS/JS get their pathing information from both assetPath and publicPath, NOT dest (`{publicPath}{assetPath}`).

If you are using Unslated in a larger system that requires URL_Rewrite endpoints for assets that differs from the default `/assets/**/*.*`, you want to use publicPath and possibly assetPath.

For instance, if you have need for assets to be physically bundled to:
`/dist/system/assets/**/*.*`

But when requested from server, you need this pathing:
`/some/system/region/team/assets/**/*.*`

Your configuration would be:
```
"dest": "./dist/system",
"assetPath": "/assets",
"publicPath": "/some/system/region/team"
```

Note: There is no way to make assetPath value be different from dest location and server request path. For instance, if you want files to be built out to `./dist/_resoureces/**/*.*`, but all requests to the server made to `./dist/assets/**/*.*`, you can't. You anything you configure in the assetPath will be used in both bundled destination and server requests.


### Server

Here live all server configuration points around development builds. Development builds tap into the the webpack-dev-server for a whole host of development needs, one of which is a simulated server to build / test our bundled files realtime.

```
"port": "8080",
"host": "localhost",
"allowedHosts": []
```

Prop | Description
--- | ---
`port` | what system port should dev build's localhost server run on. (default: 8080)
`host` | what hostname should dev build's localhost sever use. (default: localhost)
`allowedHosts` | grant a remote IP/hostname access to dev build's localhost server. (default: [])

### Optimization

Here live minification options for both JavaScript and CSS bundles (production builds only).
This is useful if you are using Unslated within a much larger system who needs to take Unslated's built files off to another minification process.

Prop | Description
--- | ---
`CSS` | "true" or "false". (default: true)
`JS` | "true" or "false". (default: true)

For much finer levels of configuration, you can always dig directly into the build configuration files of Unslated. Build configurations can be found under `build/configs/` under their respect folders.


### Build commands

Command | Description
--- | ---
`build` | runs `production` build of assets only, will not compile guide out (see guide build for guide files).
`dev` | runs a local `development` instance at http://localhost:8080 to host a runtime of guide for local development.
`guide` | build the guide assets for remote hosting of the guide.
`static` | if configured to be enabled in package.json, this will export JSX examples out as `static` .html files during this build type and the normal production build.
`staticDebug` | Useful for debugging just the static exporting of JSX examples from terminal.


### Scaffolding commands

Scaffolding tasks are used to quickly create new atoms and molecules while developing a website.
> Remember that elements names use [PascalCase](https://en.wikipedia.org/wiki/PascalCase)

Command | Description
--- | ---
`new:atom [name]` | Creates a new atom component in the `/src/atoms` directory.
`new:molecule [name]` | Creates a new molecule in the `/src/molecules` directory.
`new:organism [name]` | Creates a new organism in the `/src/organisms` directory.
`new:modifier [name]` | Creates a new modifier in the `/src/modifiers` directory.
`new:template [name]` | Creates a new template in the `/src/templates` directory.
`new:page [name]` | Creates a new page in the `/src/pages` directory.
`new:variable [name]` | Creates a new variable in the `/src/variables` directory.


##### Define via build commands

```
BASE_URL=/this-path/ npm run build
```

##### Define via package.json

```
"baseUrl": "/this-path/",
```

_Note: `BASE_URL` should always have a leading and trailing slash._


## Goals

We have tried to be thoughtful in our architectural decisions, and drive based on a few goals:

- Emphasize modular development
- Atomic based Architecture
- Reuse-ability between projects
- Reduce development friction

### Emphasize module development

This might be subtitled, Unix Philosophy. The system should be composed of many smaller pieces that each have a single responsibility.  This means making use of modules from [NPM](https://www.npmjs.com) and developing our files using CommonJS module format.

### Atomic-based architecture

We were inspired by the patterns in Brad Frost's [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/).  Our goal is to think about user interfaces as organisms of many small molecules and atoms. We've tried to build tools that help us think in this fashion.

Unslated projects are written using React JSX, which provides a great model for composing components and managing dependencies.  Elements are split into three categories, __Atoms__, __Molecules__, __Organisms__. Atoms will be mostly generic small elements, where as molecules and organisms are collections of smaller elements.

#### Atoms

Found in `/src/elements/atoms`

Atoms are small, reusable elements that can be used in many contexts.

#### Molecules

Found in `/src/elements/molecules`

Molecules are generally more singular purpose elements that are tied to a business requirement, or complex reusable elements that require internal state.

#### Organisms

Found in `/src/elements/organisms`

Organisms are specific arrangements of Atoms and Molecules with minimal styling requirements.

#### Templates

Found in `/src/elements/templates`

Templates are the conglomeration of Atoms, Molecules and or Organisms into a highly reusable parts that are focused on showing off the larger functionality of a site or application feature.

#### Modifiers

Found in `/src/elements/modifiers`

Modifiers are CSS styles and/or JavaScript containers that don't require specific html be defined.


### Reuse-ability between projects

Using work between projects has historically been a difficult nut to crack. We've selected technologies that have proven to be easily portable, and used an opinionated folder and file naming scheme that self contains molecules.

#### Naming conventions

Defining strong naming conventions help to ease the pain of context switching between projects.  Instead of focusing on the naming style of your fellow developers, you can focus on the goals of their code.

#### Molecule structure

All atoms and molecules share a similar set of files. Once you learn how one molecule is put together, you will have a very good idea how all molecule operate. Our preference is to repeat simple patterns many times instead of building fewer complex monolithic molecules.


### Reduce development friction

The web development world is evolving rapidly. A tool that can automate the myriad tasks we regularly perform can redirect our focus on business decisions instead of trivial tasks. We've provided a few different tools on your development adventures.

#### Building and watching

There are some very helpful command line scripts to help with development and continuous-integration. You can build a static set of files using `npm run production` or `npm run dev` if you are developing, as it creates a server at http://localhost:8080 that updates upon file changes.

## FAQ

### What is this?

A frontend tool-set.

### What technologies are used?

Web assets (html, js, css, images, svgs) are built with [Webpack](https://webpack.github.io).  [React](https://facebook.github.io/react) is used to rendering static html for CMS integration and render for browsers, using [Babel](https://babeljs.io) to transpile ES6 to ES5.  [Enzyme](https://github.com/airbnb/enzyme) is used to unit-test React components.  [PostCSS](https://github.com/postcss/postcss) is used to transform CSS. [SVG Symbols](https://css-tricks.com/svg-symbol-good-choice-icons) are used to easily define and use vector icons.

### Where’s the documentation?

It's a slow and steady trek to writing great documentation. We are doing our best, but we'd love your suggestions. If you'd like to help improve these documents, just create a new branch and submit a Pull Request – it's why we're on github! :computer: :bamboo:

### Why Unslated?

Was a name that was not already used on NPM, nothing more and is subject to change.

### What versions of Node are supported?

Unslated was developed to work best with Node's [most recent LTS release](https://nodejs.org/en/download/) and above.

