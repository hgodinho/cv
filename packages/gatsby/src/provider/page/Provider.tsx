import type { PageProviderType, PageActions } from "./";
import React, { useCallback } from "react";
import { PageContext } from "./Context";
import { navigate } from "gatsby";

export function PageProvider({
    children,
    ...props
}: React.PropsWithChildren<PageProviderType & PageActions>) {
    const [navigating, setNavigating] = React.useState(false);

    const navigateTo = useCallback<PageActions["navigate"]>(
        async (route, options) => {
            return navigate(
                typeof route === "number" ? route.toString() : route,
                options
            );
        },
        []
    );

    return (
        <PageContext.Provider
            value={
                {
                    ...props,
                    navigating,
                    navigate: navigateTo,
                    setNavigating,
                    children,
                } as PageProviderType & PageActions
            }
        >
            {children}
        </PageContext.Provider>
    );
}
