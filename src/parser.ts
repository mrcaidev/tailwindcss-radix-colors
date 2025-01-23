export type ColorNameComponents = {
  base: string;
  dark: boolean;
  p3: boolean;
  alpha: boolean;
};

export function parseColorName(colorName: string) {
  const { base, dark, p3, alpha } =
    /^(?<base>.+?)(?<dark>dark)?(?<p3>p3)?(?<alpha>a)?$/i.exec(
      colorName,
    )!.groups!;

  return {
    base: base!,
    dark: dark !== undefined,
    p3: p3 !== undefined,
    alpha: alpha !== undefined,
  } satisfies ColorNameComponents;
}

export function buildColorName(components: ColorNameComponents) {
  const { base, dark, p3, alpha } = components;

  let colorName = base;

  if (dark) {
    colorName += "Dark";
  }

  if (p3) {
    colorName += "P3";
  }

  if (alpha) {
    colorName += "A";
  }

  return colorName;
}
