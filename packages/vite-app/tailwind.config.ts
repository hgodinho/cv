import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                layout: "32px 1fr 32px",
            },
            gridTemplateRows: {
                layout: "32px 700px 32px",
            },
            gridColumn: {
                "options-trigger": "1",
                "class-trigger": "3",
                options: "1 / span 2",
                class: "1 / span 2",
            },
            gridRow: {
                "options-trigger": "1",
                "class-trigger": "1",
                options: "2",
                class: "2",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};

export default config;
