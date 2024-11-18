export const theme = {
    fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
    },
    screens: {
        sm: "480px",
        md: "752px",
        lg: "1028px",
        xl: "1440px",
    },
    extend: {
        gridTemplateColumns: {
            layout: "16px 32px 16px 1fr 16px 32px 16px",
            "layout-md": "16px 32px 256px 32px 1fr 32px 16px", //ok
            "layout-lg": "32px 32px 256px auto 384px 32px 32px", // ok

            text: "32px 1fr 32px",
            "text-md": "32px 0.4fr 16px 0.6fr 32px",
            "text-lg": "32px 0.2fr 0.4fr 16px 0.6fr 0.2fr 32px",

            "class-header": "0.7fr 0.3fr",
        },
        gridTemplateRows: {
            layout: "16px 32px var(--middle-height) 16px 32px 16px",
            "layout-md": "16px 32px var(--middle-height) 16px 32px 16px", //ok
            "layout-lg": "16px 32px var(--middle-height) 16px 32px 16px", // ok

            text: "8px 32px 8px var(--middle-height) 8px 32px 8px",
            "text-md": "16px 32px 16px var(--middle-height) 16px 32px 16px",
            "text-lg": "16px 32px var(--middle-height) 32px 16px",
        },
        animation: {
            "spin-slow": "spin 3s linear infinite",
        },
    },
};
