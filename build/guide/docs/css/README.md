## CSS

All Unslated CSS files gets compiled down using POSTCSS.
There are two compile processes for CSS, preCompile and postCompile which helps ensure features such as variables and extending can happen globally without needing imports.

You can find both CSS configuration and pre/post plugins under `build/configs/css/`.
Minification can be turned on or off for CSS production / guide builds from within ./package.json -> optimization -> css.

## @Imports
Unslated offers pathing alias to quicking get around different areas of the project for the importing of files. For instance, instead of having to deal with `../../../atoms/` relative pathing during the import of one or another file see `build/config/webpack/alias.config.js` for all the available @alias namespaces.

```css
@import '@atoms/GoodElement/GoodElement.css';
@import '@molecules/GreatElement/GreatElement.css';
@import '@organisms/BestElement/BestElement.css';
```

## Root CSS
Although you will find CSS's main compile entry file within `src/styles.js`, taking a look closer at the source of this file you will see it importing `@atoms/Root/Root.css`.

This Root.css file houses CSS resets, body / html and global level tag styles.
If all styles except for Root.css were remove from the project, its these Root.css styles that ought to define baseline document and tags styles still.

## Fonts & Typography
Project fonts can be either local or remote. Local font files should be added in the `src/elements/atoms/Root/fonts/` directory and followed up with font-faces in `src/elements/atoms/Root/Root.font-faces.css`. (Remote fonts such as google can be installed as import statments within just Root.font-face.css).

```css
@import url('https://fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,700&display=swap');

// and, or

@font-face {
  font-family: 'Butler';
  src: url('./fonts/Butler.woff2') format('woff2'), url('./fonts/Butler.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
```

Once fonts are installed, its wise to sum up font faces into commonly used font families in `src/variables/fonts.css`.

Font variables have been abstracted out to build up the faces into variables, stacks and then families to allow as much flex ability as possible across all three levels.

Please note, baseline Unslated has abstracted these three levels under two name spaces, `default` and `accent`. default primarily is used for body level content, while accent is reserved for things like headings and titles.

Lastly, under `src/variables/type.css` you can find global settings typography such as body level font-size and line-height as well as responsive typography baseline settings.

## Variables

Speaking of variables, one of the greatest features of Unslated is that CSS variables are all global!
This elements the need for circular importing of CSS files and keeps projects focused on atmoic organization.

There are a few requirements to creating and using CSS variables:

- Defined within the `:root {}` selector before they can be accessed.
- Prefixed with `--` otherwise the system ignores them during compile.

Lastly, although all variables in Unslated can be accessed globally no matter where they are define; for organization sake Unslated offers `src/variables/` as a location to house all globally shared variables. This allows projects to focus on crating component specific variables within a component's CSS file, while graduating globally shared variables to `src/variables`.

```css
// Create
:root {
	--css-variable: value;
}
...

// Use
.some-selector {
	margin: var(--css-variable);
}
```

## Colors

Colors is a great segway from variables above, as all project colors are defined within `src/variables/colors.css`.

Colors is a unique variables file because it uses `:export` instead of the recommended and commonly used `:root`.
The `:export` is just like root, except its used a a flag to allow the colors CSS file to be imported and parsed by our guide. During compile, `:export` selectors get transpiled down to normal `:root`.


It's strongly recommended to continue to continue the practice of defining project colors within `src/variables/colors.css` vs locally within component styles.

When creating new colors, consider using [Name that color](http://chir.ag/projects/name-that-color/) to define new color names.

```css
.some-selector {
	color: var(--color-name);
	background-color: var(--color-name);
}
```

## Nesting
Like most pre-compile environments, Unslated supports nesting of source CSS selectors to help with legibility and selector strength where ever needed.

```css
.some-selector {
	width: 75px;

	.another-selector {
		height: 45px;
	}
}

// This compiles down to the follow:
.some-selector { width: 75px; }
.some-selector .anothre-selector { height: 45px; }

```

However, also like most pre-compile environments its important to keep nesting levels to a max of three levels.
The more you nest selectors, the more organized and stronger you make selectors, but you also grow selectors in length that may not be as apparent from source files. The deep you nest, the bigger the selector(s), the bigger the selectors the bigger your projects bundled CSS gets.

Wrong way:
```css
.some-selector {
	width: 75px;

	.another-selector {
		height: 45px;

		.another-selector__title {
			background-color: var(--color-white);

			.link {
				color: var(--color-black);
			}
		}
	}
}

// This compiles down to the follow:
.some-selector { width: 75px }
.some-selector .another-selector { height: 45px; }
.some-selector .another-selector .another-selector__title { color: #fff; }
.some-selector .another-selector .another-selector__title .link { color: #000; }
```

Instead, try to identify areas where selectors are strong enough on their and down need to be nested like so:
```css
// Aim for this instead!
.some-selector {
	width: 75px;
}

.another-selector {
	height: 45px;
}

.another-selector__title {
	background-color: var(--color-white);

	.link {
		color: var(--color-black);
	}
}

// This compiles down to the follow. Note how this is smaller:
.some-selector { width: 75px }
.another-selector { height: 45px; }
.another-selector__title { color: #fff; }
.another-selector__title .link { color: #000; }

```

## Breakpoints

Breakpoints are defined in `src/variables/breakpoints.css` and comes with two sets. One set to to target browser sizes from a pixel value on up, while the other set is to target a pixel value on down. Its standard to use on up set as it enforces the idea of mobile first. Use the on down set to help with overloads and corner cases.

To use breakpoints, you define a `@media` rule with a targeted breakpoint size, like so:

```css
@media (--large) {
	height: 100px;
	width: 100px;
}
```

Because the build process consolidates media query usage down to the end of our bundled CSS there are no context requirements in or around media query usage. The following are all valid examples:

```css
.some-selector {
	height: 50px;
	width: 50px;

	@media (--large) {
		height: 100px;
		width: 100px;
	}
}

```

```css
.some-selector {
	height: 50px;
	width: 50px;
}

@media (--large) {
	.some-selector {
		height: 100px;
		width: 100px;
	}
}

```

```css
@media (--small) {
	.some-selector {
		height: 50px;
		width: 50px;
	}
}

@media (--large) {
	.some-selector {
		height: 100px;
		width: 100px;
	}
}

```

## REMs
REM method allows you to pass a pixel value and hand over the rem unit calculations to the compiler. This allows CSS source files to retain a pixel unit for margins paddings and font-sizes that in most cases aligns with designs best, but still be web friendly by having rem values once rendered in browsers.

The rem method does its calculations off the baseline body font-size (default is 16px). Rem method like normal rem units should be reserved for margins, paddings and font-sizes. Nothing is wrong with expanding rem method usage beyond margins, paddings and font-sizes, but at the very least it should be enforced across these three CSS properties.

To use rem, simple call the rem method like so:

```css
.some-selector {
	padding: rem(16px); // once compiled comes out to padding: 1rem;
	margin: rem(8px) // once comipled, comes out to margin: 0.5rem;
	font-size: rem(32px); // once compiled, comes out to font-size: 2rem;
}
```

## Custom Selectors

Allows you to abstract commonly used CSS selectors into custom selectors.
Found under `src/variables/custom-selector.css` you can author new custom selectors by first defining it with the `@custom-selector [name] [css];` rule. For instance, Unstaled out of the box comes with `:--haf` selector that allows you to sum up :hover, :active and :focus selectors into a single call like so:

```css
@custom-selector :--haf :hover, :active, :focus;
```
Can then used like this:
```css
.some-selector {
	color: blue;

	&:--haf {
		color: red;
	}
}
```
Which compiles down as:
```css
.some-selector { color: blue; }

.some-selector:hover,
.some-selector:active,
.some-selector:focus { color: red; }

```

## Extend
The extend and extend-all methods allows you to extend one selector onto another. There are two methods, one for extending only the immediate styles of a selector, or a deep extend for both immediate and all nested selectors.

For instance, instead of reusing a class on the DOM or referencing unrelated selectors across CSS files, you can simply extend any selector onto another like so:

```css
.some-selector {
	width: 100px;
	background-color: var(--color-white);
}

// In same file or another file you can extend the above
.another-selector {
	@extend .some-selector;
	background-color: var(--color-black);
}

This compiles down to the following:
.some-selector,
.another-selector {
	width: 100px;
	background-color: #fff;
}

.another-selector {
	background-color: #000;
}
```

For a deep extend of both immediate and nested selectors use `@extend-all` like so:
```css
.some-selector {
	width: 100px;
	background-color: var(--color-white);

	.link {
		background-color: var(--color-blue);
	}
}

// In same file or another file you can extend the above
.another-selector {
	@extend-all .some-selector;
	background-color: var(--color-black);
}

This compiles down to the following:
.some-selector,
.another-selector {
	width: 100px;
	background-color: #fff;
}

.some-selector .link,
.another-selector .link {
	background-color: var(--color-blue);
}

.another-selector {
	background-color: #000;
}
```

Please note, extending styles is like nesting once things are compiled down, so depending on the size of the selectors you are extending or how much you are extending there can be a diminishing return of how large your bundle can get. For instance, if you have a scenario such as:

```css
.some-pretty-long-css-selector {
	color: var(--color-white);
}

.another-pretty-long-css-selector {
	@extend .some-pretty-long-css-selector;
	background-color: var(--color-black);
}

// This has deminishing return cause it compiles down as:
.some-pretty-long-css-selector,
.another-prettylong-css-selector {
	color: #fff;
}

.another-prettylong-css-selector {
	background-color: #000;
}

// Where as without extending, and just writing color again would be a smaller:
.some-pretty-long-css-selector { color: #fff; }
.another-prettylong-css-selector {
	color: #fff;
	background-color: #000;
}

```

## Mixins
Mixins are like style extending from above but without the concern of diminishing returns and the added benefits of being able to pass values to them for different results. Mixins can be found in `src/variables/mixins.css` and are defined by using the `@define-mixin [name] ([arguments])` rule.

```css
@define-mixin aspect-ratio (--width, --height) {
  position: relative;

  &:before {
    content: '';
    display: block;
    padding-top: percentage(var(--height) / var(--width));
    position: relative;
    z-index: 1;
  }
}
```

To use a mixin, simple call out `@mixin` and the name of wanted mixin like so:
```css
.some-selector {
	@mixin aspect-ratio 340px, 400px;
}
```


## Zindex
Z-index can get kinda crazy over the lifetime development. Nothing is worse than getting a great site up and going out in production, to only to find out that modals have a higher z-index than primary site navigation.
Using `src/variables/zindex.css`, developers now have a defined set of z-indexes to use as normal variables throughout the project CSS authoring to ensure everyone is on the same level from component to component.

```css
.some-selector {
	position: relative;
	z-index: var(--zindex--content);
}

.navigation {
	position: relative;
	z-index: var(--zindex--nav);
}
```

## Responsive typography
As mentioned above in the Fonts & Typography section, Unslated comes with responsive typography out of the box.
Simply define what font-sizes and pixel screen size ranges to use, and a smooth transition between the two font-sizes will occur between the two define screen sizes.

Things like large headings or akward typography that normally would be a pain or impossible to resize across normal media queries is now easy with responsive typography.

```css
.some-selector {
	font-size: rem(32px); // fallback size if browser is too old (aka IE10)
	font-range: 320px 768px; // define screensize range
	font-size: responsive rem(26px) rem(32px); // define font size range
}

// compiles down to the following:
.some-selector {
	font-size: 2rem;
    font-size: calc(1.3rem + 0.7 * ((100vw - 16rem) / 22.4));
}
```
