import React from "react";

import { PageShell } from "#root/layouts";
import { PageProps, graphql } from "gatsby";
import { Organization, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";

export type OrganizationPage = PageProps<
    { organization: Organization },
    PageContext
>;

export default function ({ data, pageContext }: OrganizationPage) {
    return (
        <PageShell selected={data.organization} pageContext={pageContext}>
            <div>organization</div>
        </PageShell>
    );
}

export const query = graphql`
    query byId($id: String) {
        organization(_id: { eq: $id }) {
            _id
            id
            type
            name
            address
            award
            contactPoint
            location
            member
            members
            employee
            employees
            department
            event
            events
            sameAs
        }
    }
`;

export const Head = ({ pageContext, data }: OrganizationPage) => {
    return (
        <PrimitiveHead
            title={`${data.organization.name} @${pageContext.site.title}`}
        />
    );
};
