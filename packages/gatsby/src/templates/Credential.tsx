import React from "react";

import { PageProps, graphql } from "gatsby";
import { Credential, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";

export type CredentialPage = PageProps<{ credential: Credential }, PageContext>;

export default function ({ data, pageContext }: CredentialPage) {
    return null;
}

export const query = graphql`
    query byId($locale: String, $slug: String) {
        credential(locale: { eq: $locale }, path: { eq: $slug }) {
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
            auditDate
            certificationIdentification
            certificationStatus
            issuedBy
            validFrom
            validIn
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

export function Head({ data, pageContext }: CredentialPage) {
    return (
        <PrimitiveHead
            title={`${data.credential.name} @${pageContext.site.title}`}
            pageContext={pageContext}
            data={data.credential}
        />
    );
}
