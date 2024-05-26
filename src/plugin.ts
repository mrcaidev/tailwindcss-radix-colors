import type {
  CSSRuleObject,
  PluginAPI,
  PluginCreator,
  PrefixConfig,
} from "tailwindcss/types/config";

/**
 * Options for the plugin `tailwindcss-radix-colors`.
 */
export interface TailwindCSSRadixColorsOptions {
  /**
   * Disable the semantics classes, such as `bg-red-solid`.
   */
  disableSemantics?: boolean;
}

/**
 * Build the plugin with user options.
 */
export function buildPlugin(options: TailwindCSSRadixColorsOptions = {}) {
  const { disableSemantics } = options;

  if (disableSemantics) {
    return () => 0;
  }

  return pluginCreator;
}

/**
 * Add component classes for convenience.
 *
 * @see https://tailwindcss.com/docs/plugins#adding-components
 */
const pluginCreator: PluginCreator = ({ addComponents, config, theme }) => {
  const colors: Record<string, Record<string, string> | string> =
    theme("colors");
  const prefix = config<PrefixConfig>("prefix");

  for (const [colorName, color] of Object.entries(colors)) {
    const shouldAddComponent = checkShouldAddComponent(colorName, color);

    if (!shouldAddComponent) {
      continue;
    }

    const { darkColor, grayScaleColor } = getColorFamily(theme, colorName);

    addComponents({
      [`.bg-${colorName}-app`]: apply(
        `bg-[${color["1"]!}]`,
        `${prefix}dark:bg-[${darkColor["1"]!}]`,
      ),
      [`.bg-${colorName}-subtle`]: apply(
        `bg-[${color["2"]!}]`,
        `${prefix}dark:bg-[${darkColor["2"]!}]`,
      ),
      [`.bg-${colorName}-ui`]: apply(
        `bg-[${color["3"]!}]`,
        `hover:bg-[${color["4"]!}]`,
        `active:bg-[${color["5"]!}]`,
        `${prefix}dark:bg-[${darkColor["3"]!}]`,
        `${prefix}dark:hover:bg-[${darkColor["4"]!}]`,
        `${prefix}dark:active:bg-[${darkColor["5"]!}]`,
      ),
      [`.bg-${colorName}-ghost`]: apply(
        `bg-transparent`,
        `hover:bg-[${color["4"]!}]`,
        `active:bg-[${color["5"]!}]`,
        `${prefix}dark:bg-transparent`,
        `${prefix}dark:hover:bg-[${darkColor["4"]!}]`,
        `${prefix}dark:active:bg-[${darkColor["5"]!}]`,
      ),
      [`.bg-${colorName}-action`]: apply(
        `bg-[${color["4"]!}]`,
        `hover:bg-[${color["5"]!}]`,
        `active:bg-[${color["6"]!}]`,
        `${prefix}dark:bg-[${darkColor["4"]!}]`,
        `${prefix}dark:hover:bg-[${darkColor["5"]!}]`,
        `${prefix}dark:active:bg-[${darkColor["6"]!}]`,
      ),
      [`.bg-${colorName}-solid`]: apply(
        `bg-[${color["9"]!}]`,
        `hover:bg-[${color["10"]!}]`,
        `${prefix}dark:bg-[${darkColor["9"]!}]`,
        `${prefix}dark:hover:bg-[${darkColor["10"]!}]`,
        `text-[${grayScaleColor["12"]!}]`,
      ),
      [`.border-${colorName}-dim`]: apply(
        `border-[${color["6"]!}]`,
        `${prefix}dark:border-[${darkColor["6"]!}]`,
      ),
      [`.border-${colorName}-normal`]: apply(
        `border-[${color["7"]!}]`,
        `hover:border-[${color["8"]!}]`,
        `${prefix}dark:border-[${darkColor["7"]!}]`,
        `${prefix}dark:hover:border-[${darkColor["8"]!}]`,
      ),
      [`.divide-${colorName}-dim`]: apply(
        `divide-[${color["6"]!}]`,
        `${prefix}dark:divide-[${darkColor["6"]!}]`,
      ),
      [`.divide-${colorName}-normal`]: apply(
        `divide-[${color["7"]!}]`,
        `hover:divide-[${color["8"]!}]`,
        `${prefix}dark:divide-[${darkColor["7"]!}]`,
        `${prefix}dark:hover:divide-[${darkColor["8"]!}]`,
      ),
      [`.text-${colorName}-dim`]: apply(
        `text-[${color["11"]!}]`,
        `${prefix}dark:text-[${darkColor["11"]!}]`,
      ),
      [`.text-${colorName}-normal`]: apply(
        `text-[${color["12"]!}]`,
        `${prefix}dark:text-[${darkColor["12"]!}]`,
      ),
    } as CSSRuleObject);
  }
};

/**
 * Every original color has its corresponding saturated gray scale,
 * which can create a more colorful and harmonious vibe,
 * if used on the text against the original color background.
 *
 * @see https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette#natural-pairing
 */
const grayScalePairs = {
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

function checkShouldAddComponent(
  colorName: string,
  color: Record<string, string> | string,
): color is Record<string, string> {
  if (colorName.includes("dark")) {
    return false;
  }

  if (typeof color === "string") {
    return false;
  }

  for (let scale = 1; scale <= 12; scale++) {
    if (!color[scale]) {
      console.warn(`Missing color scale ${scale.toString()} for ${colorName}`);
      return false;
    }
  }

  return true;
}

/**
 * Get the corresponding dark color and gray scale color of the original color.
 *
 * @example bluep3a -> bluedarkp3a, slatedarkp3a
 */
function getColorFamily(theme: PluginAPI["theme"], colorName: string) {
  const colorNameRegex = colorName.match(/^(.+?)(a|p3|p3a)?$/);
  if (!colorNameRegex) {
    throw new Error(`Invalid color name: ${colorName}`);
  }

  const originalColorName = colorNameRegex[1] as keyof typeof grayScalePairs;
  const suffix = colorNameRegex[2] ?? "";

  const darkColorName =
    originalColorName === "black"
      ? `white${suffix}`
      : originalColorName === "white"
        ? `black${suffix}`
        : `${originalColorName}dark${suffix}`;
  const grayScaleColorName = `${grayScalePairs[originalColorName]}${suffix}`;

  const darkColor: Record<string, string> = theme(`colors.${darkColorName}`);
  const grayScaleColor: Record<string, string> = theme(
    `colors.${grayScaleColorName}`,
  );

  return { darkColor, grayScaleColor };
}

function apply(...classes: string[]) {
  return { [`@apply ${classes.join(" ")}`]: {} };
}
