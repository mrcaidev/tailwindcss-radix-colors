# Semantic First

This plugin includes a set of semantic classes, which are essentially pre-defined composition of [utility classes](utility-first) that adhere to [the design guidelines of Radix UI](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale). This approach has the following advantages:

- Under dark mode, the corresponding dark variant of a color is automatically applied.
- Hover and active states are automatically managed.
- The best foreground color is automatically chosen for a certain solid background.

However, when the demand becomes more complex, you may find these pre-defined classes incompetent. So only use this method if:

- You have to build a prototype as soon as possible.
- CSS bundle size is not much of a concern.
- You have no desire to learn Radix UI's color system.

The reference list is given below, and uses color "blue" as an example.

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

Use cases for each semantic classes are listed in [Understanding the Scale](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale).

You can disable semantic classes with option `disableSemantics`. See [Options](/options#disablesemantics) for more details.
