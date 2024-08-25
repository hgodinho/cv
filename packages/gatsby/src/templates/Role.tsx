import React from "react";

import { PageShell } from "#root/layouts";
import { PageProps, graphql } from "gatsby";
import { PageContext, Role } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";

export type RolePage = PageProps<{ role: Role }, PageContext>;

export default function ({ data, pageContext }: RolePage) {
    return (
        <PageShell selected={data.role} pageContext={pageContext}>
            <div>role</div>
        </PageShell>
    );
}

export const query = graphql`
    query byId($id: String) {
        role(_id: { eq: $id }) {
            _id
            id
            type
            numberedPosition
            startDate
            endDate
            name
            additionalType
            alternateName
            member
            description
        }
    }
`;

export const Head = ({ pageContext, data }: RolePage) => {
    return (
        <PrimitiveHead title={`${data.role.name} @${pageContext.site.title}`} />
    );
};
