# Plugin Options

No configuration is required for this plugin to take effect. However, you can still tweak the plugin's behavior, by passing an options object to the plugin function.

::: code-group

```ts{6} [tailwind.config.ts]
import type { Config } from "tailwindcss";
import tailwindcssRadixColors from "tailwindcss-radix-colors";

export default {
  // ... The rest of configuration
  plugins: [tailwindcssRadixColors({ ... })],
} satisfies Config;
```

```js{6} [tailwind.config.mjs]
import tailwindcssRadixColors from "tailwindcss-radix-colors";

/** @type {import("tailwindcss").Config} */
export default {
  // ... The rest of configuration
  plugins: [tailwindcssRadixColors({ ... })],
};
```

```js{4} [tailwind.config.cjs]
/** @type {import("tailwindcss").Config} */
module.exports = {
  // ... The rest of configuration
  plugins: [require("tailwindcss-radix-colors")({ ... })],
};
```

:::

The interface of the options is:

```ts
interface TailwindcssRadixColorsOptions {
  disableSemantics?: boolean;
  include?: string[] | undefined;
  exclude?: string[];
}
```

## disableSemantics

- Type: `boolean`
- Default: `false`

Disable the generation (and hence the IDE Intellisense) of [semantic classes](/guide/semantic-first), such as `bg-red-solid` or `text-slate-normal`. You will now only see [utility classes](/guide/utility-first) in your IDE Intellisense, such as `bg-red-9` or `text-slate-12`.

::: info Clarification

This option does **NOT** affect the final CSS bundle size; Tailwind CSS never bundles semantic classes if you do not use any of them. Setting it to `true` only prevents semantic classes from showing up in your IDE Intellisense, so that you will not be overwhelmed by all the semantic classes you don't even use.

:::

## include

- Type: `string[] | undefined`
- Default: `undefined`

Specifies an array of color names that you want to use in your project.

When this option is set to `undefined`, which is the default behavior, all colors are included.

::: info Clarification

This option does **NOT** affect the final CSS bundle size; Tailwind CSS never bundles unused colors anyway. Specifying this option only prevents other unspecified colors from showing up in your IDE Intellisense, so that you will not be overwhelmed by all the unused colors you don't even use.

:::

## exclude

- Type: `string[]`
- Default: `[]`

Specifies an array of color names that you do not want to use in your project. This exclusion applies after the `include` option is applied.

By default, no colors are excluded.

::: info Clarification

This option does **NOT** affect the final CSS bundle size; Tailwind CSS never bundles unused colors anyway. Specifying this option only prevents other unspecified colors from showing up in your IDE Intellisense, so that you will not be overwhelmed by all the unused colors you don't even use.

:::

## priority

- Type: `"no-tailwind" | "radix-first" | "tailwind-first"`
- Default: `"no-tailwind"`

When trying to merge Radix colors with Tailwind, certain color names will come into conflict. For example, both Radix and Tailwind have a color named `red`.

By default, you don't have to worry about this, as Tailwind colors will be completely wiped out, and only Radix colors will actually be used. Specifying the option to `no-tailwind` does exactly the same thing.

However, if you prefer to keep Tailwind colors, you can set this option otherwise. Setting it to `radix-first` will make Radix colors take precedence over Tailwind colors, while setting it to `tailwind-first` will make Tailwind colors take precedence over Radix colors, in case of any color name conflict.

For example, both Radix and Tailwind have a color named `red`. If you set this option to `radix-first`, the `red` color from Radix will be used, and the `red` color from Tailwind will be ignored. On the contrary, if you set this option to `tailwind-first`, the `red` color from Tailwind will be used, and the `red` color from Radix will be ignored.

## aliases

- Type: `Record<string, string>`
- Default: `{}`

Maps original Radix color names to a customized alias. This is useful when a Radix color name conflicts with a Tailwind one, and you want to preserve both of them.

For example, both Radix and Tailwind have a color named `red`. If you want to keep both of them, you can set the `aliases` option like this:

```ts
{
  priority: "radix-first", // "tailwind-first" is also ok.
  aliases: {
    red: "sun",
  },
}
```

And now both Radix's and Tailwind's red color is available.

```html
<div class="bg-sun-9">Radix red</div>
<div class="bg-red-700">Tailwind red</div>
```
