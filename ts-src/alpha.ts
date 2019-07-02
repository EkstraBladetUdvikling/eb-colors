/**
 * @description Converting hex code to rgb
 * @param hex string
 */
function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

/**
 * @description Create rgba version of given color
 * @param color string takes EbColors
 * @param alpha number
 */
export const createAlpha = (color: string, alpha: number) => {
  let newColor = color;
  if (newColor.indexOf("#") === 0) {
    const newRgbAsObject = hexToRgb(color) || { r: 0, g: 0, b: 0 };
    newColor = `${newRgbAsObject.r},${newRgbAsObject.g},${newRgbAsObject.b}`;
  }
  console.log(`rgba(${newColor}, ${alpha})`);
  return `rgba(${newColor}, ${alpha})`;
};
