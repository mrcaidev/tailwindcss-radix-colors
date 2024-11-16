# Color Variants

Every Radix color comes with 3 variants:

1. **Dark variant:** Original color under dark mode.
2. **P3 variant:** Original color in DCI-P3 color space.
3. **Alpha variant:** Original color with transparency.

This plugin supports all these variants out of the box. You can use these variants by suffixing the color name with the desired variant names, namely `dark`, `p3` and `a` respectively.

For example:

- `bg-reda-1` uses the **alpha** variant of red color.
- `bg-greenp3-2` uses the **P3** variant of green color.
- `bg-bluep3a-3` uses the **P3 alpha** variant of blue color.
- `bg-yellowdarkp3a-4` uses the **dark P3 alpha** variant of yellow color.

When multiple variants are applied together, they must follow the order of `dark` → `p3` → `a`.
