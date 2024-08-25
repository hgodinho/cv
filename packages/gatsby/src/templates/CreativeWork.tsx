import React from "react";

import { PageShell } from "#root/layouts";
import { PageProps, graphql } from "gatsby";
import { CreativeWork, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";

export type CreativeWorkPage = PageProps<
    { creativeWork: CreativeWork },
    PageContext
>;

export default function ({ data, pageContext }: CreativeWorkPage) {
    return (
        <PageShell selected={data.creativeWork} pageContext={pageContext}>
            <div>creativeWork</div>
        </PageShell>
    );
}

export const query = graphql`
    query byId($id: String) {
        creativeWork(_id: { eq: $id }) {
            _id
            id
            type
            name
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

export const Head = ({ pageContext, data }: CreativeWorkPage) => {
    return (
        <PrimitiveHead
            title={`${data.creativeWork.name} @${pageContext.site.title}`}
        />
    );
};
