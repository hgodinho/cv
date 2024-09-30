/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        `./src/pages/**/*.{js,jsx,ts,tsx}`,
        `./src/components/**/*.{js,jsx,ts,tsx}`,
    ],
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
                "layout-lg": "32px 32px 256px auto 384px 32px 32px", // ok
            },
            gridTemplateRows: {
                layout: "32px 64px var(--middle-height) 32px 32px",
                "layout-md": "32px 64px var(--middle-height) 32px 32px",
                "layout-lg": "32px 32px var(--middle-height) 16px 32px 16px", // ok
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
            },
        },
    },
    plugins: [],
};
