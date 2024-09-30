import { useContext } from "react";
import { PageContext } from "./Context";

export function usePageContext() {
    const context = useContext(PageContext);
    return context;
}
