import { createContext, useContext } from "react";

export type ThemeContextType = {
    sizes: Record<string, number>;
};

export const ThemeContext = createContext<ThemeContextType>({
    sizes: {
        icon: 16
    }
});

export function useTheme() {
    const context = useContext(ThemeContext);
    return context;
}