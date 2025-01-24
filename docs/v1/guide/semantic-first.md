# Semantic-First

Sometimes it can be verbose and tedious to write all those utility classes, especially when they are repeated in multiple places. To reduce spaghetti code and maintenance burden, this plugin also provides a "semantic-first" approach to styling components.

## Usage

In this approach, one semantic class is equivalent to several utility classes, in accordance with the [design guidelines](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) of Radix UI.

For example, `bg-red-ui` is a shorthand for:

```
bg-red-3 hover:bg-red-4 active:bg-red-5 dark:bg-reddark-3 dark:hover:bg-reddark-4 dark:active:bg-reddark-5

```

... which is Radix's recommended design to [style UI element background](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale#steps-35-component-backgrounds).

More examples:

| Semantic Class   | Equivalent Utility Classes                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `bg-red-app`     | `bg-red-1 dark:bg-reddark-1`                                                                                 |
| `text-slate-dim` | `text-slate-11 dark:text-slatedark-11`                                                                       |
| `bg-yello-solid` | `bg-yellow-9 dark:bg-yellowdark-9`<br />`hover:bg-yellow-10 dark:hover:bg-yellowdark-10`<br />`text-sand-12` |

See [Semantic Table](/reference/semantic-table) for a full cross-reference.

Notice how dark mode, hover/active states and foreground color are automatically styled in this way. The only thing we need to do is to declare the semantic meaning of a component (app, ui, solid, normal, etc.), and the plugin will handle the rest for you.

## Advantages

Compared to utility-first approach, this approach offers the following advantages:

### Design Like a Pro

The semantic classes are composed according to Radix's design principles and best practices. It knows how to apply [the best color scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) for different components in different states, and can determine [the best foreground color](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette#natural-pairing) against a given background (scale 9).

To achieve the same effect with utility classes, one will have to learn and remember all those design principles and best practices. But this can be error-prone and time-consuming, especially for newcomers. But in semantic-first approach, one will need to remember much fewer semantic classes.

### Better Readability

The less classes you write, the more readable your code will be. Semantic classes are more concise and expressive than utility classes, and they are easier to understand and maintain.

### Build Faster

If we want to build a prototype as soon as possible, or when CSS bundle size is not much of a concern, semantic classes can help us move faster, and focus more on business logic, software functionality and user experience.
