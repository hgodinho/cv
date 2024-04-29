// https://vike.dev/usePageContext

import React, { useContext } from "react";
import type { PageContext } from "vike/types";

const Context = React.createContext<PageContext>(
    undefined as unknown as PageContext
);

export function PageContextProvider({
    pageContext,
    children,
}: {
    pageContext: PageContext;
    children: React.ReactNode;
}) {
    return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

/** https://vike.dev/usePageContext */
export function usePageContext() {
    const pageContext = useContext(Context);
    return pageContext;
}

export function useParams() {
    const pageContext = usePageContext();
    return pageContext.routeParams;
}
