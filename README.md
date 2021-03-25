# EB Colors

Version: 2.2.0

> EB colors for CSS (SCSS only available through repo)

## Installation

```bash
npm install "@ekstra-bladet/eb-colors" --save
```

## CSS Usage

### All CSS classes (NPM module)

```css
@import "node_modules/@ekstra-bladet/eb-colors/dist/eb-colors-classes.css";
```

```html
<div class="bg--white color--red">
  White background <br/>
  Red color
</div>
```

### HEX CSS variables

```css
@import "node_modules/@ekstra-bladet/eb-colors/dist/eb-colors-css-vars.css";

.use-hex-color {
  background: var(--color--red);
  color: var(--fgcolor--red);
}
```

### RGB CSS variables

```css
@import "node_modules/@ekstra-bladet/eb-colors/dist/eb-colors-vars-rgb.css";

.use-rgb-color {
  background: rgb(var(--rgb-color--red));
}
```

## SCSS Usage (Not availiable in NPM module)

Variables and maps:

```scss
@import "node_modules/@ekstra-bladet/eb-colors/src/all.scss";
```

Variables, maps and classes:

```scss
@import "node_modules/@ekstra-bladet/eb-colors/src/all-with-classes.scss";
```

General colors:

```scss
@import "node_modules/@ekstra-bladet/eb-colors/src/general/all[-with-classes].scss";
```

All Section specific colors:

```scss
@import "node_modules/@ekstra-bladet/eb-colors/src/sections/all[-with-classes].scss";
```

### All colors

Found in [src/colors](src/colors)

Full map of all colors `$eb-colors-colors`

| File names            | Map names                |
| ---                   | ---                      |
| _blue.scss            | $eb-color-blue           |
| _green.scss           | $eb-color-green          |
| _greyscale.scss       | $eb-color-greyscale      |
| _orange.scss          | $eb-color-orange         |
| _pastel.scss          | $eb-color-pastel         |
| _red.scss             | $eb-color-red            |
| _yellow.scss          | $eb-color-yellow         |

### Main colors

Found in [src/general](src/general)

Full map of general colors `$eb-colors-general`

| File names            | Map names                |
| ---                   | ---                      |
| _main.scss            | $eb-color-main           |
| _socialmedia.scss     | $eb-color-socialmedia    |

### Section specific colors

Found in [src/sections](src/sections)

Full map of section colors `$eb-colors-sections`

| File names            | Map names                 |
| ---                   | ---                       |
| _ekstra.scss          | $eb-color-ekstra          |
| _flash.scss           | $eb-color-flash           |
| _forbrug.scss         | $eb-color-forbrug         |
| _leder.scss           | $eb-color-leder           |
| _livescore.scss       | $eb-color-livescore       |
| _nationen.scss        | $eb-color-nationen        |
| _nyheder.scss         | $eb-color-nyheder         |
| _sex-samliv.scss      | $eb-color-sex-samliv      |
| _skolefodbold.scss    | $eb-color-skolefodbold    |
| _sport.scss           | $eb-color-sport           |
| _tv.scss              | $eb-color-tv              |
| _underholdning.scss   | $eb-color-underholdning   |

### Color functions

The following functions are include when using one of the three collection options (all, general or sections).

Without the included functions the colors can be accessed through [map-deep-get](https://css-tricks.com/snippets/sass/deep-getset-maps/#article-header-id-0)

#### Example map structure

```scss
$eb-colors: (
  '[colorname]': map-get($eb-colors-colors, 'key'),
);
```

### Background (background-color: & color:)

Sets both background-color and color, to ensure correct usage

```scss
@import "node_modules/@ekstra-bladet/eb-colors/src/all";

.selector {
  @include .bg--[colorname];
}
```

### foreground (color:)

Returns the main color

```scss
@import "node_modules/@ekstra-bladet/eb-colors/src/all";

.selector {
  color: var(--color--[colorname]);
}
```

### Mapping colors

Each of general colors `$eb-colors-general` (found in [src/general](src/general)) & section colors `$eb-colors-sections` (found in [src/sections](src/sections)) are mapped from all colors `$eb-colors-colors`

```scss
$eb-color-[new-map-name]: (
  'sport' : map-get($eb-colors-colors, 'key'),
)
```

### CSS classes

CSS classes are generated after the following pattern

```css
.bg--[sectionname] {
    background-color: [main section color];
    color: [foreground section color];
}

.color--[sectionname] {
    color: [main section color];
}

/** Real world example */
.bg--eb {
    background-color: var(--color--eb);
    color: var(--fgcolor--eb);
}

.color--eb {
    color: var(--color--eb);
}
```

Working example

```html
<div class="bg--eb">
    This will have the eb background color and the corresponding foreground color.
</div>
```

## Color pallette

The colors and their names contained in eb-colors

![](example/eb-colors-example.png)

## Visual Studio Code Snippets

To use generated Visual Studio Code snippets for a project, make sure the Visual Studio Code configuration directory is present (%PROJECTROOT%/.vscode) and run following bash commands in project root:

```bash
curl -o .vscode/eb-colors-classes.code-snippets https://raw.githubusercontent.com/EkstraBladetUdvikling/eb-colors/master/snippets/eb-colors-classes.code-snippets
curl -o .vscode/eb-colors-css-vars.code-snippets https://raw.githubusercontent.com/EkstraBladetUdvikling/eb-colors/master/snippets/eb-colors-css-vars.code-snippets
curl -o .vscode/eb-colors-vars-rgb.code-snippets https://raw.githubusercontent.com/EkstraBladetUdvikling/eb-colors/master/snippets/eb-colors-vars-rgb.code-snippets
```

To enable snippets in .jsp files, add the following to user or workspace-settings:

```json
"files.associations": {
        "*.jsp": "html"
    }
```

## Development

To build the CSS variables version of eb-colors:

```bash
git clone git@github.com:EkstraBladetUdvikling/eb-colors.git
cd eb-colors
npm build
```

To build a new version of VS Code Snippets and Example:

```bash
git clone git@github.com:EkstraBladetUdvikling/eb-colors.git
cd eb-colors
npm run build-vscode-snippets
npm run example
```

## License

Apache-2 © Ekstra Bladet
