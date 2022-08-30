import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/weather-panel/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup.ts",
  },
});
