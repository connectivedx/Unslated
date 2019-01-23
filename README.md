# Unslated

[Unslated](https://github.com/drolsen/Unslated) is [Connective DX](https://www.connectivedx.com)'s in-house toolset for making static websites and atomic styleguides.  It's great for producing static web assets with an emphasis on atomic driven architecture.

> To get started, download a copy of this repository from github and read Install section below.


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

[Yarn](https://github.com/yarnpkg/yarn) is an alterntive package manager that offers great performance and predictability.  If you'd like to install dependencies using Yarn, do:

```
yarn
```


## Getting Started

After you've installed npm depenedencies, Unslated provides command line scripts to automate usual tasks. Tasks are divided below into common workflows.

> Use `npm run` or `yarn run` to execute these commands in your favorite terminal.


### Builds

Use these task to build a full copy of the website, including the DLL generation.

Command | Description
--- | ---
`production` | runs `production` build
`dev` | runs a `development` instance that starts a webpack-dev-server at http://localhost:8080


### Scaffolding tasks

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


## Configuration


Build configurations can be found under build/configs/ under their respect folders. Please note that CSS config has been divided up between standard webpack config and all things POSTCSS. POSTCSS items are either a .config.js or a .plugin.js file under build/configs/css/ directory.


## Goals

We have tried to be thoughtful in our architectural decisions, and drive based on a few goals:

- Emphasize modular development
- Atomic based Architecture
- Reuseability between projects
- Reduce development friction

### Emphasize module development

This might be subtitled, Unix Philosophy. The system should be composed of many smaller pieces that each have a single responsibility.  This means making use of modules from [NPM](https://www.npmjs.com) and developing our files using CommonJS module format.

### Atomic-based architecture

We were inspired by the patterns in Brad Frost's [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/).  Our goal is to think about user interfaces as organisms of many small molecules and atoms. We've tried to build tools that help us think in this fashion.

Unslated projects are written using React JSX, which provides a great model for composing components and managing dependencies.  Elements are split into three categories, __Atoms__, __Molecules__, __Organisms__. Atoms will be mostly generic small elements, where as molecules and organisms are collections of smaller elements.

#### Atoms

Found in `/src/elements/atoms`

Atoms are small, reuseable elements that can be used in many contexts.

#### Molecules

Found in `/src/elements/molecules`

Molecules are generally more singular purpose elements that are tied to a business requirement, or complex reusuable elmenets that require internal state.

#### Organisms

Found in `/src/elements/organisms`

Organisms are specific arrangments of Atoms and Molecules with minimal styling requirements.

#### Templates

Found in `/src/elements/templates`

Templates are the conglomeration of Atoms, Molecules and or Organisms into a highly reusable parts that are focused on showing off the larger functionality of a site or application feature.

#### Modifiers

Found in `/src/elements/modifiers`

Modifiers are css styles and/or javascript containers that don't require specific html be defined.


### Reuseability between projects

Using work between projects has historically been a difficult nut to crack. We've selected technologies that have proven to be easily portable, and used an opionated folder and file naming scheme that self contains molecules.

#### Naming conventions

Defining strong naming conventions help to ease the pain of context switching between projects.  Instead of focusing on the naming style of your fellow developers, you can focus on the goals of their code.

#### Molecule structure

All atoms and molecules share a similar set of files. Once you learn how one molecule is put together, you will have a very good idea how all molecule operate. Our preference is to repeat simple patterns many times instead of building fewer complex monolithic molecules.


### Reduce development friction

The web development world is evolving rapidly. A tool that can automate the myriad tasks we regularly perform can redirect our focus on business decisions instead of trival tasks. We've provided a few different tools on your development adventures.

#### Building and watching

There are some very helpful command line scripts to help with development and continuous-integration. You can build a static set of files using `npm run production` or `npm run dev` if you are developing, as it creates a server at http://localhost:8080 that updates upon file changes.


## FAQ

### What is this?

Connective DX’s front-end toolset.

### What technologies are used?

Web assets (html, js, css, images, svgs) are built with [Webpack](https://webpack.github.io).  [React](https://facebook.github.io/react) is used to rendering static html for CMS integration and render for browsers, using [Babel](https://babeljs.io) to transpile ES6 to ES5.  [Enzyme](https://github.com/airbnb/enzyme) is used to unit-test React components.  [PostCSS](https://github.com/postcss/postcss) is used to transform CSS. [SVG Symbols](https://css-tricks.com/svg-symbol-good-choice-icons) are used to easily define and use vector icons.

### Is it any good?

It depends.  It's a great tool for the way we build projects at [Connective DX](https://www.connectivedx.com), but may not align with your project's goals.  It is more focused on integrating with a back end system than application development.

### Where’s the documentation?

It's a slow and steady trek to writing great documentation. We are doing our best, but we'd love your suggestions. If you'd like to help improve these documents, just create a new branch and submit a Pull Request – it's why we're on github! :computer: :bamboo:

### Why Unslated?

Was a name that was not already used on NPM, nothing more and is subject to change.

### What verisons of Node are supported?

Unslated was developed to work best with Node's [most recent LTS release](https://nodejs.org/en/download/) and above.

## License

MIT Copyright (c) 2019 Connective DX
