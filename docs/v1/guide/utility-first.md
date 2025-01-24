# Utility-First

> Tailwind encourages a utility-first workflow, where designs are implemented using only low-level utility classes. This is a powerful way to avoid premature abstraction and the pain points that come with it.
>
> _<p align="right">—— Tailwind CSS: <a href="https://tailwindcss.com/docs/reusing-styles" target="_blank" rel="noreferrer">Reusing Style</a></p>_

"Utility-first" is one of the core concepts in Tailwind CSS, where developers are encouraged to "build complex components from a constrained set of primitive utilities".

This plugin hence borrows the name for this approach, as their ideas are essentially the same.

## Usage

In Tailwind CSS, each color scales from 50 to 950. While in Radix UI, each color scales from 1 to 12. Consequently, we will now need to write `slate-1 red-3 blue-12`, instead of `slate-100 red-300 blue-950`.

More examples:

- `bg-gray-1 dark:bg-graydark-1`
- `bg-red-3 hover:bg-red-4 active:bg-red-5`
- `border-gray-6 dark:border-graydark-6`
- `text-slate-12 disabled:text-slate-11`

## Advantages

"Utility-first" is the recommended approach to using this plugin. Compared to "semantic-first", this approach offers the following advantages.

### Granular Control

While semantic classes do make our code much cleaner, they also put a constraint on how our components are styled. Sometimes we will find ourselves having to append additional classes to tweak their styles, which defeats the purpose of using them in the first place, and may even introduce the risk of style conflicts.

But with utility classes, we have full control over how our components are styled. We can easily add, remove, or tweak styles, no matter how complicated the use case grows, or how specific the design is.

### Better Consistency

Besides color-related classes, we will probably be using other Tailwind classes as well, such as `py-4`, `rounded-md` or `min-h-48`, which are utility classes themselves.

By using utility-first approach, the color-related classes stay consistent with the rest of the Tailwind classes, which improves the overall consistency of our codebase.

### Smaller CSS Bundle

Although Tailwind can shake off unused classes in both approaches, utility-first approach generally produces a smaller CSS bundle, which helps further optimization of our website.

See [Why Smaller CSS Bundle?](/v1/faq/why-smaller-css-bundle) for an in-depth explanation.
