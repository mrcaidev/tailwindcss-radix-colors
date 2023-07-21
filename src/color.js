const radixColors = require("@radix-ui/colors");

// Term             Description              Example
// ----             -----------              -------
// original color   opaque and light         red, green, blue
// alpha color      transparent and light    reda, greena, bluea

/**
 * Every original color has its corresponding saturated gray scale,
 * which can create a more colorful and harmonius vibe,
 * if used on the text against the original color background.
 *
 * @see https://www.radix-ui.com/docs/colors/palette-composition/composing-a-palette
 */
const grayScalePairs = {
  tomato: "mauvedark",
  red: "mauvedark",
  crimson: "mauvedark",
  pink: "mauvedark",
  plum: "mauvedark",
  purple: "mauvedark",
  violet: "mauvedark",
  mauve: "mauvedark",
  sky: "slate",
  indigo: "slatedark",
  blue: "slatedark",
  cyan: "slatedark",
  slate: "slatedark",
  mint: "sage",
  teal: "sagedark",
  green: "sagedark",
  sage: "sagedark",
  lime: "olive",
  grass: "olivedark",
  olive: "olivedark",
  yellow: "sand",
  amber: "sand",
  orange: "sanddark",
  brown: "sanddark",
  sand: "sanddark",
  white: "gray",
  gray: "graydark",
  gold: "graydark",
  bronze: "graydark",
  black: "graydark",
};

/**
 * All original color names.
 */
const originalColorNames = Object.keys(grayScalePairs);

/**
 * All alpha color names.
 */
const alphaColorNames = originalColorNames.map((name) => name + "a");

/**
 * Check if component classes should be generated for this color.
 * They should only be generated for light Radix colors.
 *
 * @example blue -> true, bluea -> true,
 *          bluedark -> false, bluedarka -> false
 *          custom -> false
 */
function getShouldAddComponent(colorName) {
  if (colorName === "black" || colorName === "white") {
    return false;
  }

  return (
    originalColorNames.includes(colorName) ||
    alphaColorNames.includes(colorName)
  );
}

/**
 * Convert the colors in Radix format to Tailwind format.
 *
 * @example blueDark.blue1 -> bluedark.1
 */
function formatRadixColors() {
  const colors = {};

  for (const [radixColorName, radixColor] of Object.entries(radixColors)) {
    const colorName = radixColorName.toLowerCase();
    const color = {};

    for (const [radixScale, value] of Object.entries(radixColor)) {
      const scaleRegex = radixScale.match(/\d+$/);
      if (!scaleRegex || !scaleRegex[0]) {
        continue;
      }
      const scale = scaleRegex[0];
      color[scale] = value;
    }

    colors[colorName] = color;
  }

  return colors;
}

/**
 * Given a light color name, return its original and dark color name.
 *
 * @example blue  -> (blue, bluedark)
 * @example bluea -> (blue, bluedarka)
 */
function getColorNameFamily(colorName) {
  if (colorName === "blacka") {
    return { originalColorName: "black", darkColorName: "whitea" };
  }

  if (colorName === "whitea") {
    return { originalColorName: "white", darkColorName: "blacka" };
  }

  if (alphaColorNames.includes(colorName)) {
    const originalColorName = colorName.slice(0, -1);
    return { originalColorName, darkColorName: originalColorName + "darka" };
  }

  return { originalColorName: colorName, darkColorName: colorName + "dark" };
}

/**
 * Given a light color name, return its dark color and gray scale.
 */
function getColorFamily(theme, colorName) {
  const { originalColorName, darkColorName } = getColorNameFamily(colorName);

  const darkColor = theme(`colors.${darkColorName}`);
  const grayScale = theme(`colors.${grayScalePairs[originalColorName]}`);

  return { darkColor, grayScale };
}

module.exports = {
  formatRadixColors,
  getColorFamily,
  getShouldAddComponent,
};
