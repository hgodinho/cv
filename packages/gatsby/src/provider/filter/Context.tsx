import { FilterContextType } from "./";
import { createContext } from "react";
import { defaultCVContext } from "../cv";

export const FilterContext = createContext<FilterContextType>({
    ...defaultCVContext,
    filteredNodes: [],
    filterNodes: () => { },
    filteredLinks: [],
    filterLinks: () => { },
});