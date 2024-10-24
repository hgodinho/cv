import { usePageContext } from "#root/provider";
import { useCallback, useMemo } from "react";

export function useLink(value: string) {
    const {
        location,
        pageContext,
    } = usePageContext();

    const filterValue = useCallback(
        (value: string) => {
            if (value && value.includes(pageContext?.site.siteUrl as string)) {
                return value.replace(pageContext?.site.siteUrl as string, "");
            }
            return value;
        },
        [pageContext?.site.siteUrl]
    );

    const props = useMemo(() => {
        const internal = value?.includes(pageContext?.site.siteUrl as string);

        const target = internal
            ? {}
            : {
                target: "_blank",
                rel: "noopener noreferrer",
            };

        const to = filterValue(value);

        return {
            to,
            internal,
            isActive: to ? location?.pathname.includes(to) : false,
            ...target,
        };
    }, [location, value]);

    return props;
}
