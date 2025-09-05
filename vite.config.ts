import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const projectRootDir = import.meta.dirname;

export default defineConfig({
  plugins: [react()],

  assetsInclude: ["**/*.avif"],

  root: path.resolve(projectRootDir, "client"),

  resolve: {
    alias: {
      "@": path.resolve(projectRootDir, "client", "src"),
      "@shared": path.resolve(projectRootDir, "shared"),
      "@assets": path.resolve(projectRootDir, "attached_assets"),
    },
  },

  server: {
    fs: {
      allow: [projectRootDir],
    },
  },

  build: {
    outDir: path.resolve(projectRootDir, "dist/public"),
    emptyOutDir: true,
  },
});
