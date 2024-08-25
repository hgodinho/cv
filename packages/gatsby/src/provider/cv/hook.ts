import { useContext } from "react";
import { CVContext } from "./Context";

export function useCVContext() {
    const context = useContext(CVContext);
    return context;
}
