# Getting Started

> [!IMPORTANT]
>
> Since v2, this plugin requires `tailwindcss >= 4.0.0` and is NOT backward compatible.
>
> If you are not ready to upgrade Tailwind CSS from v3 to v4, please stick with plugin [v1](/v1/introduction/getting-started).

This plugin brings [Radix UI](https://www.radix-ui.com/)'s color system to [Tailwind CSS](https://tailwindcss.com/), including color variables and semantic classes that follow Radix's design guidelines.

## Installation

:::code-group

```bash [npm]
npm add tailwindcss-radix-colors
```

```bash [yarn]
yarn add tailwindcss-radix-colors
```

```bash [pnpm]
pnpm add tailwindcss-radix-colors
```

```bash [bun]
bun add tailwindcss-radix-colors
```

```bash [deno]
deno add npm:tailwindcss-radix-colors
```

:::

## Configuration

Import this plugin in the same file that imports Tailwind CSS.

```css
@import "tailwindcss";
@import "tailwindcss-radix-colors/dist/all.css"; /* [!code ++] */
```

Usually, you will want to use Radix colors exclusively and discard Tailwind colors.

```css
@import "tailwindcss";
@theme {  /* [!code ++] */
  --color-*: initial;  /* [!code ++] */
} /* [!code ++] */
@import "tailwindcss-radix-colors/dist/all.css";
```

> Please refer to [Configuration](/latest/configuration) for more options.

## Usage

The imported Radix colors are now available in your application. Note that every color now scales from 1 to 12, instead of 50 to 950 as in Tailwind CSS.

```html
<!-- Basic -->
<div class="bg-blue-1 text-slate-12"></div>
<!-- Dark mode -->
<div class="bg-red-9 dark:bg-reddark-9"></div>
<!-- DCI-P3 color space -->
<div class="bg-greenp3-3"></div>
<!-- Alpha variant -->
<div class="bg-blacka-11"></div>
<!-- Alpha variant in DCI-P3 color space under light/dark mode -->
<div class="border-yellowp3a-6 dark:border-yellowdarkp3a-6"></div>
```

Besides atomic color classes, we also offer some semantic classes that strictly adhere to Radix's design guidelines. For example, writing `bg-red-ui` is the same as writing `bg-red-3 dark:bg-reddark-3 hover:bg-red-4 dark:hover:bg-reddark-4 active:bg-red-5 dark:active:bg-reddark-5`, as per the guideline.

```html
<!-- Another example -->
<div class="bg-teal-ui border-teal-dim text-sage-normal"></div>
```

> Please refer to [Semantic Classes](/latest/semantic-classes) for a complete reference.
