function hexToRgb(HEX: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  HEX = HEX.replace(shorthandRegex, (_M, R, G, B) => {
    return R + R + G + G + B + B;
  });

  const RESULT = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(HEX);
  return RESULT
    ? {
        b: parseInt(RESULT[3], 16),
        g: parseInt(RESULT[2], 16),
        r: parseInt(RESULT[1], 16)
      }
    : null;
}

export const createAlpha = (color: string, alpha: number) => {
  let newColor = color;
  if (newColor.indexOf("#") === 0) {
    const newRgbAsObject = hexToRgb(color) || { r: 0, g: 0, b: 0 };
    newColor = `${newRgbAsObject.r},${newRgbAsObject.g},${newRgbAsObject.b}`;
  }
  console.log(`rgba(${newColor}, ${alpha})`);
  return `rgba(${newColor}, ${alpha})`;
};
