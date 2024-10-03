import { useCVContext } from "#root/provider";
import React, { useMemo } from "react";

export function Seo() {
    const { selected } = useCVContext();

    const data = useMemo(() => {
        return {
            "@context": selected?._context || "https://schema.org",
            ...Object.fromEntries(
                Object.entries(selected || {}).filter(
                    ([key, value]) => value !== null
                )
            ),
        };
    }, [selected]);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data, null, 2),
            }}
        />
    );
}
