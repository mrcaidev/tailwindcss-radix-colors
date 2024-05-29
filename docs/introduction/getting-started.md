# Getting Started

**Tailwind CSS Radix Colors** is a [Tailwind CSS](https://tailwindcss.com/) plugin that brings [Radix UI](https://www.radix-ui.com/)'s color system to Tailwind.

It overrides [Tailwind's color palette](https://tailwindcss.com/docs/customizing-colors) with [Radix's color palette](https://www.radix-ui.com/colors), and provides a bunch of shorthand classes for you to automatically handle dark mode, hover/active states, best foreground color and more, via pre-composed component classes.

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

```ts{2,6} [tailwind.config.ts]
import type { Config } from "tailwindcss";
import tailwindcssRadixColors from "tailwindcss-radix-colors";

export default {
  // ... The rest of configuration
  plugins: [tailwindcssRadixColors],
} satisfies Config;
```

```js{1,6} [tailwind.config.mjs]
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

No additional configuration is required. Tailwind CSS will now use Radix UI's color palette instead of its own.

## What's Next?

- To learn how to use this plugin, proceed to [Usage](/introduction/usage).
- To look up the configuration options, check out [Options](/reference/options).
- If you are curious about the differences between this plugin and other similar plugins, read [Why This Plugin?](/faq/why-this-plugin).
