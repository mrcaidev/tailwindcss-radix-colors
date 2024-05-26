import * as radixColors from "@radix-ui/colors";

/**
 * Build the "config" part of `tailwindcss-radix-colors`, which will be used as
 * the second argument of the `plugin.withOptions` function.
 *
 * @note This configuration completely overrides Tailwind CSS color palette.
 *
 * @see https://tailwindcss.com/docs/plugins#extending-the-configuration
 */
export function buildConfig() {
  return {
    theme: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "black",
        white: "white",
        ...transform(radixColors),
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
function transform(radixPalette: typeof radixColors) {
  const tailwindPalette: Record<string, Record<string, string>> = {};

  for (const [radixColorName, radixColor] of Object.entries(radixPalette)) {
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
