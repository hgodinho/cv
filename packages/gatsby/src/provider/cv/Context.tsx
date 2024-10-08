import { CVContextType } from "./types";
import { createContext } from "react";
import { defaultCVContext } from "./defaultContext";

export const CVContext = createContext<CVContextType>(defaultCVContext);
