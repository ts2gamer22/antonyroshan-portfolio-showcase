import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173, // avoid Docker's 8080
    strictPort: true,
  },
  preview: {
    host: "::",
    port: 5174,
    strictPort: true,
  },
  // Dynamic base for GitHub Pages deployments (set via env)
  base: process.env.VITE_BASE || "/",
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
