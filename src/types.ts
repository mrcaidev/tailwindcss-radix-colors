export type ColorName = string;
export type ColorScale =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";
export type ColorValue = string;

export type Color = Record<ColorScale, ColorValue>;
export type Palette = Record<ColorName, Color | string>;

/**
 * Options of the plugin `tailwindcss-radix-colors`.
 */
export interface TailwindcssRadixColorsOptions {
  /**
   * Disable the generation (and hence the intellisense) of semantics classes,
   * such as `bg-red-solid` or `text-slate-normal`.
   *
   * @default false
   *
   * @note This option does not affect the final CSS bundle size; Tailwind CSS
   * will shake off unused colors for you anyway. It only affects the colors
   * that appear in your IDE intellisense, so that you will not be overwhelmed
   * by the colors you don't even use.
   */
  disableSemantics?: boolean;

  /**
   * Name of the colors you want to use in your project.
   *
   * @default undefined // All colors are included.
   *
   * @note This option does not affect the final CSS bundle size; Tailwind CSS
   * will shake off unused colors for you anyway. It only affects the colors
   * that appear in your IDE intellisense, so that you will not be overwhelmed
   * by the colors you don't even use.
   *
   * @example ["red", "greena", "bluep3"]
   */
  include?: string[] | undefined;

  /**
   * Name of the colors you don't want to use in your project. The exclusion is
   * applied after the inclusion.
   *
   * @default [] // No colors are excluded.
   *
   * @note This option does not affect the final CSS bundle size; Tailwind CSS
   * will shake off unused colors for you anyway. It only affects the colors
   * that appear in your IDE intellisense, so that you will not be overwhelmed
   * by the colors you don't even use.
   *
   * @example ["red", "greena", "bluep3"]
   */
  exclude?: string[];
}
