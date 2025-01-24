# Why Another Palette?

Tailwind CSS itself includes [a built-in color palette](https://tailwindcss.com/docs/customizing-colors) that is comprehensive, beautiful and easy to use. In many cases, especially for small, simple or prototype projects, it is definitely fine to just stay with the default palette.

However, you would probably want to try out Radix's color palette, for the following reasons.

## Semantic Meanings

Tailwind's color palette falls short, when we need to apply different color scales to indicate different component states, such as normal, hover or active, because each color varies too much between scales. And as a result, they look more like a set of completely unrelated colors, instead of a range of progressive steps.

Radix colors, on the other hand, is particularly designed to handle these states, by assigning a semantic meaning to each color scale. For example, "Step 3" stands for normal state, "Step 4" stands for hover state, "Step 5" stands for pressed or selected states, and so on. For a complete list of semantic meanings, please see [Understanding the Scale](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale).

It's also fine to use this plugin, even if you know nothing about the semantic meaning of each scale, or if you find it hard or boring to remember all those guidelines. This plugin provides a set of [semantic classes](/v1/guide/semantic-first), which internally adhere to Radix's design system and best practices. You can use these classes to apply different color scales to different states, without knowing the underlying design principles.

## P3 and Alpha Variants

For each color, Radix colors also provides its P3 and alpha variants.

P3 variants are colors in a color-space called [DCI-P3](https://en.wikipedia.org/wiki/DCI-P3), meant to be used for wide-gamut displays. This feature works across the latest devices and browser versions [since May 2023](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color#browser_compatibility).

Alpha variants are simply colors with an alpha channel (opacity). It can be convenient to use these colors to style modal backdrops or overlays.
