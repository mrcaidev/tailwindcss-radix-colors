import { expect, test } from "bun:test";
import type { CSSRuleObject, Config } from "tailwindcss/types/config";
import type { TailwindcssRadixColorsOptions } from "./options";
import { createPlugin } from "./plugin";

function mockColor(colorName: string) {
  const color: Record<string, string> = {};

  for (let scale = 1; scale <= 12; scale++) {
    color[scale] = colorName + scale.toString();
  }

  return color;
}

const DEFAULT_CONFIG = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "black",
      white: "white",
      slate: mockColor("slate"),
      slatedark: mockColor("slatedark"),
    },
  },
  prefix: "",
};

function run({
  config: localConfig = {},
  options = {},
}: {
  config?: Omit<Config, "content">;
  options?: TailwindcssRadixColorsOptions;
} = {}) {
  const registry: CSSRuleObject[] = [];

  const config = { ...DEFAULT_CONFIG, ...localConfig };
  const plugin = createPlugin(options);

  plugin({
    addComponents: (components: CSSRuleObject) => {
      registry.push(components);
    },

    // @ts-expect-error This works.
    theme: (path?: string) => {
      if (path === "colors") {
        return config.theme.colors;
      }
      return config.theme;
    },

    // @ts-expect-error This works.
    config: (path?: string) => {
      if (path === "prefix") {
        return config.prefix;
      }
      return config;
    },
  });

  return registry;
}

test("Given no option, All semantic classes are generated", () => {
  const registry = run();
  expect(registry).toEqual([
    {
      ".bg-slate-app": {
        "@apply bg-slate-1 dark:bg-slatedark-1": {},
      },
      ".bg-slate-subtle": {
        "@apply bg-slate-2 dark:bg-slatedark-2": {},
      },
      ".bg-slate-ui": {
        "@apply bg-slate-3 hover:bg-slate-4 active:bg-slate-5 dark:bg-slatedark-3 dark:hover:bg-slatedark-4 dark:active:bg-slatedark-5":
          {},
      },
      ".bg-slate-ghost": {
        "@apply bg-transparent hover:bg-slate-4 active:bg-slate-5 dark:bg-transparent dark:hover:bg-slatedark-4 dark:active:bg-slatedark-5":
          {},
      },
      ".bg-slate-action": {
        "@apply bg-slate-4 hover:bg-slate-5 active:bg-slate-6 dark:bg-slatedark-4 dark:hover:bg-slatedark-5 dark:active:bg-slatedark-6":
          {},
      },
      ".bg-slate-solid": {
        "@apply bg-slate-9 hover:bg-slate-10 dark:bg-slatedark-9 dark:hover:bg-slatedark-10 text-slatedark-12":
          {},
      },
      ".border-slate-dim": {
        "@apply border-slate-6 dark:border-slatedark-6": {},
      },
      ".border-slate-normal": {
        "@apply border-slate-7 hover:border-slate-8 dark:border-slatedark-7 dark:hover:border-slatedark-8":
          {},
      },
      ".divide-slate-dim": {
        "@apply divide-slate-6 dark:divide-slatedark-6": {},
      },
      ".divide-slate-normal": {
        "@apply divide-slate-7 hover:divide-slate-8 dark:divide-slatedark-7 dark:hover:divide-slatedark-8":
          {},
      },
      ".text-slate-dim": {
        "@apply text-slate-11 dark:text-slatedark-11": {},
      },
      ".text-slate-normal": {
        "@apply text-slate-12 dark:text-slatedark-12": {},
      },
    },
  ]);
});

test("Given option `disableSemantics`, no semantic classes are generated", () => {
  const registry = run({ options: { disableSemantics: true } });
  expect(registry).toEqual([]);
});

test("Prefix are respected", () => {
  const registry = run({ config: { prefix: "tw-" } });
  expect(registry).toEqual([
    {
      ".bg-slate-app": {
        "@apply bg-slate-1 tw-dark:bg-slatedark-1": {},
      },
      ".bg-slate-subtle": {
        "@apply bg-slate-2 tw-dark:bg-slatedark-2": {},
      },
      ".bg-slate-ui": {
        "@apply bg-slate-3 hover:bg-slate-4 active:bg-slate-5 tw-dark:bg-slatedark-3 tw-dark:hover:bg-slatedark-4 tw-dark:active:bg-slatedark-5":
          {},
      },
      ".bg-slate-ghost": {
        "@apply bg-transparent hover:bg-slate-4 active:bg-slate-5 tw-dark:bg-transparent tw-dark:hover:bg-slatedark-4 tw-dark:active:bg-slatedark-5":
          {},
      },
      ".bg-slate-action": {
        "@apply bg-slate-4 hover:bg-slate-5 active:bg-slate-6 tw-dark:bg-slatedark-4 tw-dark:hover:bg-slatedark-5 tw-dark:active:bg-slatedark-6":
          {},
      },
      ".bg-slate-solid": {
        "@apply bg-slate-9 hover:bg-slate-10 tw-dark:bg-slatedark-9 tw-dark:hover:bg-slatedark-10 text-slatedark-12":
          {},
      },
      ".border-slate-dim": {
        "@apply border-slate-6 tw-dark:border-slatedark-6": {},
      },
      ".border-slate-normal": {
        "@apply border-slate-7 hover:border-slate-8 tw-dark:border-slatedark-7 tw-dark:hover:border-slatedark-8":
          {},
      },
      ".divide-slate-dim": {
        "@apply divide-slate-6 tw-dark:divide-slatedark-6": {},
      },
      ".divide-slate-normal": {
        "@apply divide-slate-7 hover:divide-slate-8 tw-dark:divide-slatedark-7 tw-dark:hover:divide-slatedark-8":
          {},
      },
      ".text-slate-dim": {
        "@apply text-slate-11 tw-dark:text-slatedark-11": {},
      },
      ".text-slate-normal": {
        "@apply text-slate-12 tw-dark:text-slatedark-12": {},
      },
    },
  ]);
});

test("Custom colors are ignored, if it does not have 12 scales", () => {
  const registry = run({
    config: {
      theme: {
        colors: {
          transparent: "transparent",
          current: "currentColor",
          black: "black",
          white: "white",
          custom: "#123456",
        },
      },
    },
  });
  expect(registry).toEqual([]);
});

test("Custom colors are ignored, if it has 12 scales, but no dark variant", () => {
  const registry = run({
    config: {
      theme: {
        colors: {
          transparent: "transparent",
          current: "currentColor",
          black: "black",
          white: "white",
          custom: mockColor("custom"),
        },
      },
    },
  });
  expect(registry).toEqual([]);
});

test("Custom colors are respected, if it has 12 scales and a dark variant", () => {
  const registry = run({
    config: {
      theme: {
        colors: {
          transparent: "transparent",
          current: "currentColor",
          black: "black",
          white: "white",
          custom: mockColor("custom"),
          customdark: mockColor("customdark"),
        },
      },
    },
  });
  expect(registry).toEqual([
    {
      ".bg-custom-app": {
        "@apply bg-custom-1 dark:bg-customdark-1": {},
      },
      ".bg-custom-subtle": {
        "@apply bg-custom-2 dark:bg-customdark-2": {},
      },
      ".bg-custom-ui": {
        "@apply bg-custom-3 hover:bg-custom-4 active:bg-custom-5 dark:bg-customdark-3 dark:hover:bg-customdark-4 dark:active:bg-customdark-5":
          {},
      },
      ".bg-custom-ghost": {
        "@apply bg-transparent hover:bg-custom-4 active:bg-custom-5 dark:bg-transparent dark:hover:bg-customdark-4 dark:active:bg-customdark-5":
          {},
      },
      ".bg-custom-action": {
        "@apply bg-custom-4 hover:bg-custom-5 active:bg-custom-6 dark:bg-customdark-4 dark:hover:bg-customdark-5 dark:active:bg-customdark-6":
          {},
      },
      ".bg-custom-solid": {
        "@apply bg-custom-9 hover:bg-custom-10 dark:bg-customdark-9 dark:hover:bg-customdark-10":
          {},
      },
      ".border-custom-dim": {
        "@apply border-custom-6 dark:border-customdark-6": {},
      },
      ".border-custom-normal": {
        "@apply border-custom-7 hover:border-custom-8 dark:border-customdark-7 dark:hover:border-customdark-8":
          {},
      },
      ".divide-custom-dim": {
        "@apply divide-custom-6 dark:divide-customdark-6": {},
      },
      ".divide-custom-normal": {
        "@apply divide-custom-7 hover:divide-custom-8 dark:divide-customdark-7 dark:hover:divide-customdark-8":
          {},
      },
      ".text-custom-dim": {
        "@apply text-custom-11 dark:text-customdark-11": {},
      },
      ".text-custom-normal": {
        "@apply text-custom-12 dark:text-customdark-12": {},
      },
    },
  ]);
});
