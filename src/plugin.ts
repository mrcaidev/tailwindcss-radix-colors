import type {
  CSSRuleObject,
  PluginAPI,
  PrefixConfig,
} from "tailwindcss/types/config";
import {
  buildColorName,
  foregroundColorNamePairs,
  parseColorName,
  type BaseColorName,
  type Color,
  type Palette,
} from "./colors";
import type { TailwindcssRadixColorsOptions } from "./options";

/**
 * Build the plugin part of `tailwindcss-radix-colors`, which will be used as
 * the first argument of the `plugin.withOptions` function.
 */
export function createPlugin(options: TailwindcssRadixColorsOptions = {}) {
  const { disableSemantics } = options;

  if (disableSemantics) {
    return () => {
      // Do nothing, since the only purpose of the plugin part is to generate
      // semantics classes.
    };
  }

  return generateSemanticClasses;
}

/**
 * Generate semantic classes, via Tailwind's `addComponents` API.
 *
 * @see https://tailwindcss.com/docs/plugins#adding-components
 */
function generateSemanticClasses({ addComponents, config, theme }: PluginAPI) {
  const palette = theme<Palette>("colors");
  const prefix = config<PrefixConfig>("prefix");

  for (const [colorName, color] of Object.entries(palette)) {
    if (!hasAllScales(color)) {
      continue;
    }

    const { darkColorName, foregroundColorName } = findFamily(colorName);
    const darkColor = palette[darkColorName];
    const foregroundColor = palette[foregroundColorName];

    if (
      !darkColor ||
      !hasAllScales(darkColor) ||
      !foregroundColor ||
      !hasAllScales(foregroundColor)
    ) {
      continue;
    }

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
 * Check whether a color has all 12 scales needed to generate semantic classes.
 */
function hasAllScales(
  color: Color | string,
): color is Record<
  "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12",
  string
> {
  if (typeof color === "string") {
    return false;
  }

  for (let scale = 1; scale <= 12; scale++) {
    if (!color[scale]) {
      return false;
    }
  }

  return true;
}

/**
 * For a given base color name, find its corresponding dark color name and
 * foreground color name.
 */
function findFamily(colorName: string) {
  const { base, p3, alpha } = parseColorName(colorName);

  // blacka / blackp3a
  if (base === "black") {
    return {
      darkColorName: buildColorName({
        base: "white",
        dark: false,
        p3,
        alpha,
      }),
      foregroundColorName: buildColorName({
        base: "white",
        dark: false,
        p3,
        alpha: false,
      }),
    };
  }

  // whitea / whitep3a
  if (base === "white") {
    return {
      darkColorName: buildColorName({
        base: "black",
        dark: false,
        p3,
        alpha,
      }),
      foregroundColorName: buildColorName({
        base: "black",
        dark: false,
        p3,
        alpha: false,
      }),
    };
  }

  return {
    darkColorName: buildColorName({
      base,
      dark: true,
      p3,
      alpha,
    }),
    foregroundColorName: buildColorName({
      base: foregroundColorNamePairs[base as BaseColorName],
      dark: false,
      p3,
      alpha: false,
    }),
  };
}

/**
 * Composite utility classes using `@apply`.
 *
 * @see https://github.com/tailwindlabs/tailwindcss/discussions/2049
 */
function apply(...classes: string[]) {
  const processedClasses = classes.map((className) =>
    className.replaceAll(" ", "_"),
  );
  return { [`@apply ${processedClasses.join(" ")}`]: {} };
}
