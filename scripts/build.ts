import type { BuildConfig, BuildOutput } from "bun";
import dts from "bun-plugin-dts";
import { rm } from "node:fs/promises";

const OUT_DIR = "dist";

const COMMON_CONFIG: BuildConfig = {
  entrypoints: ["src/index.ts"],
  outdir: OUT_DIR,
  target: "node",
};

await build();

async function build() {
  await rm(OUT_DIR, { recursive: true, force: true });

  await Promise.all([buildEsm(), buildCjs()]);
}

async function buildEsm() {
  console.log("📦 Building ESM...");

  const output = await Bun.build({
    ...COMMON_CONFIG,
    format: "esm",
    naming: "[dir]/[name].js",
    plugins: [dts()],
  });

  printOutput(output);
}

async function buildCjs() {
  console.log("📦 Building CJS...");

  const output = await Bun.build({
    ...COMMON_CONFIG,
    format: "cjs",
    naming: "[dir]/[name].cjs",
  });

  printOutput(output);
}

function printOutput(output: BuildOutput) {
  const { logs, outputs, success } = output;

  if (!success) {
    console.error("❌ Build failed");
    for (const log of logs) {
      console.error(log);
    }
    return;
  }

  for (const { kind, path } of outputs) {
    console.log(`✅ Built ${kind} ${path}`);
  }
}
