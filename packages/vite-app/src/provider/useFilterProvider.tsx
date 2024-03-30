import { useContext } from "react";
import { FilterContext } from ".";

export function useFilterContext() {
    const context = useContext(FilterContext);
    return context;
}