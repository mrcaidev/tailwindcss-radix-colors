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
