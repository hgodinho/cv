import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        screens: {
            sm: "480px",
            md: "752px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            gridTemplateColumns: {
                layout: "32px 1fr 32px",
                "layout-md": "32px 256px 32px 1fr 32px",
                "layout-lg": "32px 296px 1fr 504px 32px",
            },
            gridTemplateRows: {
                layout: "32px 600px 128px",
                "layout-md": "32px 800px 128px",
                "layout-lg": "32px 700px 128px",
            },
            gridColumn: {
                "options-trigger": "1",
                "class-trigger": "3",
                "class-trigger-md": "4",
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
