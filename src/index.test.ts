import type { Config } from "tailwindcss";
import type { TailwindCSSRadixColorsOptions } from "./plugin";

import postcss from "postcss";
import prettier from "prettier";
import tailwind from "tailwindcss";
import { assert, it } from "vitest";

import plugin from "./";

const generateConfig = (pluginOptions: TailwindCSSRadixColorsOptions = {}, content = "bg-slate-1 bg-slate-app"): Config => ({
  theme: {},
  content: [
    {
      raw: content,
    }
  ],
  plugins: [plugin(pluginOptions)],
});

const run = (config: Config) =>
  postcss(tailwind(config))
    .process(
      "@tailwind utilities; @tailwind components;",
      { from: undefined }
    );

const format = (source: string) => prettier.format(source, { parser: "css" });

it("Given `disableSemantics: true`, Then only step classes are generated", async () => {
  const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity))
    }
  `

  const config = generateConfig({
    disableSemantics: true,
  })

  return run(config).then(async (result) =>
    assert.strictEqual(await format(result.css), await format(expected))
  );
});

it("Given no plugin options, Then both step and semantic classes are generated", async () => {
  const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity))
    }
    .bg-slate-app {
      background-color: #fcfcfd;
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-app {
        background-color: #111113;
      }
    }
  `

  const config = generateConfig()

  return run(config).then(async (result) =>
    assert.strictEqual(await format(result.css), await format(expected))
  );
});

it("Given no option, Then every semantic step is generated", async () => {
  const expected = `
    .bg-slate-app {
      background-color: #fcfcfd;
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-app {
        background-color: #111113;
      }
    }
    .bg-slate-subtle {
      background-color: #f9f9fb;
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-subtle {
        background-color: #18191b;
      }
    }
    .bg-slate-ui {
      background-color: #f0f0f3;
    }
    .bg-slate-ui:hover {
      background-color: #e8e8ec;
    }
    .bg-slate-ui:active {
      background-color: #e0e1e6;
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-ui {
        background-color: #212225;
      }
      .bg-slate-ui:hover {
        background-color: #272a2d;
      }
      .bg-slate-ui:active {
        background-color: #2e3135;
      }
    }
    .bg-slate-ghost {
      background-color: transparent;
    }
    .bg-slate-ghost:hover {
      background-color: #e8e8ec;
    }
    .bg-slate-ghost:active {
      background-color: #e0e1e6;
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-ghost {
        background-color: transparent;
      }
      .bg-slate-ghost:hover {
        background-color: #272a2d;
      }
      .bg-slate-ghost:active {
        background-color: #2e3135;
      }
    }
    .bg-slate-action {
      background-color: #e8e8ec;
    }
    .bg-slate-action:hover {
      background-color: #e0e1e6;
    }
    .bg-slate-action:active {
      background-color: #d9d9e0;
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-action {
        background-color: #272a2d;
      }
      .bg-slate-action:hover {
        background-color: #2e3135;
      }
      .bg-slate-action:active {
        background-color: #363a3f;
      }
    }
    .border-slate-dim {
      border-color: #d9d9e0;
    }
    @media (prefers-color-scheme: dark) {
      .border-slate-dim {
        border-color: #363a3f;
      }
    }
    .border-slate-normal {
      border-color: #cdced6;
    }
    .border-slate-normal:hover {
      border-color: #b9bbc6;
    }
    @media (prefers-color-scheme: dark) {
      .border-slate-normal {
        border-color: #43484e;
      }
      .border-slate-normal:hover {
        border-color: #5a6169;
      }
    }
    .divide-slate-dim > :not([hidden]) ~ :not([hidden]) {
      border-color: #d9d9e0;
    }
    @media (prefers-color-scheme: dark) {
      .divide-slate-dim > :not([hidden]) ~ :not([hidden]) {
        border-color: #363a3f;
      }
    }
    .divide-slate-normal > :not([hidden]) ~ :not([hidden]) {
      border-color: #cdced6;
    }
    .divide-slate-normal > :not([hidden]) ~ :not([hidden]):hover {
      border-color: #b9bbc6;
    }
    @media (prefers-color-scheme: dark) {
      .divide-slate-normal > :not([hidden]) ~ :not([hidden]) {
        border-color: #43484e;
      }
      .divide-slate-normal > :not([hidden]) ~ :not([hidden]):hover {
        border-color: #5a6169;
      }
    }
    .text-slate-dim {
      color: #60646c;
    }
    @media (prefers-color-scheme: dark) {
      .text-slate-dim {
        color: #b0b4ba;
      }
    }
    .text-slate-normal {
      color: #1c2024;
    }
    @media (prefers-color-scheme: dark) {
      .text-slate-normal {
        color: #edeef0;
      }
    }
  `

  const config = generateConfig({}, "bg-slate-app bg-slate-subtle bg-slate-ui bg-slate-ghost bg-slate-action border-slate-dim border-slate-normal divide-slate-dim divide-slate-normal text-slate-dim text-slate-normal")

  return run(config).then(async (result) =>
    assert.strictEqual(await format(result.css), await format(expected))
  );
});
