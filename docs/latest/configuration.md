# Configuration

## Disable Tailwind Colors

If you want to use Radix colors exclusively, you can disable all Tailwind colors by:

<!-- prettier-ignore -->
```css
@import "tailwindcss";
@theme { /* [!code ++] */
  --color-*: initial; /* [!code ++] */
} /* [!code ++] */
@import "tailwindcss-radix-colors/dist/red.css";
```

as documented in [Colors - Core Concepts - Tailwind CSS](https://tailwindcss.com/docs/colors#using-a-custom-palette).

> [!NOTE]
>
> This must be placed before any Radix color import. Otherwise, the imported Radix colors will also be disabled.

## Disable Component Classes

If you prefer Tailwind's utility-first philosophy, you can disable all component classes by:

```css
@import "tailwindcss";
@import "tailwindcss-radix-colors/dist/red.css"; /* [!code --] */
@import "tailwindcss-radix-colors/dist/red-colors-only.css"; /* [!code ++] */
```

## Mixing Tailwind and Radix

This has become pretty straightforward thanks to Tailwind CSS v4's [namespace](https://tailwindcss.com/docs/colors#disabling-default-colors) feature.

Here is an example, where we replaced Tailwind's red color with Radix's, but kept the rest.

:::code-group

```css [styles.css]
@import "tailwindcss";
@theme {
  --color-red-*: initial;
}
@import "tailwindcss-radix-colors/dist/red.css";
```

```html [index.html]
<div class="bg-red-9"></div>
<div class="bg-slate-200"></div>
```

:::
