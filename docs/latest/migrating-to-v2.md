# Migrating to v2

Almost everything in v2 is a **breaking change**, because technically speaking, this is not even a plugin anymore, but rather just a bunch of CSS files for you to import.

As the configuration style of Tailwind CSS v4 is drastically different from that in v3, we suggest you to start from scratch and follow the steps in [Getting Started](/latest/getting-started).

## Disable Semantics

In v1, we set `disableSemantics` to `true` to disable the generation of semantic classes.

In v2, we import the color CSS file with suffix `-colors-only` to achieve the same effect.

```css
/* Semantic classes enabled */
@import "tailwindcss-radix-colors/dist/red.css";
/* Semantic classes disabled */
@import "tailwindcss-radix-colors/dist/red-colors-only.css";
```

## Custom Colors

Follow [Tailwind's guide](https://tailwindcss.com/docs/colors#customizing-your-colors) to customize your own colors.

A quick example:

```css
@theme {
  --color-foo-1: #111;
  --color-foo-2: #222;
  --color-foo-3: #333;
  --color-foo-4: #444;
  --color-foo-5: #555;
  --color-foo-6: #666;
  --color-foo-7: #777;
  --color-foo-8: #888;
  --color-foo-9: #999;
  --color-foo-10: #aaa;
  --color-foo-11: #bbb;
  --color-foo-12: #ccc;
}
```

Unfortunately, we are no longer able to generate semantic classes for your custom colors, because there is currently no way for the plugin to perceive user-defined CSS. You will have to manually re-create them.
