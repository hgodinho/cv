import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    root: __dirname,
    plugins: [react(), viteTsConfigPaths()],
    server: {
        open: true,
        port: 3000,
    },
    base: "/",
    build: {
        outDir: "../../dist/apps/vite-app",
        sourcemap: true,
    },
    css: {
        modules: {
            localsConvention: "camelCaseOnly",
        },
    },
});
