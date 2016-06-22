# EB Colors

> EB colors for SCSS and CSS

## Installation

```bash
npm install ebudvikling/eb-colors
```

## Usage

Variables and maps:

```scss
@import "node_modules/eb-colors/src/all.scss";
```

Variables, maps and classes:

```scss
@import "node_modules/eb-colors/src/all-with-classes.scss";
```

General colors:

```scss
@import "node_modules/eb-colors/src/general/all[-with-classes].scss";
```

All Section specific colors:

```scss
@import "node_modules/eb-colors/src/sections/all[-with-classes].scss";
```

### All colors

Found in [src](src/)

Full map of all eb-colors `$eb-colors`

### Main colors

Found in [src/general](src/general)

Full map of section colors `$eb-colors-general`

| File names            | Map names                |
| ---                   | ---                      |
| _main.scss            | $eb-color-main           |
| _greyscale.scss       | $eb-color-greyscale      |
| _socialmedia.scss     | $eb-color-socialmedia    |

### Section specific colors

Found in [src/sections](src/sections)

Full map of section colors `$eb-colors-sections`

| File names            | Map names                 |
| ---                   | ---                       |
| _ekstra.scss          | $eb-color-ekstra          |
| _filmmagasinet.scss   | $eb-color-filmmagasinet   |
| _flash.scss           | $eb-color-flash           |
| _forbrug.scss         | $eb-color-forbrug         |
| _livescore.scss       | $eb-color-livescore       |
| _nationen.scss        | $eb-color-nationen        |
| _nyheder.scss         | $eb-color-nyheder         |
| _sex-samliv.scss      | $eb-color-sex-samliv      |
| _skolefodbold.scss    | $eb-color-skolefodbold    |
| _sport.scss           | $eb-color-sport           |
| _tv.scss              | $eb-color-tv              |

### Color functions

The following functions are include when using one of the three collection options (all, general or sections).

### Background (background-color: & color:)

Sets both background-color and color, to ensure correct usage

```scss
@import "node_modules/eb-colors/src/all";

.selector {
  @include eb-background('colorname');
}
```

### foreground (color:)

Returns the main color

```scss
@import "node_modules/eb-colors/src/all";

.selector {
  color: eb-color-get('colorname');
}
```

TODO: scss eksempel

## Color pallette

The colors and their names contained in eb-colors

![](example/eb-colors-example.png)

## Development

To build the CSS variables version of eb-colors:

```bash
sass src/all-css-var.scss dist/eb-colors.css
```

## License

Apache-2 © Ekstra Bladet
