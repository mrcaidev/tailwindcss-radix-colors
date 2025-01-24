import radixColors from "@radix-ui/colors";
import { rm } from "fs/promises";
import { buildColorName, parseColorName } from "./parser";

// rm -rf dist
await rm("dist", { recursive: true, force: true });

// [color].css & [color]-colors-only.css
for (const radixColorName in radixColors) {
  const { dark, ...rest } = parseColorName(radixColorName);

  // Dark variant will be handled along with its light variant.
  if (dark) {
    continue;
  }

  const darkRadixColorName = buildColorName({ ...rest, dark: true });

  type Key = keyof typeof radixColors;
  const radixColor = radixColors[radixColorName as Key];
  const darkRadixColor = radixColors[darkRadixColorName as Key];

  const colorName = radixColorName.toLowerCase();
  const darkColorName = darkRadixColorName.toLowerCase();

  const theme = [
    "@theme {",
    // Light variant.
    ...Object.entries(radixColor).map(
      ([scale, value]) =>
        `  --color-${colorName}-${scale.match(/\d+/)![0]}: ${value};`,
    ),
    // Dark variant.
    ...Object.entries(darkRadixColor ?? {}).map(
      ([scale, value]) =>
        `  --color-${darkColorName}-${scale.match(/\d+/)![0]}: ${value};`,
    ),
    "}",
  ].join("\n");

  const layer = darkRadixColor
    ? [
        "@layer components {",
        `  .bg-${colorName}-app {`,
        `    @apply bg-${colorName}-1 dark:bg-${darkColorName}-1;`,
        "  }",
        `  .bg-${colorName}-subtle {`,
        `    @apply bg-${colorName}-2 dark:bg-${darkColorName}-2;`,
        "  }",
        `  .bg-${colorName}-ui {`,
        `    @apply bg-${colorName}-3 dark:bg-${darkColorName}-3 hover:bg-${colorName}-4 dark:hover:bg-${darkColorName}-4 active:bg-${colorName}-5 dark:active:bg-${darkColorName}-5;`,
        "  }",
        `  .bg-${colorName}-ghost {`,
        `    @apply bg-transparent dark:bg-transparent hover:bg-${colorName}-3 dark:hover:bg-${darkColorName}-3 active:bg-${colorName}-4 dark:active:bg-${darkColorName}-4;`,
        "  }",
        `  .bg-${colorName}-action {`,
        `    @apply bg-${colorName}-4 dark:bg-${darkColorName}-4 hover:bg-${colorName}-5 dark:hover:bg-${darkColorName}-5 active:bg-${colorName}-6 dark:active:bg-${darkColorName}-6;`,
        "  }",
        `  .bg-${colorName}-solid {`,
        `    @apply bg-${colorName}-9 dark:bg-${darkColorName}-9 hover:bg-${colorName}-10 dark:hover:bg-${darkColorName}-10;`,
        "  }",
        `  .border-${colorName}-dim {`,
        `    @apply border-${colorName}-6 dark:border-${darkColorName}-6;`,
        "  }",
        `  .border-${colorName}-normal {`,
        `    @apply border-${colorName}-7 dark:border-${darkColorName}-7 hover:border-${colorName}-8 dark:hover:border-${darkColorName}-8;`,
        "  }",
        `  .divide-${colorName}-dim {`,
        `    @apply divide-${colorName}-6 dark:divide-${darkColorName}-6;`,
        "  }",
        `  .divide-${colorName}-normal {`,
        `    @apply divide-${colorName}-7 dark:divide-${darkColorName}-7 hover:divide-${colorName}-8 dark:hover:divide-${darkColorName}-8;`,
        "  }",
        `  .text-${colorName}-dim {`,
        `    @apply text-${colorName}-11 dark:text-${darkColorName}-11;`,
        "  }",
        `  .text-${colorName}-normal {`,
        `    @apply text-${colorName}-12 dark:text-${darkColorName}-12;`,
        "  }",
        "}",
      ].join("\n")
    : "";

  Bun.write(
    `dist/${colorName}.css`,
    `@import "./${colorName}-colors-only.css";\n${layer}`,
  );
  Bun.write(`dist/${colorName}-colors-only.css`, theme);
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
