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
    if (parseColorName(colorName).dark || !hasAllScales(color)) {
      continue;
    }

    const { darkColorName, foregroundColorName } = findFamily(colorName);

    const darkColor = palette[darkColorName];

    if (!darkColor || !hasAllScales(darkColor)) {
      continue;
    }

    const foregroundColor = palette[foregroundColorName];
    const shouldApplyForeground =
      foregroundColor && hasAllScales(foregroundColor);

    addComponents({
      [`.bg-${colorName}-app`]: apply(
        `bg-${colorName}-1`,
        `${prefix}dark:bg-${darkColorName}-1`,
      ),
      [`.bg-${colorName}-subtle`]: apply(
        `bg-${colorName}-2`,
        `${prefix}dark:bg-${darkColorName}-2`,
      ),
      [`.bg-${colorName}-ui`]: apply(
        `bg-${colorName}-3`,
        `hover:bg-${colorName}-4`,
        `active:bg-${colorName}-5`,
        `${prefix}dark:bg-${darkColorName}-3`,
        `${prefix}dark:hover:bg-${darkColorName}-4`,
        `${prefix}dark:active:bg-${darkColorName}-5`,
      ),
      [`.bg-${colorName}-ghost`]: apply(
        `bg-transparent`,
        `hover:bg-${colorName}-4`,
        `active:bg-${colorName}-5`,
        `${prefix}dark:bg-transparent`,
        `${prefix}dark:hover:bg-${darkColorName}-4`,
        `${prefix}dark:active:bg-${darkColorName}-5`,
      ),
      [`.bg-${colorName}-action`]: apply(
        `bg-${colorName}-4`,
        `hover:bg-${colorName}-5`,
        `active:bg-${colorName}-6`,
        `${prefix}dark:bg-${darkColorName}-4`,
        `${prefix}dark:hover:bg-${darkColorName}-5`,
        `${prefix}dark:active:bg-${darkColorName}-6`,
      ),
      [`.bg-${colorName}-solid`]: apply(
        `bg-${colorName}-9`,
        `hover:bg-${colorName}-10`,
        `${prefix}dark:bg-${darkColorName}-9`,
        `${prefix}dark:hover:bg-${darkColorName}-10`,
        shouldApplyForeground ? `text-${foregroundColorName}-12` : "",
      ),
      [`.border-${colorName}-dim`]: apply(
        `border-${colorName}-6`,
        `${prefix}dark:border-${darkColorName}-6`,
      ),
      [`.border-${colorName}-normal`]: apply(
        `border-${colorName}-7`,
        `hover:border-${colorName}-8`,
        `${prefix}dark:border-${darkColorName}-7`,
        `${prefix}dark:hover:border-${darkColorName}-8`,
      ),
      [`.divide-${colorName}-dim`]: apply(
        `divide-${colorName}-6`,
        `${prefix}dark:divide-${darkColorName}-6`,
      ),
      [`.divide-${colorName}-normal`]: apply(
        `divide-${colorName}-7`,
        `hover:divide-${colorName}-8`,
        `${prefix}dark:divide-${darkColorName}-7`,
        `${prefix}dark:hover:divide-${darkColorName}-8`,
      ),
      [`.text-${colorName}-dim`]: apply(
        `text-${colorName}-11`,
        `${prefix}dark:text-${darkColorName}-11`,
      ),
      [`.text-${colorName}-normal`]: apply(
        `text-${colorName}-12`,
        `${prefix}dark:text-${darkColorName}-12`,
      ),
    } as CSSRuleObject);
  }
}

/**
 * Check whether a color has all 12 scales needed to generate semantic classes.
 */
function hasAllScales(color: Color) {
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
  const processedClasses = classes
    .filter((className) => className !== "")
    .map((className) => className.replaceAll(" ", "_"));
  return { [`@apply ${processedClasses.join(" ")}`]: {} };
}
