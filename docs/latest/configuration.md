# Configuration

This plugin plays so well with Tailwind's new configuration style that most of the time you can simply refer to their [Customizing Your Colors](https://tailwindcss.com/docs/colors#customizing-your-colors) section for guidance on how to configure and customize.

Some typical use cases are illustrated below.

## Selective Imports

Instead of importing all Radix colors at once with `all.css`, you can choose which specific colors and variants to import with the more specific `[color].css`.

```css
@import "tailwindcss";
@import "tailwindcss-radix-colors/dist/red.css"; /* [!code ++] */
@import "tailwindcss-radix-colors/dist/greenp3.css"; /* [!code ++] */
@import "tailwindcss-radix-colors/dist/bluep3a.css"; /* [!code ++] */
```

Note that there is no `[color]dark.css`, because the dark variant of a color is always imported together with its light variant. For example, `red.css` imports both "red" and "reddark", and `greenp3.css` imports both "greenp3" and "greendarkp3".

> [!IMPORTANT]
>
> At the time plugin v2 was first released, we discouraged the use of `all.css` in favor of `[color].css`, because Tailwind CSS was not yet able to treeshake unused color variables.
>
> Since Tailwind CSS [v4.0.8](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.0.8) ([#16211](https://github.com/tailwindlabs/tailwindcss/pull/16211)), this constraint has been lifted, and you can now use `all.css` without worrying about unused colors being included in your final build.
>
> However, `all.css` might still slow down your Intellisense. If you ever feel like your editor is lagging because of too many Tailwind classes, try the `[color].css` approach instead.

## Disable Semantic Classes

If you prefer to stick with Tailwind's utility-first philosophy, you can disable all semantic classes by importing `[color]-colors-only.css` instead.

```css
@import "tailwindcss";
@import "tailwindcss-radix-colors/dist/red.css"; /* [!code --] */
@import "tailwindcss-radix-colors/dist/red-colors-only.css"; /* [!code ++] */
```

As you can guess, `all.css` also has its colors-only version.

```css
@import "tailwindcss";
@import "tailwindcss-radix-colors/dist/all.css"; /* [!code --] */
@import "tailwindcss-radix-colors/dist/all-colors-only.css"; /* [!code ++] */
```

## Mix Tailwind and Radix Colors

It is also possible to still keep Tailwind colors but opt in to Radix colors.

Below is an example where we keep all Tailwind colors but red, and then substitute it with Radix's red color.

:::code-group

```css [styles.css]
@import "tailwindcss";
@theme {
  --color-red-*: initial;
}
@import "tailwindcss-radix-colors/dist/red.css";
```

```html [index.html]
<!-- Red from Radix --->
<div class="bg-red-9"></div>
<!-- Others from Tailwind --->
<div class="bg-slate-200"></div>
```

:::
