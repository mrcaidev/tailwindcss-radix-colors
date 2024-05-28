import * as radixColors from "@radix-ui/colors";
import {
  parseColorName,
  type Color,
  type ColorNameComponents,
  type Palette,
} from "./colors";
import type { TailwindcssRadixColorsOptions } from "./options";

/**
 * Build the config part of `tailwindcss-radix-colors`, which will be used as
 * the second argument of the `plugin.withOptions` function.
 *
 * This configuration **completely overrides** Tailwind color palette.
 *
 * @see https://tailwindcss.com/docs/plugins#extending-the-configuration
 */
export function createConfig(options: TailwindcssRadixColorsOptions = {}) {
  return {
    theme: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "black",
        white: "white",
        ...transform(radixColors, options),
      },
    },
  };
}

/**
 * Transform Radix color palette into Tailwind format.
 *
 * Radix color palette looks like:
 *
 * ```json
 * {
 *   "blueDark": {
 *     "blue1": "...",
 *     "blue2": "...",
 *     // ... other scales
 *     "blue12": "..."
 *   }
 *   // ... other colors
 * }
 * ```
 *
 * Tailwind format looks like:
 *
 * ```json
 * {
 *   "bluedark": {
 *     "1": "...",
 *     "2": "...",
 *     // ... other scales
 *     "12": "..."
 *   }
 *   // ... other colors
 * }
 * ```
 *
 * @see https://tailwindcss.com/docs/customizing-colors#using-custom-colors
 */
function transform(
  radixPalette: Palette,
  options: TailwindcssRadixColorsOptions,
) {
  const { include = undefined, exclude = [] } = options;
  const checkShouldInclude = createChecker(include, exclude);

  const tailwindPalette: Palette = {};

  for (const [radixColorName, radixColor] of Object.entries(radixPalette)) {
    const shouldInclude = checkShouldInclude(radixColorName);

    if (!shouldInclude) {
      continue;
    }

    const tailwindColorName = radixColorName.toLowerCase();

    const tailwindColor: Color = {};
    for (const [radixColorScale, colorValue] of Object.entries(radixColor)) {
      const tailwindColorScale = radixColorScale.match(/\d+$/)?.[0];
      if (tailwindColorScale) {
        tailwindColor[tailwindColorScale] = colorValue;
      }
    }

    tailwindPalette[tailwindColorName] = tailwindColor;
  }

  return tailwindPalette;
}

/**
 * Create a function that checks whether a color name should be included, i.e.
 * transformed and added to the new color palette.
 */
function createChecker(include: string[] | undefined, exclude: string[]) {
  const parsedInclude = include?.map(parseColorName);
  const parsedExclude = exclude.map(parseColorName);

  return (candidate: string) => {
    const parsedCandidate = parseColorName(candidate);

    if (
      parsedInclude &&
      !parsedInclude.some((colorName) => match(colorName, parsedCandidate))
    ) {
      return false;
    }

    if (parsedExclude.some((colorName) => match(colorName, parsedCandidate))) {
      return false;
    }

    return true;
  };
}

/**
 * Check whether two color names matches.
 *
 * @note A base color and its dark variant are considered a successful match.
 * This is because we cannot include only one but not both; otherwise, the
 * automatic dark mode support of semantic classes will not work. Even if the
 * user has explicitly disabled the the usage of semantic classes, it is still
 * better to keep this behavior, for the following reasons:
 *
 * 1. The user may well still want dark mode, but prefers to style it manually.
 * 2. Behavior stays consistent before and after semantic classes are disabled.
 * 3. Avoid "options-drilling" for better DX. Otherwise you will have to pass
 * the option `disableSemantics` all the way down to this function.
 */
function match(a: ColorNameComponents, b: ColorNameComponents) {
  return a.base === b.base && a.p3 === b.p3 && a.alpha === b.alpha;
}
