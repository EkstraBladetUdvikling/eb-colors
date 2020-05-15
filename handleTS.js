const fs = require("fs");
const file = fs.readFileSync("./temp/eb-colors-classes.json", "utf8");

/**
 * Create variable name
 * @param {string} selector
 * * If selector contains a dash, its removed and first letter after dash i uppercased
 */
function createVarName(selector) {
  let returnString = selector[0].toUpperCase() + selector.slice(1);
  if (returnString.indexOf("-") !== -1) {
    const splitSelector = returnString.split("-");
    returnString = `${
      splitSelector[0]
    }${splitSelector[1][0].toUpperCase()}${splitSelector[1].slice(1)}`;
  }
  return returnString;
}

const fileContentArray = [];

const objectWrapper = {
  hex: {},
  rgb: {}
};
const backgroundWrapper = {};
/**
 * Generate variables from hex values
 * * output example: export const Red = '#bd1118';
 * * Usage example: `color: ${Red};` or `color: rgb(${Colors.named.Red});`
 */
const values = JSON.parse(file).value;
const splitter = ".bg--";
values.forEach(cssRule => {
  if (cssRule.selectors[0].indexOf(splitter) !== -1) {
    const ruleName = cssRule.selectors[0].split(splitter)[1];
    const varName = createVarName(ruleName);
    const backgroundColor = cssRule.declarations.background;
    const declaration = `export const ${varName} = '${backgroundColor}'`;
    backgroundWrapper[varName] = {
      backgroundColor,
      color: cssRule.declarations.color
    };
    objectWrapper.hex[varName] = {
      color: backgroundColor
    };
    fileContentArray.push(declaration);

    const selector = cssRule.selectors[0].split(".")[1];

    const newClassRule = `export const ${varName}CSSClass = '${selector}'`;
    fileContentArray.push(newClassRule);
  }
});

/**
 * Generate variables from raw RGB values
 * * output example: export const RedRGB = '189,17,24';
 * * Usage example: `color: rgb(${RedRGB});` or `color: rgb(${Colors.rgb.Red});`
 */
const fileRGB = fs.readFileSync("./temp/eb-colors-vars-rgb.json", "utf8");
const valuesRGB = JSON.parse(fileRGB).value;
const splitterRGB = "--rgb-color--";
valuesRGB.forEach(cssRuleRGB => {
  for (const declaration in cssRuleRGB.declarations) {
    if (declaration.indexOf(splitterRGB) === 0) {
      const ruleName = declaration.split(splitterRGB)[1];
      const varName = createVarName(ruleName);
      const colorRGB = cssRuleRGB.declarations[declaration].join(",");
      const newRule = `export const ${varName}RGB = '${colorRGB}'`;
      objectWrapper.rgb[varName] = { color: colorRGB };
      fileContentArray.push(newRule);
    }
  }
});

const fileTS = fs.readFileSync("./ts-src/alpha.ts", "utf8");

const tsFileContent = `${fileContentArray.join(
  ";"
)};export const Colors = ${JSON.stringify(
  objectWrapper
)};export const Background = ${JSON.stringify(backgroundWrapper)}; ${fileTS}`;

fs.writeFileSync("./dist/eb-colors.ts", tsFileContent);

const { exec } = require("child_process");
exec(`tsc ./dist/eb-colors.ts --outDir ./dist`, err => {
  if (err) {
    // node couldn't execute the command
    return;
  }
  console.log(`typescript ./dist/eb-colors.ts -> ./dist/eb-colors.js`);
});
// fs.writeFileSync("./dist/eb-colors.js", tsFileContent);
