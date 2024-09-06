type RadixBaseColorName =
  | "gray"
  | "mauve"
  | "slate"
  | "sage"
  | "olive"
  | "sand"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";

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
   * An array of Radix color names that you want to see in Intellisense.
   *
   * @default undefined
   *
   * @see https://tailwindcss-radix-colors.mrcai.dev/options#include
   */
  include?: string[] | undefined;

  /**
   * An array of Radix color names that you do not want to see in Intellisense.
   * This applies after the `include` option is applied.
   *
   * @default []
   *
   * @see https://tailwindcss-radix-colors.mrcai.dev/options#exclude
   */
  exclude?: string[];

  /**
   * A priority strategy to resolve color name conflicts between Radix and
   * Tailwind.
   *
   * - If `no-tailwind`, Tailwind color names will be completely wiped out.
   * - If `radix-first`, Radix color names will override Tailwind upon conflict.
   * - If `tailwind-first`, Tailwind color names will override Radix upon conflict.
   *
   * @default "no-tailwind"
   *
   * @see https://tailwindcss-radix-colors.mrcai.dev/options#priority
   */
  priority?: "no-tailwind" | "radix-first" | "tailwind-first";

  /**
   * Aliases of Radix color names.
   *
   * Useful when a Radix color name conflicts with a Tailwind one, and you are
   * trying to preserve both of them.
   *
   * @default {}
   *
   * @see https://tailwindcss-radix-colors.mrcai.dev/options#aliases
   */
  aliases?: Partial<Record<RadixBaseColorName, string>>;
}
