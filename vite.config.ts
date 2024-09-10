/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), { name: "tailwindcss", ...tailwindcss() }],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
  optimizeDeps: {
    exclude: ["lightningcss"],
  },
  build: {
    chunkSizeWarningLimit: 900,
    // rollupOptions: {
    //   external: ["lightningcss"]
    // }
  },
});
