/**
 * A descriptive color name.
 *
 * @example "red", "greenp3a", "bluedark"
 */
export type ColorName = string;

/**
 * One single color can have many different scales.
 *
 * @example
 * 50, 100, 200, ..., 900, 950 // Tailwind
 * 1, 2, 3, ..., 11, 12 // Radix
 */
export type ColorScale = string;

/**
 * A hex notation or a `color` function.
 *
 * @example "#641723", "color(display-p3 0.36 0.115 0.143)"
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Color_values
 */
export type ColorValue = string;

/**
 * An object of different color scales and their color values, or a single
 * color value string.
 *
 * For those colors coming from Tailwind or Radix, they are always objects. For
 * user-customized colors, they can be either an object or a string.
 */
export type Color = Record<ColorScale, ColorValue> | ColorValue;

/**
 * A collection of colors.
 */
export type Palette = Record<ColorName, Color>;

/**
 * The components that together make up a color name.
 */
export interface ColorNameComponents {
  /**
   * Its base color name, in lowercase.
   */
  base: string;

  /**
   * Whether it is a dark variant.
   */
  dark: boolean;

  /**
   * Whether it is a P3 variant.
   */
  p3: boolean;

  /**
   * Whether it is an alpha variant.
   */
  alpha: boolean;
}

/**
 * Parse a given color name into its components.
 */
export function parseColorName(colorName: ColorName): ColorNameComponents {
  const matchGroups =
    /^(?<base>.+?)(?<dark>dark)?(?<p3>p3)?(?<alpha>a)?$/i.exec(colorName)!
      .groups!;

  const { base, dark, p3, alpha } = matchGroups;

  return {
    base: base!.toLowerCase(),
    dark: dark !== undefined,
    p3: p3 !== undefined,
    alpha: alpha !== undefined,
  };
}

/**
 * Build a color name from given components.
 */
export function buildColorName(components: ColorNameComponents): ColorName {
  const { base, dark, p3, alpha } = components;

  let colorName = base;

  if (dark) {
    colorName += "dark";
  }

  if (p3) {
    colorName += "p3";
  }

  if (alpha) {
    colorName += "a";
  }

  return colorName;
}
