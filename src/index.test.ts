import postcss from "postcss";
import prettier from "prettier";
import type { Config } from "tailwindcss";
import tailwind from "tailwindcss";
import { expect, test } from "vitest";
import plugin from "./";
import type { TailwindcssRadixColorsOptions } from "./options";

async function run({
  content,
  config = {},
  options = {},
}: {
  content: string;
  config?: Omit<Config, "content">;
  options?: TailwindcssRadixColorsOptions;
}) {
  const configWithPlugin = {
    ...config,
    content: [{ raw: content }],
    plugins: [plugin(options)],
  };

  const result = await postcss(tailwind(configWithPlugin)).process(
    "@tailwind utilities; @tailwind components;",
    { from: undefined },
  );

  return result.css;
}

function format(source: string) {
  return prettier.format(source, { parser: "css" });
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

  const result = await run({
    content: "bg-slate-1 bg-slate-app",
  });

  expect(await format(result)).toStrictEqual(await format(expected));
});

test("Given option `disableSemantics`, semantic classes are not generated", async () => {
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

test("Given option `include`, only specified colors are generated", async () => {
  const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity));
    }
  `;

  const result = await run({
    content: "bg-slate-1 bg-blue-1",
    options: { include: ["slate"] },
  });

  expect(await format(result)).toStrictEqual(await format(expected));
});

test("Given option `exclude`, specified colors are not generated", async () => {
  const expected = "";

  const result = await run({
    content: "bg-slate-1",
    options: { exclude: ["slate"] },
  });

  expect(await format(result)).toStrictEqual(await format(expected));
});

test("Given option `priority=radix-only`, Tailwind colors are preserved", async () => {
  const expected = `
    .bg-zinc-100 {
      --tw-bg-opacity: 1;
      background-color: rgb(244 244 245 / var(--tw-bg-opacity));
    }
  `;

  const result = await run({
    content: "bg-zinc-100",
    options: { priority: "radix-first" },
  });

  expect(await format(result)).toStrictEqual(await format(expected));
});

test("Given option `priority=tailwind-first`, Tailwind colors take precedence", async () => {
  const expected = `
    .bg-red-100 {
      --tw-bg-opacity: 1;
      background-color: rgb(254 226 226 / var(--tw-bg-opacity));
    }
  `;

  const result = await run({
    content: "bg-red-100",
    options: { priority: "tailwind-first" },
  });

  expect(await format(result)).toStrictEqual(await format(expected));
});

test("Given option `aliases`, conflicted color names are both preserved", async () => {
  const expected = `
    .bg-red-700 {
      --tw-bg-opacity: 1;
      background-color: rgb(185 28 28 / var(--tw-bg-opacity));
    }
    .bg-sun-9 {
      --tw-bg-opacity: 1;
      background-color: rgb(229 72 77 / var(--tw-bg-opacity));
    }
  `;

  const result = await run({
    content: "bg-sun-9 bg-red-700",
    options: {
      priority: "radix-first",
      aliases: {
        red: "sun",
      },
    },
  });

  expect(await format(result)).toStrictEqual(await format(expected));
});

test("Utility classes are generated for custom colors", async () => {
  const expected = `
    .bg-custom1 {
      --tw-bg-opacity: 1;
      background-color: rgb(18 52 86 / var(--tw-bg-opacity));
    }
    .bg-custom2-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(101 67 33 / var(--tw-bg-opacity));
    }
  `;

  const result = await run({
    content: "bg-custom1 bg-custom2-1",
    options: {},
    config: {
      theme: {
        extend: {
          colors: {
            custom1: "#123456",
            custom2: {
              1: "#654321",
            },
          },
        },
      },
    },
  });

  expect(await format(result)).toStrictEqual(await format(expected));
});

test("CSS classes are in correct shape", async () => {
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
