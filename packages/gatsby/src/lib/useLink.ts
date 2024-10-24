import { usePageContext } from "#root/provider";
import { useCallback, useMemo } from "react";

export function useLink(value: string) {
    const {
        location,
        pageContext: {
            site: { siteUrl },
        },
    } = usePageContext();

    const filterValue = useCallback(
        (value: string) => {
            if (value && value.includes(siteUrl)) {
                return value.replace(siteUrl, "");
            }
            return value;
        },
        [siteUrl]
    );

    const props = useMemo(() => {
        const internal = value?.includes(siteUrl);

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
