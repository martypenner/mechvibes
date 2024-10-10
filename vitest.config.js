import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // Use 'node' environment since we're testing Electron's main process
    globals: true,
    setupFiles: "./tests/setup.js",
  },
});
