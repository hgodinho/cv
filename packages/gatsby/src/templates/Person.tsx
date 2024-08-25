import React from "react";

import { PageShell } from "#root/layouts";
import { PageProps, graphql } from "gatsby";
import { Person, PageContext } from "@hgod-in-cv/data/dist/types";
import { Head as PrimitiveHead } from "#root/components";

export type PersonPage = PageProps<{ person: Person }, PageContext>;

export default function ({ data, pageContext }: PersonPage) {
    return null;
    // <PageShell selected={data.person} pageContext={pageContext}>
    //     {/* <div>Person</div> */}
    // </PageShell>
}

export const query = graphql`
    query byId($id: String) {
        person(_id: { eq: $id }) {
            id
            _id
            birthDate
            _context
            name
            type
            description
            email
            familyName
            givenName
            hasCertification
            homeLocation
            honorificPrefix
        }
    }
`;

export const Head = ({ pageContext, data }: PersonPage) => {
    return (
        <PrimitiveHead
            title={`${data.person.name} @${pageContext.site.title}`}
        />
    );
};
