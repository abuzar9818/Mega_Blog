import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()   // ← REQUIRED for Tailwind v4
  ],

  optimizeDeps: {
    esbuildOptions: {
      target: "es2018",
    },
  },

  build: {
    target: "es2018",
  }
});
