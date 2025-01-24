# Why This Plugin?

You may have already seen plugins on GitHub that provide the same functionality, such as [windy-radix-palette](https://github.com/brattonross/windy-radix-palette) and [radix-colors-for-tailwind](https://github.com/samrobbins85/radix-colors-for-tailwind). These plugins are also amazing works, each of which has its own advantages.

Most of them do their magic by injecting the colors into `:root` as CSS variables, which, if improperly configured, will generate a super-bloated CSS bundle (bloated from ~5KB to ~50KB). See [reproduction](https://github.com/mrcaidev/unused-classes-bundled).

And even if you do configure it properly, you will still introduce some unused CSS variables into your bundle. For example, if you use `red-1` somewhere in your project, the whole red color family, `red-1` to `red-12` plus their dark mode variants, will all be included in your bundle, which is probably not what you want.

This plugin solves this problem by replacing the entire color system of Tailwind with Radix UI, so that it can utilize Tailwind's [class detection](https://tailwindcss.com/docs/content-configuration#class-detection-in-depth) mechanism, and purge unused classes during compilation.

As a result, this plugin will only generate the colors you actually use, which means you will have a much smaller CSS bundle, with zero configuration.

Additionally, this plugin also includes a set of [semantic classes](/guide/semantic-first), which can help you build prototypes quickly.
