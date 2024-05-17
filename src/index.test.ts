import type { Config } from "tailwindcss";
import type { TailwindCSSRadixColorsOptions } from "./plugin";

import postcss from "postcss";
import prettier from "prettier";
import tailwind from "tailwindcss";
import { assert, it } from "vitest";

import plugin from "./";

const generateConfig = (pluginOptions: TailwindCSSRadixColorsOptions = {}): Config => ({
  theme: {},
  content: [
    {
      raw: 'bg-slate-1 bg-slate-app',
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
