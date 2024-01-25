import type {
  CSSRuleObject,
  PluginAPI,
  PluginCreator,
} from "tailwindcss/types/config";
import { buildDarkSelector } from "./dark";

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
  const darkSelector = buildDarkSelector(config);
  const colors: Record<string, Record<string, string>> = theme("colors");

  for (const [colorName, color] of Object.entries(colors)) {
    if (
      colorName.includes("dark") ||
      ["transparent", "current", "black", "white"].includes(colorName)
    ) {
      continue;
    }

    const { darkColor, grayScaleColor } = getColorFamily(theme, colorName);

    addComponents({
      [`.bg-${colorName}-app`]: {
        backgroundColor: color["1"],
        [darkSelector]: {
          backgroundColor: darkColor["1"],
        },
      },
      [`.bg-${colorName}-subtle`]: {
        backgroundColor: color["2"],
        [darkSelector]: {
          backgroundColor: darkColor["2"],
        },
      },
      [`.bg-${colorName}-ui`]: {
        backgroundColor: color["3"],
        "&:hover": {
          backgroundColor: color["4"],
        },
        "&:active": {
          backgroundColor: color["5"],
        },
        [darkSelector]: {
          backgroundColor: darkColor["3"],
          "&:hover": {
            backgroundColor: darkColor["4"],
          },
          "&:active": {
            backgroundColor: darkColor["5"],
          },
        },
      },
      [`.bg-${colorName}-ghost`]: {
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: color["4"],
        },
        "&:active": {
          backgroundColor: color["5"],
        },
        [darkSelector]: {
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: darkColor["4"],
          },
          "&:active": {
            backgroundColor: darkColor["5"],
          },
        },
      },
      [`.bg-${colorName}-action`]: {
        backgroundColor: color["4"],
        "&:hover": {
          backgroundColor: color["5"],
        },
        "&:active": {
          backgroundColor: color["6"],
        },
        [darkSelector]: {
          backgroundColor: darkColor["4"],
          "&:hover": {
            backgroundColor: darkColor["5"],
          },
          "&:active": {
            backgroundColor: darkColor["6"],
          },
        },
      },
      [`.bg-${colorName}-solid`]: {
        backgroundColor: color["9"],
        color: grayScaleColor["12"],
        "&:hover": {
          backgroundColor: color["10"],
        },
        [darkSelector]: {
          backgroundColor: darkColor["9"],
          "&:hover": {
            backgroundColor: darkColor["10"],
          },
        },
      },
      [`.border-${colorName}-dim`]: {
        borderColor: color["6"],
        [darkSelector]: {
          borderColor: darkColor["6"],
        },
      },
      [`.border-${colorName}-normal`]: {
        borderColor: color["7"],
        "&:hover": {
          borderColor: color["8"],
        },
        [darkSelector]: {
          borderColor: darkColor["7"],
          "&:hover": {
            borderColor: darkColor["8"],
          },
        },
      },
      [`.divide-${colorName}-dim`]: {
        "& > :not([hidden]) ~ :not([hidden])": {
          borderColor: color["6"],
          [darkSelector]: {
            borderColor: darkColor["6"],
          },
        },
      },
      [`.divide-${colorName}-normal`]: {
        "& > :not([hidden]) ~ :not([hidden])": {
          borderColor: color["7"],
          "&:hover": {
            borderColor: color["8"],
          },
          [darkSelector]: {
            borderColor: darkColor["7"],
            "&:hover": {
              borderColor: darkColor["8"],
            },
          },
        },
      },
      [`.text-${colorName}-dim`]: {
        color: color["11"],
        [darkSelector]: {
          color: darkColor["11"],
        },
      },
      [`.text-${colorName}-normal`]: {
        color: color["12"],
        [darkSelector]: {
          color: darkColor["12"],
        },
      },
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
