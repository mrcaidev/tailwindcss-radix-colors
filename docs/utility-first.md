# Utility First

One of the core concepts in Tailwind CSS is "utility-first", which recommends primitive classes be combined into more complicated styles. When it comes to this plugin, this approach offers the following benefits:

- Granular control over color application.
- Consistency with other Tailwind CSS classes.
- Much smaller CSS bundle on average.

As a result, **it is always recommended to use this method exclusively**.

Once this plugin is added to the Tailwind configuration, Radix color palette will replace the built-in color palette, so you should now use `slate-1` - `slate-12`, which correspond to Steps 1-12 in Radix UI, instead of `slate-50` - `slate-950`.

Some examples:

- `bg-gray-1 dark:bg-graydark-1`
- `bg-red-3 hover:bg-red-4 active:bg-red-5`
- `divide-gray-6 dark:divide-graydark-6`
- `text-slate-12 disabled:text-slate-11`
