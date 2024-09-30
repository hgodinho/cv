import { createContext } from "react";
import { ThemeContextType, themeDefault } from "./";

export const ThemeContext = createContext<ThemeContextType>(themeDefault);
