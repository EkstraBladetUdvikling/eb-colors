# EB Colors

`npm install ebudvikling/eb-colors`


## usage

To just get the variables and maps,  use the following

```scss
@import "node_modules/eb-colors/src/all.scss";
```

To get the variables, maps and classes created, use the following

```scss
@import "node_modules/eb-colors/src/all-with-classes.scss";
```

General colors can be imported from (eb main color is part of the general list)

```scss
@import "node_modules/eb-colors/src/general/all[-with-classes].scss";
```

Section specific colors can be imported from

```scss
@import "node_modules/eb-colors/src/sections/all[-with-classes].scss";
```

```cli
sass src/all-css-var.scss dist/eb-colors.css
```

## all colors

Found in src
Full map of all eb colors $eb-colors

## main colors

Found in src/general
Full map of section colors $eb-colors-general

| File names            | Map names                |
| ---                   | ---                      |
| _main.scss            | $eb-color-main           |
| _greyscale.scss       | $eb-color-greyscale      |
| _socialmedia.scss     | $eb-color-socialmedia    |

## section specific colors

Found in src/sections

Full map of section colors $eb-colors-sections

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

## color functions

The following functions are only include when using one of the three collection options (all, general or sections)  

### background (background-color: & color:)

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
