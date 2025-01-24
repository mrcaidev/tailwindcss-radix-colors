# Usage

There are two different approaches to use this plugin: **utility-first** and **semantic-first**.

Either of them has its own pros and cons, which will be covered in detail on their own pages. It is up to you to balance the trade-offs and choose the one that best fits your needs.

But if you don't want to make a decision, **utility-first** is the recommended way to go. Or you can mix them together if you want to.

## Utility-First

In Tailwind CSS, each color scales from 50 to 950. While in Radix UI, each color scales from 1 to 12. Consequently, we will now need to write `slate-1 red-3 blue-12`, instead of `slate-100 red-300 blue-950`.

For example, if we want to style a paragraph component with a blue background and a slate foreground:

::: code-group

```html [Now]
<p class="bg-blue-2 dark:bg-bluedark-2 text-slate-12 dark:text-slatedark-12">
  Hello world!
</p>
```

```html [Before]
<p class="bg-blue-100 dark:bg-blue-900 text-slate-900 dark:text-slate-100">
  Hello world!
</p>
```

:::

Or, if we want to style a ghost button with red color:

::: code-group

```html [Now]
<button
  class="bg-transparent hover:bg-red-4 active:bg-red-5 dark:bg-transparent dark:hover:bg-reddark-4 dark:active:bg-reddark-5"
>
  Delete
</button>
```

```html [Before]
<button
  class="bg-transparent hover:bg-red-200 active:bg-red-300 dark:bg-transparent dark:hover:bg-red-800 dark:active:bg-red-700"
>
  Delete
</button>
```

:::

This approach is referred to as **"utility-first"**, because it aligns with Tailwind's [utility-first philosophy](https://tailwindcss.com/docs/utility-first), where developers compose primitive classes to build complicated styles.

See [Utility-First](/v1/guide/utility-first) for more details.

## Semantic-First

In practice, we will probably find ourselves constantly repeating the same pattern as above. To make our code more DRY, this plugin also provides shorthand classes for common use cases, which internally conform to Radix guidelines for [color scale usage](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale), so that developers can apply colors in a convenient, beautiful and professional way.

For example, `bg-red-subtle` is a shorthand for `bg-red-2 dark:bg-reddark-2`, and `text-slate-normal` is a shorthand for `text-slate-12 dark:text-slatedark-12`. In this way, **dark mode is automatically styled**. So the first example above can be rewritten as:

::: code-group

```html [Now]
<p class="bg-red-subtle text-slate-normal">Hello world!</p>
```

```html [Before]
<p class="bg-blue-2 dark:bg-bluedark-2 text-slate-12 dark:text-slatedark-12">
  Hello world!
</p>
```

:::

For another exmaple, `bg-red-ghost` is a shorthand for `bg-transparent hover:bg-red-4 active:bg-red-5 dark:bg-transparent dark:hover:bg-reddark-4 dark:active:bg-reddark-5`. In this way, not only dark mode, but also **hover/active states are automatically styled**. So the second example above can be rewritten as:

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

In contrary to "utility-first", this approach is referred to as **"semantic-first"**, because in this case we only care about the semantic meaning conveyed by the component, instead of imperatively specifying the color scales.

See [Semantic-First](/v1/guide/semantic-first) for more details.
