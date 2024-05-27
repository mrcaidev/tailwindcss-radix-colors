# Getting Started

**Tailwind Radix Colors** is a Tailwind plugin that brings [Radix UI](https://www.radix-ui.com/)'s color system to [Tailwind CSS](https://tailwindcss.com/).

It overrides [Tailwind's color palette](https://tailwindcss.com/docs/customizing-colors) with [Radix's](https://www.radix-ui.com/colors), and provides built-in support for dark mode, hover/active states, best foreground text color and more, via pre-composed [semantic classes](/semantic-first).

## Installation

This plugin requires Tailwind CSS version 3 or higher (`tailwindcss>=3.0.0`).

You can install this plugin with:

::: code-group

```sh [npm]
npm add -D tailwindcss-radix-colors
```

```sh [yarn]
yarn add -D tailwindcss-radix-colors
```

```sh [pnpm]
pnpm add -D tailwindcss-radix-colors
```

```sh [bun]
bun add -D tailwindcss-radix-colors
```

:::

## Setup

After installation, add this plugin to your Tailwind configuration file:

::: code-group

```ts{6} [tailwind.config.ts]
import type { Config } from "tailwindcss";
import tailwindcssRadixColors from "tailwindcss-radix-colors";

export default {
  // ... The rest of configuration
  plugins: [tailwindcssRadixColors],
} satisfies Config;
```

```js{6} [tailwind.config.mjs]
import tailwindcssRadixColors from "tailwindcss-radix-colors";

/** @type {import("tailwindcss").Config} */
export default {
  // ... The rest of configuration
  plugins: [tailwindcssRadixColors],
};
```

```js{4} [tailwind.config.cjs]
/** @type {import("tailwindcss").Config} */
module.exports = {
  // ... The rest of configuration
  plugins: [require("tailwindcss-radix-colors")],
};
```

:::

No configuration is required. Tailwind CSS will now use Radix UI's color palette instead of its own, and a bunch of semantic classes are ready to be used.

## Simple Usage

In Tailwind CSS, each color scales from 50 to 950. While in Radix UI, each color scales from 1 to 12. Consequently, you will now need to use `slate-1 red-3 blue-12`, instead of `slate-100 red-300 blue-950`.

For example, if you want to style a paragraph with a red background and a slate foreground:

::: code-group

```html [Now]
<p class="bg-red-2 text-slate-12 dark:bg-reddark-2 dark:text-slatedark-12">
  Hello world!
</p>
```

```html [Before]
<p class="bg-red-100 text-slate-900 dark:bg-red-900 dark:text-slate-100">
  Hello world!
</p>
```

:::

Or, if you want to style a ghost button:

::: code-group

```html [Now]
<button
  type="button"
  class="bg-transparent hover:bg-red-4 active:bg-red-5 dark:bg-transparent dark:hover:bg-reddark-4 dark:active:bg-reddark-5"
>
  Delete
</button>
```

```html [Before]
<button
  type="button"
  class="bg-transparent hover:bg-red-200 active:bg-red-300 dark:bg-transparent dark:hover:bg-red-800 dark:active:bg-red-700"
>
  Delete
</button>
```

:::

The reason why scale 4 and 5 are chosen in the example above is that they conform to Radix's [design guidelines](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale). However, it can be tedious to remember the recommended practice of color scale usage, especially for beginners. As such, this plugin also provides a set of semantic classes, so that you can simplify the examples above into just one class each:

::: code-group

```html [Now]
<p class="bg-red-subtle text-slate-normal">Hello world!</p>
```

```html [Before]
<p class="bg-red-2 text-slate-12 dark:bg-reddark-2 dark:text-slatedark-12">
  Hello world!
</p>
```

:::

::: code-group

```html [Now]
<button class="bg-red-ghost">Delete</button>
```

```html [Before]
<button
  class="bg-transparent hover:bg-red-4 active:bg-red-5 dark:bg-transparent dark:hover:bg-reddark-4 dark:active:bg-reddark-5"
>
  Delete
</button>
```

:::

Now the code is much cleaner!

For the complete list of semantic classes, please refer to [Semantic First](/semantic-first).
