import { PageActions, PageProviderType } from "./types";
import { createContext } from "react";
import { defaultPageContext } from "./defaultContext";

export const PageContext = createContext<
    Partial<PageProviderType> & PageActions
>({
    ...defaultPageContext,
    navigating: false,
    setNavigating: () => { },
    navigate: async () => { },
});
