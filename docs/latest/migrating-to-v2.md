# Migrating to v2

Almost everything in v2 is a **breaking change**, because technically speaking, this is not even a plugin anymore, but rather just a bunch of CSS files for you to import.

As the configuration style of Tailwind CSS v4 is drastically different from that in v3, we suggest you to start from scratch and follow the steps in [Getting Started](/latest/getting-started).

## Opt-out to Opt-in

In plugin v1, all Radix colors are imported by default, because of the confidence that Tailwind CSS v3 will tree-shake all unused colors for us during compilation time. Opting-out (by setting options `include` and `exclude`) is merely an optimization for editor Intellisense, and has nearly zero impact on the final CSS bundle size.

However, this is no longer the case in Tailwind CSS v4, as the compiler no longer tree-shakes unused colors. Importing all colors at once will not only slow down your Intellisense, but also cause a significant increase in the final CSS bundle size.

As such, we have to shift the mindset from opt-out to opt-in. **In v2, every Radix color has to be explicitly imported to be available for use.**

```css
@import "tailwindcss-radix-colors/dist/red.css";
```

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
