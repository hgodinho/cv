import { useContext } from "react";
import { ThemeContext } from "./Context";

export function useTheme() {
    const context = useContext(ThemeContext);
    return context;
}
