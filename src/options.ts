import type { BaseColorName } from "./colors";

/**
 * 8 variants of each base color, plus 4 overlay colors.
 */
export type ColorName =
  | `${BaseColorName}`
  | `${BaseColorName}p3`
  | `${BaseColorName}a`
  | `${BaseColorName}p3a`
  | `${BaseColorName}dark`
  | `${BaseColorName}darkp3`
  | `${BaseColorName}darka`
  | `${BaseColorName}darkp3a`
  | "blacka"
  | "blackp3a"
  | "whitea"
  | "whitep3a";

/**
 * Options of plugin `tailwindcss-radix-colors`.
 */
export interface TailwindcssRadixColorsOptions {
  /**
   * Disable the Intellisense of semantic classes.
   *
   * @default false
   *
   * @see https://tailwindcss-radix-colors.mrcai.dev/options#disablesemantics
   */
  disableSemantics?: boolean;

  /**
   * Specifies an array of Radix color names that you want to see in
   * Intellisense.
   *
   * @default undefined
   *
   * @see https://tailwindcss-radix-colors.mrcai.dev/options#include
   */
  include?: ColorName[] | undefined;

  /**
   * Specifies an array of Radix color names that you do not want to see in
   * Intellisense. This applies after the `include` option is applied.
   *
   * @default []
   *
   * @see https://tailwindcss-radix-colors.mrcai.dev/options#exclude
   */
  exclude?: ColorName[];
}
