/**
 * All base color names in Radix palette.
 *
 * @note This list does not consider overlays, as they do not have a base color.
 * They are special colors that need special handling.
 *
 * @see https://www.radix-ui.com/colors/docs/palette-composition/scales
 */
export const baseColorNames = [
  "gray",
  "mauve",
  "slate",
  "sage",
  "olive",
  "sand",
  "gold",
  "bronze",
  "brown",
  "yellow",
  "amber",
  "orange",
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "mint",
  "sky",
] as const;

/**
 * All base color names in Radix palette.
 */
export type BaseColorName = (typeof baseColorNames)[number];

/**
 * Each base color has a corresponding saturated gray scale, which, if used on
 * the foreground against the base color background, can create a more colorful
 * and harmonious vibe.
 *
 * @see https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette#natural-pairing
 */
export const foregroundColorNamePairs: Record<BaseColorName, string> = {
  mauve: "mauvedark",
  tomato: "mauvedark",
  red: "mauvedark",
  ruby: "mauvedark",
  crimson: "mauvedark",
  pink: "mauvedark",
  plum: "mauvedark",
  purple: "mauvedark",
  violet: "mauvedark",
  slate: "slatedark",
  iris: "slatedark",
  indigo: "slatedark",
  blue: "slatedark",
  sky: "slate",
  cyan: "slatedark",
  sage: "sagedark",
  mint: "sage",
  teal: "sagedark",
  jade: "sagedark",
  green: "sagedark",
  olive: "olivedark",
  grass: "olivedark",
  lime: "olive",
  sand: "sanddark",
  yellow: "sand",
  amber: "sand",
  orange: "sanddark",
  brown: "sanddark",
  gold: "sanddark", // Not officially specified.
  bronze: "sanddark", // Not officially specified.
  gray: "graydark", // Not officially specified.
} as const;

/**
 * A map from color scale to color value.
 */
export type Color = Record<string, string> | string;

/**
 * A map from color name to color.
 */
export type Palette = Record<string, Color>;

/**
 * Property components of a color name.
 */
export interface ColorNameComponents {
  /**
   * Its base color name in lowercase.
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
 * Parse a given color name into components.
 */
export function parseColorName(colorName: string) {
  const matchGroups = colorName.match(
    /^(?<base>.+?)(?<dark>dark)?(?<p3>p3)?(?<alpha>a)?$/i,
  )?.groups;

  if (!matchGroups?.["base"]) {
    // Unreachable. The regular expression will always match.
    throw new Error(`Invalid color name: ${colorName}`);
  }

  const { base, dark, p3, alpha } = matchGroups;

  return {
    base: base.toLowerCase(),
    dark: dark !== undefined,
    p3: p3 !== undefined,
    alpha: alpha !== undefined,
  } as ColorNameComponents;
}

/**
 * Build a color name from given components.
 */
export function buildColorName(components: ColorNameComponents) {
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
