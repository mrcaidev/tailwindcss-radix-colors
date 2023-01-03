# tailwindcss-radix-colors

Bring [Radix UI's color system](https://www.radix-ui.com/colors) to [Tailwind CSS](https://tailwindcss.com/).

## ✨ Introduction

Tailwind CSS includes [an amazing color palette](https://tailwindcss.com/docs/customizing-colors) that is comprehensive, beautiful and easy to use.

However, it falls short when we need to apply different color scales to different states, such as normal, hover and active, because the palette varies too much between scales.

Radix UI, on the other hand, is well designed to [handle these states](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale) by assigning a semantic meaning to each color scale, such as "Step 3" for normal states, "Step 4" for hover states, "Step 5" for pressed or selected states, and so on.

This plugin lets you use Radix UI's color system in Tailwind CSS, combining Radix's power and Tailwind's simplicity.

## 🚀 Getting Started

Install the plugin:

```sh
npm install tailwindcss-radix-colors # use npm
yarn add tailwindcss-radix-colors # use yarn
pnpm add tailwindcss-radix-colors # use pnpm
```

Then, add the plugin to your `tailwind.config.js` file:

```js
module.exports = {
  // ...
  plugins: [require("tailwindcss-radix-colors")],
};
```

## 🎨 Usage

You can style your application in two ways: utility-first or semantic-first.

### ⚙️ Utility-First (Recommended)

One of the core concepts in Tailwind CSS is "utility-first", where primitive classes are combined to create more complex styles. When it comes to this plugin, it offers the following benefits:

- Granular control over color application.
- Consistency with other Tailwind CSS classes.
- Much smaller CSS bundle on average.

As a result, **it is always recommended to use this method exclusively**.

Once the plugin is activated, Radix UI will replace the built-in color palette, so you should now use `slate-1` - `slate-12`, which correspond to Steps 1-12 in Radix UI, instead of `slate-50` - `slate-900`.

Some minimal examples:

- `bg-gray-1 dark:bg-graydark-1`
- `bg-red-3 hover:bg-red-4 active:bg-red-5`
- `divide-gray-6 dark:divide-graydark-6`
- `text-slate-12 disabled:text-slate-11`

[👉 See utility-first demo](https://tailwindcss-radix-colors.mrcai.dev/utility-first)

### 🪧 Semantic-First

The plugin also includes a set of component classes, which are essentially pre-defined combinations of utility classes that adhere to [the design guidelines of Radix UI](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale). Though not recommended, it does have some advantages:

- Hover and active states are automatically managed.
- When in dark mode, the corresponding dark color is automatically applied.
- The best foreground color is automatically chosen for a certain solid background.

However, when the demand becomes more complex, you may find these pre-defined classes incompetent. So only use this method if:

- You have to build a prototype as soon as possible.
- CSS bundle size is not a concern.
- You have no desire to learn Radix UI's color system.

The reference list is shown below in blue as an example.

|    Semantic class    |                                                Equivalent utility classes                                                |
| :------------------: | :----------------------------------------------------------------------------------------------------------------------: |
|    `bg-blue-app`     |                                              `bg-blue-1 dark:bg-bluedark-1`                                              |
|   `bg-blue-subtle`   |                                              `bg-blue-2 dark:bg-bluedark-2`                                              |
|     `bg-blue-ui`     |    `bg-blue-3 dark:bg-bluedark-3 hover:bg-blue-4 dark:hover:bg-bluedark-4 active:bg-blue-5 dark:active:bg-bluedark-5`    |
|   `bg-blue-ghost`    | `bg-transparent dark:bg-transparent hover:bg-blue-4 dark:hover:bg-bluedark-4 active:bg-blue-5 dark:active:bg-bluedark-5` |
|   `bg-blue-action`   |    `bg-blue-4 dark:bg-bluedark-4 hover:bg-blue-5 dark:hover:bg-bluedark-5 active:bg-blue-6 dark:active:bg-bluedark-6`    |
|   `bg-blue-solid`    |                 `bg-blue-9 dark:bg-bluedark-9 hover:bg-blue-10 dark:hover:bg-bluedark-10 text-slate-12`                  |
|  `border-blue-dim`   |                                          `border-blue-6 dark:border-bluedark-6`                                          |
| `border-blue-normal` |                 `border-blue-7 dark:border-bluedark-7 hover:border-blue-8 dark:hover:border-bluedark-8`                  |
|   `text-blue-dim`    |                                           `text-blue-11 dark:text-bluedark-11`                                           |
|  `text-blue-normal`  |                                           `text-blue-12 dark:text-bluedark-12`                                           |

> Use cases for each semantic classes can be found on [Radix UI's official documentation](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale).

[👉 See semantic-first demo](https://tailwindcss-radix-colors.mrcai.dev/semantic-first)

## 📜 License

[MIT](LICENSE)
