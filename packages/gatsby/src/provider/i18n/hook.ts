import { useContext } from "react";
import { I18nContext } from "./Context";

export function useI18nContext() {
    const context = useContext(I18nContext);
    return context;
}
