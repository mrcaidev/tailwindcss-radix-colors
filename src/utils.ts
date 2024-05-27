export interface ParsedColorName {
  base: string;
  dark: boolean;
  p3: boolean;
  alpha: boolean;
}

/**
 * Parse a color name into:
 *
 * - base: The lowercase name of its base color.
 * - dark: Whether it is a dark variant.
 * - p3: Whether it is a P3 variant.
 * - alpha: Whether it is a alpha variant.
 */
export function parseColorName(colorName: string) {
  const matchGroups = colorName.match(
    /^(?<base>.+?)(?<dark>dark)?(?<p3>p3)?(?<alpha>a)?$/i,
  )?.groups;

  if (!matchGroups) {
    throw new Error(`Invalid color name: ${colorName}`);
  }

  const { base, dark, p3, alpha } = matchGroups;

  return {
    base: base?.toLowerCase() ?? "",
    dark: dark !== undefined,
    p3: p3 !== undefined,
    alpha: alpha !== undefined,
  } as ParsedColorName;
}

/**
 * Build a color name string from a parsed color name object.
 */
export function buildColorName(parsedColorName: ParsedColorName) {
  const { base, dark, p3, alpha } = parsedColorName;

  let colorName = base;

  if (dark) {
    colorName += "dark";
  }

  if (p3) {
    colorName += "p3";
  }

  if (alpha) {
    colorName += "a";
  }

  return colorName;
}
