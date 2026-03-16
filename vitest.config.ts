import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    clearMocks: true,
    environment: "node",
    environmentMatchGlobs: [
      ["**/*.dom.test.ts", "jsdom"],
      ["**/*.dom.test.tsx", "jsdom"],
    ],
    globals: true,
    mockReset: true,
    restoreMocks: true,
    setupFiles: ["./vitest.setup.ts"],
    testTimeout: 10_000,
  },
});
