# Getting Started

## Installation

> [!IMPORTANT]
>
> From v2 onwards, this plugin requires Tailwind CSS v4 or higher.
>
> If you are not yet ready to upgrade Tailwind CSS to v4, please stick with plugin v1 and refer to the [legacy documentation](/v1/introduction/getting-started) for guidance.

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

```bash [deno]
deno add npm:tailwindcss-radix-colors
```

```bash [bun]
bun add tailwindcss-radix-colors
```

:::

## Configuration

Import the colors you want in the same CSS file that imports Tailwind CSS:

```css
@import "tailwindcss";
@import "tailwindcss-radix-colors/dist/red.css"; /* [!code ++] */
@import "tailwindcss-radix-colors/dist/greenp3.css"; /* [!code ++] */
@import "tailwindcss-radix-colors/dist/bluep3a.css"; /* [!code ++] */
```

The dark variant is imported together with its light variant. For example, `reddark` is imported together with `red` in `red.css`, `greendarkp3` is imported together with `greenp3` in `greenp3.css`, and so on.

Or if you prefer to import all colors at once:

```css{2}
@import "tailwindcss";
@import "tailwindcss-radix-colors/dist/all.css"; /* [!code ++] */
```

> [!CAUTION]
>
> This will make the final CSS bundle super-bloated, as Tailwind CSS v4 no longer tree-shakes unused colors. It will also pollute and slow down your editor's Intellisense with all those colors you will never use. **It is suggested to only import the colors actually needed for better performance.**
>
> :::details How bloated specifically?
>
> Importing `all.css` will add ~626KB (or ~74KB gzipped) to the CSS bundle.
>
> In comparison, importing `red.css` adds only ~3KB (or ~0.5KB gzipped).
>
> :::

> Please refer to [Configuration](/latest/configuration) for more details about configuration.

## Usage

The imported Radix colors are now available everywhere.

The biggest difference from Tailwind CSS is that the scale is now from 1 to 12, instead of from 50 to 950.

```html
<!-- Dark mode -->
<div class="bg-red-1 dark:bg-reddark-1"></div>
<!-- DCI-P3 color space -->
<div class="bg-redp3-1 dark:bg-reddarkp3-1"></div>
<!-- Alpha variant -->
<div class="bg-reda-1 dark:bg-reddarka-1"></div>
<!-- Alpha variant in DCI-P3 color space -->
<div class="bg-redp3a-1 dark:bg-reddarkp3a-1"></div>
<!-- Component classes -->
<div class="bg-red-ui border-red-dim text-red-normal"></div>
```
