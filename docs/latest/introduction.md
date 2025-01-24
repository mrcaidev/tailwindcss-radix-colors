# Introduction

> [!IMPORTANT]
>
> You are reading the documentation of plugin v2, which only supports Tailwind CSS [v4](https://tailwindcss.com/) and is NOT compatible with Tailwind CSS [v3](https://v3.tailwindcss.com/).
>
> If you are not yet ready to upgrade Tailwind CSS from v3 to v4, please stick with plugin v1 and refer to the [legacy documentation](/v1/introduction/getting-started) for guidance.

`tailwindcss-radix-colors` is a [Tailwind CSS](https://tailwindcss.com/) plugin that brings [Radix UI](https://www.radix-ui.com/)'s color system to Tailwind CSS.

## Radix Color Palette

This plugin provides Radix colors as a bunch of plain CSS files in [Tailwind format](https://tailwindcss.com/docs/colors#customizing-your-colors), from which you can freely import and even mix them with existing Tailwind ones.

A quick example:

:::code-group

```css [styles.css]
@import "tailwindcss";

@theme {
  /* This disables all Tailwind colors, but you don't have to. */
  --color-*: initial;
}

/* This imports "red" from Radix colors. */
@import "tailwindcss-radix-colors/dist/red.css";
```

```html [index.html]
<p class="text-red-12">Hello world!</p>
```

:::

## Baked-in Design Guidelines

Radix colors are supposed to work together with their [design guidelines](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale), but it could be hard and troublesome to remember them all.

Luckily, this plugin also offers some component classes, which have already followed these guidelines internally, so that you can easily apply the best design practices without any prior knowledge.

For example, in adherence to the guideline on [component backgrounds](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale#steps-35-component-backgrounds), we would have needed to write:

```html
<button
  class="bg-red-3 dark:bg-reddark-3 hover:bg-red-4 dark:hover:bg-reddark-4 active:bg-red-5 dark:active:bg-reddark-5"
>
  Submit
</button>
```

But this plugin lets you just write:

```html
<button class="bg-red-ui">Submit</button>
```

And that's it!

> Please refer to [Component Classes](/latest/component-classes) for a full list of available component classes.
