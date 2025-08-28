# Semantic Classes

A semantic class is a preset composition of several color classes, handling dark mode and hover/active states automatically in accordance with Radix's [design guidelines](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale).

Below is a full reference of semantic classes, taking "red" color as example.

| Semantic Class     | Equivalent Color Classes                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `bg-red-app`        | `bg-red-1 dark:bg-reddark-1`                                                                                                       |
| `bg-red-subtle`     | `bg-red-2 dark:bg-reddark-2`                                                                                                       |
| `bg-red-ui`         | `bg-red-3 dark:bg-reddark-3`<br />`hover:bg-red-4 dark:hover:bg-reddark-4`<br />`active:bg-red-5 dark:active:bg-reddark-5`         |
| `bg-red-ghost`      | `bg-transparent dark:bg-transparent`<br />`hover:bg-red-3 dark:hover:bg-reddark-3`<br />`active:bg-red-4 dark:active:bg-reddark-4` |
| `bg-red-action` (deprecated)     | `bg-red-4 dark:bg-reddark-4`<br />`hover:bg-red-5 dark:hover:bg-reddark-5`<br />`active:bg-red-6 dark:active:bg-reddark-6`         |
| `bg-red-solid`      | `bg-red-9 dark:bg-reddark-9`<br />`hover:bg-red-10 dark:hover:bg-reddark-10`                                                       |
| `border-red-dim`    | `border-red-6 dark:border-reddark-6`                                                                                               |
| `border-red-normal` | `border-red-7 dark:border-reddark-7`<br />`hover:border-red-8 dark:hover:border-reddark-8`                                         |
| `divide-red-dim`    | `divide-red-6 dark:divide-reddark-6`                                                                                               |
| `divide-red-normal` | `divide-red-7 dark:divide-reddark-7`<br />`hover:divide-red-8 dark:hover:divide-reddark-8`                                         |
| `text-red-dim`      | `text-red-11 dark:text-reddark-11`                                                                                                 |
| `text-red-normal`   | `text-red-12 dark:text-reddark-12`                                                                                                 |
