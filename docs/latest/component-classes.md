# Component Classes

A component class is essentially just a built-in combination of several utility classes, following Radix UI's design guidelines.

Using them can make your code more readable and maintainable, but will also violate Tailwind's utility-first philosophy.

You can [disable component classes](/latest/configuration/disable-component-classes) any time.

## Reference

Take `red` as example.

| Component Class     | Equivalent Utility Classes                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `bg-red-app`        | `bg-red-1 dark:bg-reddark-1`                                                                                                       |
| `bg-red-subtle`     | `bg-red-2 dark:bg-reddark-2`                                                                                                       |
| `bg-red-ui`         | `bg-red-3 dark:bg-reddark-3`<br />`hover:bg-red-4 dark:hover:bg-reddark-4`<br />`active:bg-red-5 dark:active:bg-reddark-5`         |
| `bg-red-ghost`      | `bg-transparent dark:bg-transparent`<br />`hover:bg-red-4 dark:hover:bg-reddark-4`<br />`active:bg-red-5 dark:active:bg-reddark-5` |
| `bg-red-action`     | `bg-red-4 dark:bg-reddark-4`<br />`hover:bg-red-5 dark:hover:bg-reddark-5`<br />`active:bg-red-6 dark:active:bg-reddark-6`         |
| `bg-red-solid`      | `bg-red-9 dark:bg-reddark-9`<br />`hover:bg-red-10 dark:hover:bg-reddark-10`                                                       |
| `border-red-dim`    | `border-red-6 dark:border-reddark-6`                                                                                               |
| `border-red-normal` | `border-red-7 dark:border-reddark-7`<br />`hover:border-red-8 dark:hover:border-reddark-8`                                         |
| `divide-red-dim`    | `divide-red-6 dark:divide-reddark-6`                                                                                               |
| `divide-red-normal` | `divide-red-7 dark:divide-reddark-7`<br />`hover:divide-red-8 dark:hover:divide-reddark-8`                                         |
| `text-red-dim`      | `text-red-11 dark:text-reddark-11`                                                                                                 |
| `text-red-normal`   | `text-red-12 dark:text-reddark-12`                                                                                                 |

You can verify their compliance with Radix design guidelines in [Understanding the Scale - Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale).
