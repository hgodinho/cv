import React from "react";

import { PageShell } from "#root/layouts";
import { PageProps, graphql } from "gatsby";

import { Head as PrimitiveHead } from "#root/components";
import { PageContext, Place } from "@hgod-in-cv/data/src/types";

export type PlacePage = PageProps<{ place: Place }, PageContext>;

export default function ({ data, pageContext }: PlacePage) {
    return (
        <PageShell selected={data.place} pageContext={pageContext}>
            <div>place</div>
        </PageShell>
    );
}

export const query = graphql`
    query byId($id: String) {
        place(_id: { eq: $id }) {
            _id
            id
            type
            name
            sameAs
            containsPlace
        }
    }
`;

export const Head = ({ pageContext, data }: PlacePage) => {
    return (
        <PrimitiveHead
            title={`${data.place.name} @${pageContext.site.title}`}
        />
    );
};
