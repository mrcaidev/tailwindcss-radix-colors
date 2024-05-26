import type {
  CSSRuleObject,
  PluginAPI,
  PrefixConfig,
} from "tailwindcss/types/config";
import type { Color, ColorName, ColorScale, Palette } from "./types";

/**
 * Options for the plugin `tailwindcss-radix-colors`.
 */
export interface TailwindCSSRadixColorsOptions {
  /**
   * Disable the generation (and hence the intellisense) of semantics classes,
   * such as `bg-red-solid` or `text-slate-normal`.
   */
  disableSemantics?: boolean;
}

/**
 * Build the "plugin" part of `tailwindcss-radix-colors`, which will be used as
 * the first argument of the `plugin.withOptions` function.
 */
export function buildPlugin(options: TailwindCSSRadixColorsOptions = {}) {
  const { disableSemantics } = options;

  if (disableSemantics) {
    return () => {
      // Do nothing, since the only purpose of the "plugin" part is to generate
      // semantics classes.
    };
  }

  return createPlugin;
}

/**
 * Generate semantic classes via `addComponents`.
 *
 * These semantic classes will be generated for each base color (i.e. one
 * without suffixes like `dark`, `a` or `p3`). If the user extends the color
 * palette via `config.theme.extend.colors`, and that extended color has all 12
 * scales defined, then semantic classes will also be generated for them.
 *
 * @todo The extended color feature is not implemented yet.
 *
 * @see https://tailwindcss.com/docs/plugins#adding-components
 */
function createPlugin({ addComponents, config, theme }: PluginAPI) {
  const palette: Palette = theme("colors");
  const prefix = config<PrefixConfig>("prefix");

  for (const [colorName, color] of Object.entries(palette)) {
    const shouldProcess = checkShouldProcess(colorName, color);

    if (!shouldProcess) {
      continue;
    }

    const { darkColor, foregroundColor } = findColorFamily(palette, colorName);

    addComponents({
      [`.bg-${colorName}-app`]: apply(
        `bg-[${color["1"]}]`,
        `${prefix}dark:bg-[${darkColor["1"]}]`,
      ),
      [`.bg-${colorName}-subtle`]: apply(
        `bg-[${color["2"]}]`,
        `${prefix}dark:bg-[${darkColor["2"]}]`,
      ),
      [`.bg-${colorName}-ui`]: apply(
        `bg-[${color["3"]}]`,
        `hover:bg-[${color["4"]}]`,
        `active:bg-[${color["5"]}]`,
        `${prefix}dark:bg-[${darkColor["3"]}]`,
        `${prefix}dark:hover:bg-[${darkColor["4"]}]`,
        `${prefix}dark:active:bg-[${darkColor["5"]}]`,
      ),
      [`.bg-${colorName}-ghost`]: apply(
        `bg-transparent`,
        `hover:bg-[${color["4"]}]`,
        `active:bg-[${color["5"]}]`,
        `${prefix}dark:bg-transparent`,
        `${prefix}dark:hover:bg-[${darkColor["4"]}]`,
        `${prefix}dark:active:bg-[${darkColor["5"]}]`,
      ),
      [`.bg-${colorName}-action`]: apply(
        `bg-[${color["4"]}]`,
        `hover:bg-[${color["5"]}]`,
        `active:bg-[${color["6"]}]`,
        `${prefix}dark:bg-[${darkColor["4"]}]`,
        `${prefix}dark:hover:bg-[${darkColor["5"]}]`,
        `${prefix}dark:active:bg-[${darkColor["6"]}]`,
      ),
      [`.bg-${colorName}-solid`]: apply(
        `bg-[${color["9"]}]`,
        `hover:bg-[${color["10"]}]`,
        `${prefix}dark:bg-[${darkColor["9"]}]`,
        `${prefix}dark:hover:bg-[${darkColor["10"]}]`,
        `text-[${foregroundColor["12"]}]`,
      ),
      [`.border-${colorName}-dim`]: apply(
        `border-[${color["6"]}]`,
        `${prefix}dark:border-[${darkColor["6"]}]`,
      ),
      [`.border-${colorName}-normal`]: apply(
        `border-[${color["7"]}]`,
        `hover:border-[${color["8"]}]`,
        `${prefix}dark:border-[${darkColor["7"]}]`,
        `${prefix}dark:hover:border-[${darkColor["8"]}]`,
      ),
      [`.divide-${colorName}-dim`]: apply(
        `divide-[${color["6"]}]`,
        `${prefix}dark:divide-[${darkColor["6"]}]`,
      ),
      [`.divide-${colorName}-normal`]: apply(
        `divide-[${color["7"]}]`,
        `hover:divide-[${color["8"]}]`,
        `${prefix}dark:divide-[${darkColor["7"]}]`,
        `${prefix}dark:hover:divide-[${darkColor["8"]}]`,
      ),
      [`.text-${colorName}-dim`]: apply(
        `text-[${color["11"]}]`,
        `${prefix}dark:text-[${darkColor["11"]}]`,
      ),
      [`.text-${colorName}-normal`]: apply(
        `text-[${color["12"]}]`,
        `${prefix}dark:text-[${darkColor["12"]}]`,
      ),
    } as CSSRuleObject);
  }
}

/**
 * Every base color has its corresponding saturated gray scale, which can
 * create a more colorful and harmonious vibe, if used on the text against
 * the original color background.
 *
 * @see https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette#natural-pairing
 */
const foregroundColorPairs = {
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
  white: "gray", // Not officially specified.
  black: "graydark", // Not officially specified.
};

/**
 * Check if semantic classes should be generated for the given color.
 *
 * Colors that pass the check are assured to have all 12 scales defined, be it
 * Radix UI colors or user-extended colors.
 */
function checkShouldProcess(
  colorName: string,
  color: Color | string,
): color is Color {
  if (colorName.includes("dark")) {
    return false;
  }

  if (typeof color === "string") {
    return false;
  }

  // Radix UI colors are guaranteed to have all 12 scales, as long as the tests
  // pass. The loop below is intended to check user-extended colors.
  for (let scale = 1; scale <= 12; scale++) {
    if (!color[scale.toString() as ColorScale]) {
      console.warn(
        `Missing color scale ${colorName}.${scale.toString()}. In order to generate semantic classes, all 12 scales must be defined. If it is an intended behavior to leave some certain scales undefined, this warning can be safely ignored.`,
      );
      return false;
    }
  }

  return true;
}

/**
 * For a given base color, find its dark color and foreground color.
 *
 * For example, the dark color of "blue" is "bluedark", and the foreground
 * color is "slate".
 *
 * For the suffix "p3", it will be preserved in both dark color and foreground
 * colors. But for the suffix "a", it will only be preserved in dark color, as
 * it makes no sense to have a foreground text with alpha value.
 */
function findColorFamily(palette: Palette, colorName: string) {
  // Dark colors have already been filtered by `checkShouldProcess`, so there
  // is no need to put "dark" into regular expression again.
  const regex = colorName.match(/^(.+?)(a|p3|p3a)?$/);

  if (!regex) {
    throw new Error(`Invalid color name: ${colorName}`);
  }

  const baseColorName = regex[1] as keyof typeof foregroundColorPairs;
  const suffix = regex[2] ?? "";

  const darkColorName: ColorName =
    baseColorName === "black"
      ? `white${suffix}`
      : baseColorName === "white"
        ? `black${suffix}`
        : `${baseColorName}dark${suffix}`;

  const foregroundColorName = suffix.includes("p3")
    ? `${foregroundColorPairs[baseColorName]}p3`
    : foregroundColorPairs[baseColorName];

  const darkColor = palette[darkColorName] as Color;
  const foregroundColor = palette[foregroundColorName] as Color;

  return { darkColor, foregroundColor };
}

/**
 * Composite utility classes just like `@apply` rule.
 *
 * @see https://github.com/tailwindlabs/tailwindcss/discussions/2049
 */
function apply(...classes: string[]) {
  return { [`@apply ${classes.join(" ")}`]: {} };
}
