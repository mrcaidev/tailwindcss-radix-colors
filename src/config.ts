import * as radixColors from "@radix-ui/colors";
import type { TailwindcssRadixColorsOptions } from "./types";
import { parseColorName, type ParsedColorName } from "./utils";

/**
 * Build the "config" part of `tailwindcss-radix-colors`, which will be used as
 * the second argument of the `plugin.withOptions` function.
 *
 * @note This configuration completely overrides Tailwind CSS color palette.
 *
 * @see https://tailwindcss.com/docs/plugins#extending-the-configuration
 */
export function buildConfig(options: TailwindcssRadixColorsOptions = {}) {
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
 * Transform Radix UI's color palette into Tailwind CSS's format.
 *
 * Radix UI's color palette looks like:
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
 * It will be transformed into an object that looks like:
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
  radixPalette: typeof radixColors,
  options: TailwindcssRadixColorsOptions,
) {
  const { include = undefined, exclude = [] } = options;
  const checkShouldInclude = createChecker(include, exclude);

  const tailwindPalette: Record<string, Record<string, string>> = {};

  for (const [radixColorName, radixColor] of Object.entries(radixPalette)) {
    const shouldInclude = checkShouldInclude(radixColorName);

    if (!shouldInclude) {
      continue;
    }

    const tailwindColorName = radixColorName.toLowerCase();

    const tailwindColor: Record<string, string> = {};
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
 * transformed and added to the Tailwind CSS color palette.
 */
function createChecker(include: string[] | undefined, exclude: string[]) {
  const parsedInclude = include?.map(parseColorName);
  const parsedExclude = exclude.map(parseColorName);

  return (candidate: string) => {
    const parsedCandidate = parseColorName(candidate);

    if (
      include !== undefined &&
      !parsedInclude?.some((colorName) => areSame(colorName, parsedCandidate))
    ) {
      return false;
    }

    if (
      parsedExclude.some((colorName) => areSame(colorName, parsedCandidate))
    ) {
      return false;
    }

    return true;
  };
}

function areSame(name1: ParsedColorName, name2: ParsedColorName) {
  return (
    name1.base === name2.base &&
    name1.p3 === name2.p3 &&
    name1.alpha === name2.alpha
  );
}
