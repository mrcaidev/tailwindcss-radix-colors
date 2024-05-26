import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
  test: {
    isolate: false,
    watch: false,
    sequence: {
      concurrent: true,
    },
  },
});
