import { PageContext, UnionSchemaType } from "@hgod-in-cv/data/src/types";
import { graphql, useStaticQuery } from "gatsby";
import React, { useCallback, useMemo } from "react";

export function Seo({
    data,
    pageContext,
}: {
    data?: UnionSchemaType;
    pageContext: PageContext;
}) {
    const processJsonLd = useCallback((data: UnionSchemaType) => {
        return {
            "@context": data._context || "https://schema.org",
            "@id": `${pageContext?.site.siteUrl}/`,
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
    }, []);

    const json = useMemo(() => {
        if (data) return processJsonLd(data);
        return false;
    }, [data, pageContext]);

    // #ctw-6
    const site = useStaticQuery(graphql`
        query Site {
            creativeWork(_id: { eq: "#ctw-6" }) {
                _context
                _id
                _type
                author
                dateCreated
                description
                inLanguage
                keywords
                locale
                name
                path
                sameAs
                type
            }
        }
    `);

    return (
        <>
            <script
                id="site-metadata"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        processJsonLd(site.creativeWork),
                        null,
                        2
                    ),
                }}
            />
            {json && (
                <script
                    id="page-metadata"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(json, null, 2),
                    }}
                />
            )}
        </>
    );
}
