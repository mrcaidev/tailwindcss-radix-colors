![Banner](https://repository-images.githubusercontent.com/584681366/0784c1d7-79a1-40b7-aca1-3fd98216c844)

Bring [Radix UI's color system](https://www.radix-ui.com/colors) to [Tailwind CSS](https://tailwindcss.com/).

## 🎨 Why another color palette?

Tailwind CSS includes [an amazing color palette](https://tailwindcss.com/docs/customizing-colors) that is comprehensive, beautiful and easy to use.

However, it falls short when we need to apply different color scales to different states, such as normal, hover and active, because the palette varies too much between scales.

Radix UI, on the other hand, is well designed to [handle these states](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale) by assigning a semantic meaning to each color scale, such as "Step 3" for normal states, "Step 4" for hover states, "Step 5" for pressed or selected states, and so on.

This plugin lets you use Radix UI's color system in Tailwind CSS, combining Radix's power and Tailwind's simplicity.

[What is this plugin different from other similar plugins?](#🔌-comparison)

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

No configuration is required!

## 💡 Usage

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

| Semantic class       | Equivalent utility classes                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `bg-blue-app`        | `bg-blue-1 dark:bg-bluedark-1`                                                                                           |
| `bg-blue-subtle`     | `bg-blue-2 dark:bg-bluedark-2`                                                                                           |
| `bg-blue-ui`         | `bg-blue-3 dark:bg-bluedark-3 hover:bg-blue-4 dark:hover:bg-bluedark-4 active:bg-blue-5 dark:active:bg-bluedark-5`       |
| `bg-blue-ghost`      | `bg-transparent dark:bg-transparent hover:bg-blue-4 dark:hover:bg-bluedark-4 active:bg-blue-5 dark:active:bg-bluedark-5` |
| `bg-blue-action`     | `bg-blue-4 dark:bg-bluedark-4 hover:bg-blue-5 dark:hover:bg-bluedark-5 active:bg-blue-6 dark:active:bg-bluedark-6`       |
| `bg-blue-solid`      | `bg-blue-9 dark:bg-bluedark-9 hover:bg-blue-10 dark:hover:bg-bluedark-10 text-slate-12`                                  |
| `border-blue-dim`    | `border-blue-6 dark:border-bluedark-6`                                                                                   |
| `border-blue-normal` | `border-blue-7 dark:border-bluedark-7 hover:border-blue-8 dark:hover:border-bluedark-8`                                  |
| `divide-blue-dim`    | `divide-blue-6 dark:divide-bluedark-6`                                                                                   |
| `divide-blue-normal` | `divide-blue-7 dark:divide-bluedark-7 hover:divide-blue-8 dark:hover:divide-bluedark-8`                                  |
| `text-blue-dim`      | `text-blue-11 dark:text-bluedark-11`                                                                                     |
| `text-blue-normal`   | `text-blue-12 dark:text-bluedark-12`                                                                                     |

> Use cases for each semantic classes can be found on [Radix UI's official documentation](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale).

## 🔌 Comparison

You may have already seen similar plugins on GitHub that provide the same functionality, such as [windy-radix-palette](https://github.com/brattonross/windy-radix-palette) and [radix-colors-for-tailwind](https://github.com/samrobbins85/radix-colors-for-tailwind).

Most of them do their magic by injecting the colors into `:root` as CSS variables, which, if improperly configured, will generate a super-bloated CSS bundle. (bloated from ~5KB to ~50KB)

> See [reproduction](https://github.com/mrcaidev/unused-classes-bundled).

And even if you do configure it properly, you will still introduce some unused CSS variables into your bundle.

> For example, if you use `red-1` somewhere in your project, the whole red color family, `red-1` to `red-12` plus their dark mode variants, will be included in your bundle, which is probably not what you want.

This plugin solves this problem by replacing the entire color system of Tailwind with Radix UI, so that it can utilize Tailwind's [class detection](https://tailwindcss.com/docs/content-configuration#class-detection-in-depth) mechanism, and purge unused classes during compilation.

As a result, this plugin will only generate the colors you actually use, which means you will have a much smaller CSS bundle, with zero configuration.

Additionally, this plugin also includes a set of component classes, which can help you build prototypes quickly. (It even knows how to apply the best text color for a certain background!) See [Semantic First](#🪧-semantic-first) section for more details.

However, this plugin does not provide you with dark mode support out of the box, which means you always have to write `bg-gray-1 dark:bg-graydark-1` instead of `bg-gray-1` and let the plugin handle the rest. A detailed discussion can be found in [this issue](https://github.com/mrcaidev/tailwindcss-radix-colors/issues/1).

## 📜 License

[MIT](LICENSE)
