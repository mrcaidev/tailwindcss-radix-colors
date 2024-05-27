import postcss from "postcss";
import { format as prettierFormat } from "prettier";
import type { Config } from "tailwindcss";
import tailwind from "tailwindcss";
import { expect, test } from "vitest";
import plugin from "./";
import type { TailwindcssRadixColorsOptions } from "./types";

async function run({
  content,
  options = {},
  config = {},
}: {
  content: string;
  options?: TailwindcssRadixColorsOptions;
  config?: Omit<Config, "content">;
}) {
  const configWithPlugin = {
    ...config,
    content: [{ raw: content }],
    plugins: [plugin(options)],
  } as Config;

  const result = await postcss(tailwind(configWithPlugin)).process(
    "@tailwind utilities; @tailwind components;",
    { from: undefined },
  );

  return result.css;
}

function format(source: string) {
  return prettierFormat(source, { parser: "css" });
}

test("Given no option, both utility and semantic classes are generated", async () => {
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

  const result = await run({ content: "bg-slate-1 bg-slate-app" });

  expect(await format(result)).toStrictEqual(await format(expected));
});

test("Given `disableSemantics: true`, only utility classes are generated", async () => {
  const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity))
    }
  `;

  const result = await run({
    content: "bg-slate-1 bg-slate-app",
    options: { disableSemantics: true },
  });

  expect(await format(result)).toStrictEqual(await format(expected));
});

test("Given user-extended colors, no errors are thrown", async () => {
  const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity))
    }
  `;

  const result = await run({
    content: "bg-slate-1",
    options: {},
    config: {
      theme: {
        extend: { colors: { custom: "#123456" } },
      },
    },
  });

  expect(await format(result)).toStrictEqual(await format(expected));
});

test("Given no option, every semantic classes is generated", async () => {
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

  const result = await run({
    content:
      "bg-slate-app bg-slate-subtle bg-slate-ui bg-slate-ghost bg-slate-action border-slate-dim border-slate-normal divide-slate-dim divide-slate-normal text-slate-dim text-slate-normal",
  });

  expect(await format(result)).toStrictEqual(await format(expected));
});
