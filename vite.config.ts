import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  test: {
    isolate: false,
    watch: false,
    sequence: {
      concurrent: true,
    }
  },
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
