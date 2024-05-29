# Custom Colors

This plugin completely erases Tailwind's color palette, and substitutes it with Radix's color palette. These Radix colors are accessible, semantically meaningful and designed to work with Radix's own design guidelines (and hence this plugin). You probably do not need custom colors.

## How To

If you are already aware of this, but still want to add custom colors, you can define them in the `theme.extend.colors` field of Tailwind configuration file:

```ts {6-16}
import type { Config } from "tailwindcss";
import tailwindcssRadixColors from "tailwindcss-radix-colors";

export default {
  // ... The rest of configuration
  theme: {
    extend: {
      colors: {
        custom: "#123456",
        primary: {
          some: "#123456",
          another: "#234567",
        },
      },
    },
  },
  plugins: [tailwindcssRadixColors],
} satisfies config;
```

:::warning Warning

Do not add custom colors to the `theme.colors` field. Otherwise, Radix colors will be overridden, and this plugin will lose almost all of its functionality.

```ts {7-14}
import type { Config } from "tailwindcss";
import tailwindcssRadixColors from "tailwindcss-radix-colors";

export default {
  // ... The rest of configuration
  theme: {
    // DON'T DO THIS!
    colors: {
      custom: "#123456",
      primary: {
        some: "#123456",
        another: "#234567",
      },
    },
  },
  plugins: [tailwindcssRadixColors],
} satisfies config;
```

:::

Then we can use `bg-custom` or `bg-primary-some` to style your components. This is pretty much what you would expect to work in original Tailwind CSS.

## Semantic Classes for Custom Colors

This plugin offers more. It will try to generate semantic classes for our custom colors, so that we can use convenient semantic classes, such as `bg-primary-app` or `bg-primary-ui`.

And for this to happen, several requirements need to be met (take `primary` as an example color name):

1. Both `primary` and `primarydark` should be present in `theme.extend.colors`, so that automatic dark mode can be possible. (e.g. `bg-primary-1 dark:bg-primarydark-1`)
2. Both of `primary` and `primarydark` should have all 12 scales defined, so that semantic classes can be fully generated.

```ts {9-20}
import type { Config } from "tailwindcss";
import tailwindcssRadixColors from "tailwindcss-radix-colors";

export default {
  // ... The rest of configuration
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#cccccc",
          2: "#bbbbbb",
          // ... and scales 3-11
          12: "#111111",
        },
        primarydark: {
          1: "#111111",
          2: "#222222",
          // ... and scales 3-11
          12: "#cccccc",
        },
      },
    },
  },
  plugins: [tailwindcssRadixColors],
} satisfies config;
```

If either of the two requirements fails, the plugin will skip the generation for this custom colors. You can still use utility classes, such as `bg-primary-1` and `bg-primarydark-1`, but `bg-primary-app`; but semantic classes, such as `bg-primary-ui`, will not be available.

:::tip Tip

This requirement is high and specific for most use cases. If you are not sure about whether to add all 12 scales, you probably do not need this feature.

Partial generation of semantic classes is a work in progress. Stay tuned!

:::
