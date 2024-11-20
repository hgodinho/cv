import React from "react";

import { PageProps, graphql } from "gatsby";
import { CreativeWork, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";
import { useI18nContext } from "#root/provider";

export type CreativeWorkPage = PageProps<
    { creativeWork: CreativeWork },
    PageContext
>;

export default function ({ data, pageContext }: CreativeWorkPage) {
    return null;
}

export const query = graphql`
    query byId($locale: String, $slug: String) {
        creativeWork(locale: { eq: $locale }, path: { eq: $slug }) {
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
            about
            author
            abstract
            award
            citation
            contributor
            copyrightHolder
            copyrightNotice
            copyrightYear
            creativeWorkStatus
            dateCreated
            dateModified
            datePublished
            editor
            funder
            funding
            genre
            hasPart
            headline
            inLanguage
            isAccessibleForFree
            keywords
            license
            publication
            publisher
            recordedAt
            articleBody
            articleSection
            pageEnd
            pageStart
            pagination
            availableLanguage
            educationalCredentialAwarded
            artEdition
            artMedium
            artform
            artworkSurface
            depth
            width
            height
            issn
            applicationCategory
            applicationSubCategory
            applicationSuite
        }
    }
`;

export const Head = ({ pageContext, data }: CreativeWorkPage) => {
    const { locale } = useI18nContext();
    return (
        <PrimitiveHead
            title={`${data.creativeWork.name} @${pageContext.site.locales[locale].title}`}
            pageContext={pageContext}
            data={data.creativeWork}
            variant="default"
        />
    );
};
