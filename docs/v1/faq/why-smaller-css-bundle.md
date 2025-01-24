# Why Smaller CSS Bundle?

Compared to [semantic-first](/guide/semantic-first) approach, [utility-first](/guide/utility-first) approach on average generates a smaller CSS bundle.

## Semantic-First

Consider the following example:

```html
<button class="bg-red-ui">Button 1</button>
<button class="bg-red-ghost">Button 2</button>
```

In this example, we use `bg-red-ui` to style one button, and `bg-red-ghost` to style another.

If we inspect the CSS bundle, we will find that the color value of `red-4`, `red-5`, `reddark-4` and `reddark-5` are duplicated, once in `bg-red-ui` and once in `bg-red-ghost`.

::: code-group

```css{7-8,12-13,23-24,28-29} [bg-red-ui]
.bg-red-ui {
  --tw-bg-opacity: 1;
  background-color: rgb(254 235 236 / var(--tw-bg-opacity));
}

.bg-red-ui:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 219 220 / var(--tw-bg-opacity));
}

.bg-red-ui:active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 205 206 / var(--tw-bg-opacity));
}

@media (prefers-color-scheme: dark) {
  .bg-red-ui {
    --tw-bg-opacity: 1;
    background-color: rgb(59 18 25 / var(--tw-bg-opacity));
  }

  .bg-red-ui:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(80 15 28 / var(--tw-bg-opacity));
  }

  .bg-red-ui:active {
    --tw-bg-opacity: 1;
    background-color: rgb(97 22 35 / var(--tw-bg-opacity));
  }
}
```

```css{6-7,11-12,21-22,26-27} [bg-red-ghost]
.bg-red-ghost {
  background-color: transparent;
}

.bg-red-ghost:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 219 220 / var(--tw-bg-opacity));
}

.bg-red-ghost:active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 205 206 / var(--tw-bg-opacity));
}

@media (prefers-color-scheme: dark) {
  .bg-red-ghost {
    background-color: transparent;
  }

  .bg-red-ghost:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(80 15 28 / var(--tw-bg-opacity));
  }

  .bg-red-ghost:active {
    --tw-bg-opacity: 1;
    background-color: rgb(97 22 35 / var(--tw-bg-opacity));
  }
}
```

:::

This is because Tailwind CSS currently cannot recognize, and thus deduplicate, reused color values across different component classes. As such, these reused values can be bundled multiple times, leading to a bloated CSS bundle size.

## Utility-First

Utility classes will never have to worry about this problem. After all, they are not composed of any other smaller classes. Each used color class will only be generated once, no matter how many times it is actually used.

Considering the same example as above, but this time using utility classes:

```html
<button
  className="bg-red-3 hover:bg-red-4 active:bg-red-5 dark:bg-reddark-3 dark:hover:bg-reddark-4 dark:active:bg-reddark-5"
>
  Button 1
</button>
<button
  className="bg-transparent hover:bg-red-4 active:bg-red-5 dark:bg-transparent dark:hover:bg-reddark-4 dark:active:bg-reddark-5"
>
  Button 2
</button>
```

And we inspect the CSS bundle again:

```css
.bg-red-3 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 235 236 / var(--tw-bg-opacity));
}

.bg-transparent {
  background-color: transparent;
}

.hover\:bg-red-4:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 219 220 / var(--tw-bg-opacity));
}

.active\:bg-red-5:active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 205 206 / var(--tw-bg-opacity));
}

@media (prefers-color-scheme: dark) {
  .dark\:bg-reddark-3 {
    --tw-bg-opacity: 1;
    background-color: rgb(59 18 25 / var(--tw-bg-opacity));
  }

  .dark\:bg-transparent {
    background-color: transparent;
  }

  .dark\:hover\:bg-reddark-4:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(80 15 28 / var(--tw-bg-opacity));
  }

  .dark\:active\:bg-reddark-5:active {
    --tw-bg-opacity: 1;
    background-color: rgb(97 22 35 / var(--tw-bg-opacity));
  }
}
```

Clearly there is no duplicated color value, which signals a smaller CSS bundle size.

## Whose problem?

It's hard to blame Tailwind CSS, but this does not seem like an issue that can be solved on plugin-side. Should Tailwind CSS solve this issue one day (maybe in v4), then the CSS bundle sizes would probably not differ too much between the two approaches.

Anyway, the utility-first approach is still recommended for [its other advantages](/guide/utility-first#advantages).
