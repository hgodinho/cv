import { useCallback, useMemo } from "react";
import { usePageContext } from "#root/provider";

export function useLink(value: string | undefined) {
    const {
        api: { base },
        urlPathname,
    } = usePageContext();

    const filterValue = useCallback(
        (value: string | undefined) => {
            if (value && value.includes(base)) {
                return value.replace(base, "");
            }
            return value;
        },
        [base]
    );

    const target = useCallback(
        (value: string | undefined) =>
            typeof value !== "undefined" && value.startsWith("http")
                ? "_blank"
                : "_self",
        []
    );

    const props = useMemo(() => {
        const location = filterValue(value);
        return {
            location,
            target: target(location),
            isActive: location === urlPathname,
        };
    }, []);

    return props;
}
