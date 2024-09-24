import type { PageProviderType } from "./";
import React, { useCallback } from "react";
import { PageContext } from "./Context";
import { navigate, withPrefix } from "gatsby";

export function PageProvider({
    children,
    ...props
}: React.PropsWithChildren<PageProviderType>) {
    const navigateTo = useCallback<PageProviderType["navigate"]>(
        (route, options) => {
            return navigate(
                typeof route === "number"
                    ? route.toString()
                    : withPrefix(route),
                options
            );
        },
        []
    );

    return (
        <PageContext.Provider
            value={{ ...props, navigate: navigateTo, children }}
        >
            {children}
        </PageContext.Provider>
    );
}
