import { PageContext, UnionSchemaType } from "@hgod-in-cv/data/src/types";
import React, { useMemo } from "react";

export function Seo({
    data,
    pageContext,
}: {
    data: UnionSchemaType;
    pageContext: PageContext;
}) {
    const json = useMemo(() => {
        return {
            "@context": data._context || "https://schema.org",
            "@id": `${pageContext?.site.siteUrl}/${data.locale}/${data.path}`,
            ...Object.fromEntries(
                Object.entries(data || {}).filter(([key, value]) => {
                    if (
                        ["_id", "_context", "id", "path", "locale"].includes(
                            key
                        )
                    ) {
                        return false;
                    }
                    return value !== null;
                })
            ),
        };
    }, [data, pageContext]);

    return (
        <script
            id="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(json, null, 2),
            }}
        />
    );
}
