import { useContext } from "react";
import { FilterContext } from "./Context";

export function useFilterContext() {
    const context = useContext(FilterContext);
    return context;
}
