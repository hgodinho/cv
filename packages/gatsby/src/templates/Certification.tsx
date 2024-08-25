import React from "react";

import { PageShell } from "#root/layouts";
import { PageProps, graphql } from "gatsby";
import { Certification, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";

export type CertificationPage = PageProps<
    { certification: Certification },
    PageContext
>;

export default function ({ data, pageContext }: CertificationPage) {
    return (
        <PageShell selected={data.certification} pageContext={pageContext}>
            <div>certification</div>
        </PageShell>
    );
}

export const query = graphql`
    query byId($id: String) {
        certification(_id: { eq: $id }) {
            _id
            id
            type
            name
            auditDate
            certificationIdentification
            certificationStatus
            issuedBy
            validFrom
            validIn
            about
            author
            additionalType
            award
            citation
            contributor
            copyrightHolder
            copyrightNotice
            copyrightYear
            dateCreated
            dateModified
            datePublished
            editor
            funder
            funding
            genre
            hasPart
            headline
            isAccessibleForFree
            keywords
            license
            publication
            publisher
            recordedAt
            sameAs
        }
    }
`;

export function Head({ data, pageContext }: CertificationPage) {
    return (
        <PrimitiveHead
            title={`${data.certification.name} @${pageContext.site.title}`}
        />
    );
}
