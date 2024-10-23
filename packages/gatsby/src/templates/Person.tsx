import React from "react";

import { PageProps, graphql } from "gatsby";
import { Person, PageContext } from "@hgod-in-cv/data/dist/types";
import { Head as PrimitiveHead } from "#root/components";

export type PersonPage = PageProps<{ person: Person }, PageContext>;

export default function ({ data, pageContext }: PersonPage) {
    return null;
}

export const query = graphql`
    query byId($locale: String, $slug: String) {
        person(locale: { eq: $locale }, path: { eq: $slug }) {
            id
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
            givenName
            familyName
            jobTitle
            email
            birthDate
            birthPlace
            honorificPrefix
            nationality
            homeLocation
            award
            brand
            hasCertification
            hasOccupation
            knowsAbout
            knowsLanguage
            memberOf
            performerIn
            seeks
        }
    }
`;

export const Head = ({ pageContext, data }: PersonPage) => {
    return (
        <PrimitiveHead
            title={`${data.person.name} @${pageContext.site.title}`}
            variant="default"
            pageContext={pageContext}
            data={data.person}
        />
    );
};
