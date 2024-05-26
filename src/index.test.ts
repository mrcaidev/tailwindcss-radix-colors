import type { Config } from "tailwindcss";
import type { TailwindCSSRadixColorsOptions } from "./plugin";

import postcss from "postcss";
import prettier from "prettier";
import tailwind from "tailwindcss";
import { assert, it } from "vitest";

import plugin from "./";

const generateConfig = (
  pluginOptions: TailwindCSSRadixColorsOptions = {},
  content = "bg-slate-1 bg-slate-app",
  theme: Config["theme"] = {},
): Config => ({
  theme,
  content: [
    {
      raw: content,
    },
  ],
  plugins: [plugin(pluginOptions)],
});

const run = (config: Config) =>
  postcss(tailwind(config)).process(
    "@tailwind utilities; @tailwind components;",
    { from: undefined },
  );

const format = (source: string) => prettier.format(source, { parser: "css" });

it("Given existing colors in config theme, no errors are thrown", async () => {
  const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity))
    }
  `;

  const config = generateConfig({}, "bg-slate-1", {
    extend: { colors: { custom: "#123456" } },
  });

  return run(config).then(async (result) => {
    assert.strictEqual(await format(result.css), await format(expected));
  });
});

it("Given `disableSemantics: true`, Then only step classes are generated", async () => {
  const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity))
    }
  `;

  const config = generateConfig({
    disableSemantics: true,
  });

  return run(config).then(async (result) => {
    assert.strictEqual(await format(result.css), await format(expected));
  });
});

it("Given no plugin options, Then both step and semantic classes are generated", async () => {
  const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity));
    }
    .bg-slate-app {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-app {
        --tw-bg-opacity: 1;
        background-color: rgb(17 17 19 / var(--tw-bg-opacity));
      }
    }
  `;

  const config = generateConfig();

  return run(config).then(async (result) => {
    assert.strictEqual(await format(result.css), await format(expected));
  });
});

it("Given no option, Then every semantic step is generated", async () => {
  const expected = `
    .bg-slate-app {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-app {
        --tw-bg-opacity: 1;
        background-color: rgb(17 17 19 / var(--tw-bg-opacity));
      }
    }
    .bg-slate-subtle {
      --tw-bg-opacity: 1;
      background-color: rgb(249 249 251 / var(--tw-bg-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-subtle {
        --tw-bg-opacity: 1;
        background-color: rgb(24 25 27 / var(--tw-bg-opacity));
      }
    }
    .bg-slate-ui {
      --tw-bg-opacity: 1;
      background-color: rgb(240 240 243 / var(--tw-bg-opacity));
    }
    .bg-slate-ui:hover {
      --tw-bg-opacity: 1;
      background-color: rgb(232 232 236 / var(--tw-bg-opacity));
    }
    .bg-slate-ui:active {
      --tw-bg-opacity: 1;
      background-color: rgb(224 225 230 / var(--tw-bg-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-ui {
        --tw-bg-opacity: 1;
        background-color: rgb(33 34 37 / var(--tw-bg-opacity));
      }
      .bg-slate-ui:hover {
        --tw-bg-opacity: 1;
        background-color: rgb(39 42 45 / var(--tw-bg-opacity));
      }
      .bg-slate-ui:active {
        --tw-bg-opacity: 1;
        background-color: rgb(46 49 53 / var(--tw-bg-opacity));
      }
    }
    .bg-slate-ghost {
      background-color: transparent;
    }
    .bg-slate-ghost:hover {
      --tw-bg-opacity: 1;
      background-color: rgb(232 232 236 / var(--tw-bg-opacity));
    }
    .bg-slate-ghost:active {
      --tw-bg-opacity: 1;
      background-color: rgb(224 225 230 / var(--tw-bg-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-ghost {
        background-color: transparent;
      }
      .bg-slate-ghost:hover {
        --tw-bg-opacity: 1;
        background-color: rgb(39 42 45 / var(--tw-bg-opacity));
      }
      .bg-slate-ghost:active {
        --tw-bg-opacity: 1;
        background-color: rgb(46 49 53 / var(--tw-bg-opacity));
      }
    }
    .bg-slate-action {
      --tw-bg-opacity: 1;
      background-color: rgb(232 232 236 / var(--tw-bg-opacity));
    }
    .bg-slate-action:hover {
      --tw-bg-opacity: 1;
      background-color: rgb(224 225 230 / var(--tw-bg-opacity));
    }
    .bg-slate-action:active {
      --tw-bg-opacity: 1;
      background-color: rgb(217 217 224 / var(--tw-bg-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-action {
        --tw-bg-opacity: 1;
        background-color: rgb(39 42 45 / var(--tw-bg-opacity));
      }
      .bg-slate-action:hover {
        --tw-bg-opacity: 1;
        background-color: rgb(46 49 53 / var(--tw-bg-opacity));
      }
      .bg-slate-action:active {
        --tw-bg-opacity: 1;
        background-color: rgb(54 58 63 / var(--tw-bg-opacity));
      }
    }
    .border-slate-dim {
      --tw-border-opacity: 1;
      border-color: rgb(217 217 224 / var(--tw-border-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .border-slate-dim {
        --tw-border-opacity: 1;
        border-color: rgb(54 58 63 / var(--tw-border-opacity));
      }
    }
    .border-slate-normal {
      --tw-border-opacity: 1;
      border-color: rgb(205 206 214 / var(--tw-border-opacity));
    }
    .border-slate-normal:hover {
      --tw-border-opacity: 1;
      border-color: rgb(185 187 198 / var(--tw-border-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .border-slate-normal {
        --tw-border-opacity: 1;
        border-color: rgb(67 72 78 / var(--tw-border-opacity));
      }
      .border-slate-normal:hover {
        --tw-border-opacity: 1;
        border-color: rgb(90 97 105 / var(--tw-border-opacity));
      }
    }
    .divide-slate-dim > :not([hidden]) ~ :not([hidden]) {
      --tw-divide-opacity: 1;
      border-color: rgb(217 217 224 / var(--tw-divide-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .divide-slate-dim > :not([hidden]) ~ :not([hidden]) {
        --tw-divide-opacity: 1;
        border-color: rgb(54 58 63 / var(--tw-divide-opacity));
      }
    }
    .divide-slate-normal > :not([hidden]) ~ :not([hidden]) {
      --tw-divide-opacity: 1;
      border-color: rgb(205 206 214 / var(--tw-divide-opacity));
    }
    .divide-slate-normal:hover > :not([hidden]) ~ :not([hidden]) {
      --tw-divide-opacity: 1;
      border-color: rgb(185 187 198 / var(--tw-divide-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .divide-slate-normal > :not([hidden]) ~ :not([hidden]) {
        --tw-divide-opacity: 1;
        border-color: rgb(67 72 78 / var(--tw-divide-opacity));
      }
      .divide-slate-normal:hover > :not([hidden]) ~ :not([hidden]) {
        --tw-divide-opacity: 1;
        border-color: rgb(90 97 105 / var(--tw-divide-opacity));
      }
    }
    .text-slate-dim {
      --tw-text-opacity: 1;
      color: rgb(96 100 108 / var(--tw-text-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .text-slate-dim {
        --tw-text-opacity: 1;
        color: rgb(176 180 186 / var(--tw-text-opacity));
      }
    }
    .text-slate-normal {
      --tw-text-opacity: 1;
      color: rgb(28 32 36 / var(--tw-text-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .text-slate-normal {
        --tw-text-opacity: 1;
        color: rgb(237 238 240 / var(--tw-text-opacity));
      }
    }
  `;

  const config = generateConfig(
    {},
    "bg-slate-app bg-slate-subtle bg-slate-ui bg-slate-ghost bg-slate-action border-slate-dim border-slate-normal divide-slate-dim divide-slate-normal text-slate-dim text-slate-normal",
  );

  return run(config).then(async (result) => {
    assert.strictEqual(await format(result.css), await format(expected));
  });
});
