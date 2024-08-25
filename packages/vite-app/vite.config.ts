import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";

export default defineConfig({
    root: __dirname,
    base: "/",
    plugins: [
        react(),
        vike({
            prerender: true,
            redirects: {
                "/": "/cv/person/henrique-godinho",
                "/cv": "/cv/person/henrique-godinho",
            },
        }),
    ],
    build: {
        // outDir: "../../dist/apps/vite-app",
        outDir: "./dist",
        sourcemap: true,
    },
    resolve: {
        alias: {
            "#root": __dirname + "/src",
            "#public": __dirname + "/public",
        },
    },
});
