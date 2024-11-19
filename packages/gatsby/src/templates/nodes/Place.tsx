import React from "react";

import { PageProps, graphql } from "gatsby";

import { Head as PrimitiveHead } from "#root/components";
import { PageContext, Place } from "@hgod-in-cv/data/src/types";
import { useI18nContext } from "#root/provider";

export type PlacePage = PageProps<{ place: Place }, PageContext>;

export default function ({ data, pageContext }: PlacePage) {
    return null;
}

export const query = graphql`
    query byId($locale: String, $slug: String) {
        place(locale: { eq: $locale }, path: { eq: $slug }) {
            id
            _id
            _context
            path
            type
            locale
            name
            alternateName
            description
            identifier
            sameAs
            image
            subjectOf
            additionalType
            address
            containsPlace
            openingHours
        }
    }
`;

export const Head = ({ pageContext, data }: PlacePage) => {
    const { locale } = useI18nContext();
    return (
        <PrimitiveHead
            title={`${data.place.name} @${pageContext.site.locales[locale].title}`}
            pageContext={pageContext}
            data={data.place}
            variant="default"
        />
    );
};
