import { useContext } from "react";
import { CVContext } from ".";

export function useCVContext() {
    const context = useContext(CVContext);
    return context;
}