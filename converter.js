const child_process = require('child_process');
const fs = require('fs');

const { colors, colorPairs, colorPairsNamed, colorsNamed } = require('./colors.js');

(() => {
  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_M, R, G, B) => {
      return R + R + G + G + B + B;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function getPairName(pairName) {
    if (pairName.indexOf('pastel') !== -1) {
      return pairName.replace('pastel', 'pastel-');
    }
    if (pairName.indexOf('sex') !== -1) {
      return pairName.replace('sex', 'sex-');
    }
    return pairName;
  }

  const ColorsObj = { hex: {}, rgb: {} };

  const jsColorsContent = [];
  const convertedNames = JSON.parse(JSON.stringify(colorsNamed));
  const eachObj = { ...colors, ...convertedNames };

  for (const hexName in eachObj) {
    if (eachObj[hexName]) {
      const rgbObj = hexToRgb(eachObj[hexName]);
      ColorsObj.hex[hexName] = eachObj[hexName];
      ColorsObj.rgb[hexName] = `${rgbObj.r},${rgbObj.g},${rgbObj.b}`;

      // Add color const
      jsColorsContent.push(`export const ${hexName} = '${eachObj[hexName]}';`);

      // Add RGB color const
      jsColorsContent.push(`export const ${hexName}RBG = '${ColorsObj.rgb[hexName]}';`);

      // Add bg class const
      jsColorsContent.push(`export const ${hexName}BGClass = 'bg--${hexName}';`);

      // Add color class const
      jsColorsContent.push(`export const ${hexName}ColorClass = 'color--${hexName}';`);
    }
  }
  const mergedColorPairs = {
    ...colorPairs,
    ...colorPairsNamed,
  };
  jsColorsContent.push(`export const Colors = ${JSON.stringify(ColorsObj)};`);
  jsColorsContent.push(`export const Background = ${JSON.stringify(mergedColorPairs)};`);

  if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
  }

  fs.writeFileSync('./dist/eb-colors.js', jsColorsContent.join(''));
  fs.writeFileSync('./temp/eb-colors.ts', jsColorsContent.join(''));

  child_process.exec(`yarn tsc ./temp/eb-colors.ts --outDir ./dist/ -d --emitDeclarationOnly`);

  /**
   * Do CSS
   */
  const cssColorsVarsContent = [];
  const cssColorsRGBVarsContent = [];
  const cssColorsBGContent = [];
  const cssColorsClassContent = [];

  for (const pairName in mergedColorPairs) {
    const varName = getPairName(pairName);

    // Add hex css vars
    cssColorsVarsContent.push(
      `
      --color--${varName}: ${mergedColorPairs[pairName].background};
      --fgcolor--${varName}: ${mergedColorPairs[pairName].color};
      `
    );

    // Add rgb css vars
    const rgbObj = hexToRgb(mergedColorPairs[pairName].color);

    cssColorsRGBVarsContent.push(
      `
      --rgb-color--${varName}: ${ColorsObj.rgb[pairName]};
      --rgb-fgcolor--${varName}: ${rgbObj.r},${rgbObj.g},${rgbObj.b};
      `
    );

    // Add color class
    cssColorsClassContent.push(`.color--${varName} {
      color: var(--color--${varName});
    }`);

    // Add background color class
    cssColorsBGContent.push(`.bg--${varName} {
      background: var(--color--${varName});
      color: var(--fgcolor--${varName});
    }`);
  }

  // Write CSS vars file
  fs.writeFileSync(
    './dist/eb-colors-css-vars.css',
    `
    :root {
      ${cssColorsVarsContent.join('')}
    }
    `
  );

  // Write CSS RGB vars file
  fs.writeFileSync(
    './dist/eb-colors-vars-rgb.css',
    `
    :root {
      ${cssColorsRGBVarsContent.join('')}
    }
    `
  );

  // Write CSS class file
  fs.writeFileSync(
    './dist/eb-colors-classes.css',
    `
    ${cssColorsBGContent.join('')}
    ${cssColorsClassContent.join('')}
    `
  );

  // Write file with all css
  fs.writeFileSync(
    './dist/eb-colors-all.css',
    `
    :root {
      ${cssColorsVarsContent.join('')}
      ${cssColorsRGBVarsContent.join('')}
    }
    ${cssColorsBGContent.join('')}
    ${cssColorsClassContent.join('')}
    `
  );

  child_process.exec('yarn prettier ./dist --write');
})();
