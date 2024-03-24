import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), viteTsConfigPaths()],
    server: {
        open: true,
        port: 3000,
    },
    build: {
        outDir: "/dist",
    },
    css: {
        modules: {
            localsConvention: "camelCase",
        },
    },
});
