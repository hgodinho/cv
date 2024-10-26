import { theme } from "./src/styles";

/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: "class",
    content: [
        `./src/pages/**/*.{js,jsx,ts,tsx}`,
        `./src/templates/**/*.{js,jsx,ts,tsx}`,
        `./src/components/**/*.{js,jsx,ts,tsx}`,
    ],
    theme,
    plugins: [],
};

export default config;
