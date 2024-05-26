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
