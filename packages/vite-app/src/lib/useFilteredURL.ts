import { useCallback, useEffect } from "react";
import { useCVContext } from "@/provider";
import { LinkProps } from "react-router-dom";

export type To = string | LinkProps["to"];

export function useFilteredURL(value: To) {
    const {
        data: {
            config: { base },
        },
    } = useCVContext();

    const filterValue = useCallback(
        (value: To) => {
            if ((value as string).includes(base)) {
                return (value as string).replace(base, "");
            }
            return value;
        },
        [base]
    );

    useEffect(() => {
        filterValue(value);
    }, [value, filterValue]);

    return value;
}
