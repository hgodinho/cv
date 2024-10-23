/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        `./src/pages/**/*.{js,jsx,ts,tsx}`,
        `./src/templates/**/*.{js,jsx,ts,tsx}`,
        `./src/components/**/*.{js,jsx,ts,tsx}`,
    ],
    theme: {
        fontFamily: {
            sans: ["Inter", "sans-serif"],
            mono: ["JetBrains Mono", "monospace"],
        },
        screens: {
            sm: "480px",
            md: "752px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            gridTemplateColumns: {
                layout: "16px 32px 16px 1fr 16px 32px 16px",
                "layout-md": "16px 32px 256px 32px 1fr 32px 16px", //ok
                "layout-lg": "32px 32px 256px auto 384px 32px 32px", // ok
                pdf: "32px 0.2fr 0.4fr 16px 0.6fr 0.2fr 32px",
            },
            gridTemplateRows: {
                layout: "16px 32px var(--middle-height) 16px 32px 16px",
                "layout-md": "16px 32px var(--middle-height) 16px 32px 16px", //ok
                "layout-lg": "32px 32px var(--middle-height) 16px 32px 16px", // ok
                pdf: "32px 32px var(--middle-height) 16px 32px 16px",
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
            },
        },
    },
    plugins: [],
};
