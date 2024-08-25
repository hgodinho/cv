import React from "react";

import { PageShell } from "#root/layouts";
import { PageProps, graphql } from "gatsby";
import { Article, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";

export type ArticlePage = PageProps<{ article: Article }, PageContext>;

export default function ({ data, pageContext }: ArticlePage) {
    return (
        <PageShell selected={data.article} pageContext={pageContext}>
            <div>article</div>
        </PageShell>
    );
}

export const query = graphql`
    query byId($id: String) {
        article(_id: { eq: $id }) {
            _id
            id
            type
            articleBody
            articleSection
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

export function Head({ data, pageContext }: ArticlePage) {
    return (
        <PrimitiveHead
            title={`${data.article.name} @${pageContext.site.title}`}
        />
    );
}
