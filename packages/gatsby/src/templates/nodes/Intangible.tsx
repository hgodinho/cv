import React from "react";

import { PageProps, graphql } from "gatsby";
import { Intangible, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";
import { useI18nContext } from "#root/provider";

export type ChapterPage = PageProps<{ intangible: Intangible }, PageContext>;

export default function ({ data, pageContext }: ChapterPage) {
    return null;
}

export const query = graphql`
    query byId($locale: String, $slug: String) {
        intangible(locale: { eq: $locale }, path: { eq: $slug }) {
            _id
            path
            _context
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
            numberedPosition
            startDate
            endDate
            roleName
            provider
            author
            qualifications
            responsibilities
            skills
            bestRating
            ratingValue
            worstRating
            ratingExplanation
            itemReviewed
        }
    }
`;

export const Head = ({ pageContext, data }: ChapterPage) => {
    const { locale } = useI18nContext();
    return (
        <PrimitiveHead
            title={`${data.intangible.name} @${pageContext.site.locales[locale].title}`}
            pageContext={pageContext}
            data={data.intangible}
            variant="default"
        />
    );
};
