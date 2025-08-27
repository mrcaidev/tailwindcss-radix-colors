export type ColorNameComponents = {
  base: string;
  dark: boolean;
  p3: boolean;
  alpha: boolean;
};

export function parseColorName(colorName: string): ColorNameComponents {
  // biome-ignore lint/style/noNonNullAssertion: We know @radix-ui/colors exports follow this rule.
  const { base, dark, p3, alpha } = colorName.match(
    /^(?<base>.+?)(?<dark>Dark)?(?<p3>P3)?(?<alpha>A)?$/,
  )!.groups!;

  return {
    // biome-ignore lint/style/noNonNullAssertion: There must be a base.
    base: base!,
    dark: dark !== undefined,
    p3: p3 !== undefined,
    alpha: alpha !== undefined,
  };
}

export function buildColorName(components: ColorNameComponents): string {
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

export function parseScale(scale: string): number {
  const match = scale.match(/\d+$/);
  return match ? Number(match[0]) : 0;
}
