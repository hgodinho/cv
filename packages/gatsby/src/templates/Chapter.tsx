import React from "react";

import { PageShell } from "#root/layouts";
import { PageProps, graphql } from "gatsby";
import { Chapter, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";

export type ChapterPage = PageProps<{ chapter: Chapter }, PageContext>;

export default function ({ data, pageContext }: ChapterPage) {
    return (
        <PageShell selected={data.chapter} pageContext={pageContext}>
            <div>chapter</div>
        </PageShell>
    );
}

export const query = graphql`
    query byId($id: String) {
        chapter(_id: { eq: $id }) {
            _id
            id
            type
            pageEnd
            pageStart
            pagination
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

export const Head = ({ pageContext, data }: ChapterPage) => {
    return (
        <PrimitiveHead
            title={`${data.chapter.name} @${pageContext.site.title}`}
        />
    );
};
