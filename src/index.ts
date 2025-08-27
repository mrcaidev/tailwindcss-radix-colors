import { rm } from "node:fs/promises";
import radixColors from "@radix-ui/colors";
import { buildColorName, parseColorName, parseScale } from "./parser";

// rm -rf dist
await rm("dist", { recursive: true, force: true });

// [color].css & [color]-colors-only.css
for (const [radixColorName, radixColor] of Object.entries(radixColors)) {
  const { dark, ...rest } = parseColorName(radixColorName);

  // Dark variant will be handled together with its light variant.
  if (dark) {
    continue;
  }

  const radixDarkColorName = buildColorName({ ...rest, dark: true });
  const radixDarkColor =
    radixColors[radixDarkColorName as keyof typeof radixColors];

  const colorName = radixColorName.toLowerCase();
  const darkColorName = radixDarkColorName.toLowerCase();

  const theme = [
    "@theme {",
    // Light variant.
    ...Object.entries(radixColor).map(
      ([scale, value]) =>
        `  --color-${colorName}-${parseScale(scale)}: ${value};`,
    ),
    // Dark variant.
    ...Object.entries(radixDarkColor ?? {}).map(
      ([scale, value]) =>
        `  --color-${darkColorName}-${parseScale(scale)}: ${value};`,
    ),
    "}",
  ].join("\n");

  const layer = radixDarkColor
    ? [
        `@utility bg-${colorName}-app {`,
        `  @apply bg-${colorName}-1 dark:bg-${darkColorName}-1;`,
        "}",
        `@utility bg-${colorName}-subtle {`,
        `  @apply bg-${colorName}-2 dark:bg-${darkColorName}-2;`,
        "}",
        `@utility bg-${colorName}-ui {`,
        `  @apply bg-${colorName}-3 dark:bg-${darkColorName}-3 hover:bg-${colorName}-4 dark:hover:bg-${darkColorName}-4 active:bg-${colorName}-5 dark:active:bg-${darkColorName}-5;`,
        "}",
        `@utility bg-${colorName}-ghost {`,
        `  @apply bg-transparent dark:bg-transparent hover:bg-${colorName}-3 dark:hover:bg-${darkColorName}-3 active:bg-${colorName}-4 dark:active:bg-${darkColorName}-4;`,
        "}",
        `@utility bg-${colorName}-action {`,
        `  @apply bg-${colorName}-4 dark:bg-${darkColorName}-4 hover:bg-${colorName}-5 dark:hover:bg-${darkColorName}-5 active:bg-${colorName}-6 dark:active:bg-${darkColorName}-6;`,
        "}",
        `@utility bg-${colorName}-solid {`,
        `  @apply bg-${colorName}-9 dark:bg-${darkColorName}-9 hover:bg-${colorName}-10 dark:hover:bg-${darkColorName}-10;`,
        "}",
        `@utility border-${colorName}-dim {`,
        `  @apply border-${colorName}-6 dark:border-${darkColorName}-6;`,
        "}",
        `@utility border-${colorName}-normal {`,
        `  @apply border-${colorName}-7 dark:border-${darkColorName}-7 hover:border-${colorName}-8 dark:hover:border-${darkColorName}-8;`,
        "}",
        `@utility divide-${colorName}-dim {`,
        `  @apply divide-${colorName}-6 dark:divide-${darkColorName}-6;`,
        "}",
        `@utility divide-${colorName}-normal {`,
        `  @apply divide-${colorName}-7 dark:divide-${darkColorName}-7 hover:divide-${colorName}-8 dark:hover:divide-${darkColorName}-8;`,
        "}",
        `@utility text-${colorName}-dim {`,
        `  @apply text-${colorName}-11 dark:text-${darkColorName}-11;`,
        "}",
        `@utility text-${colorName}-normal {`,
        `  @apply text-${colorName}-12 dark:text-${darkColorName}-12;`,
        "}",
      ].join("\n")
    : "";

  Bun.write(`dist/${colorName}-colors-only.css`, theme);
  Bun.write(
    `dist/${colorName}.css`,
    `@import "./${colorName}-colors-only.css";\n${layer}`,
  );
}

// all.css
Bun.write(
  "dist/all.css",
  Object.keys(radixColors)
    .filter((radixColorName) => !parseColorName(radixColorName).dark)
    .map((radixColorName) => `@import "./${radixColorName.toLowerCase()}.css";`)
    .join("\n"),
);

// all-colors-only.css
Bun.write(
  "dist/all-colors-only.css",
  Object.keys(radixColors)
    .filter((radixColorName) => !parseColorName(radixColorName).dark)
    .map(
      (radixColorName) =>
        `@import "./${radixColorName.toLowerCase()}-colors-only.css";`,
    )
    .join("\n"),
);
