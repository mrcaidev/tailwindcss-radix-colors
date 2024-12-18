import { defineConfig as defineViteConfig } from "vite";
import dts from "vite-plugin-dts";
import { defineConfig as defineVitestConfig, mergeConfig } from "vitest/config";

const viteConfig = defineViteConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "tailwindcssRadixColors",
      fileName: "index",
    },
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    isolate: false,
    sequence: {
      concurrent: true,
    },
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts"],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
