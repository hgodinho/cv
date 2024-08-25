import { ThemeContextType } from "#root/types";
import { createContext } from "react";
import { themeDefault } from "./defaultContext";

export const ThemeContext = createContext<ThemeContextType>(themeDefault);
