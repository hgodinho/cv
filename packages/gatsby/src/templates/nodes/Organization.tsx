import React from "react";

import { PageProps, graphql } from "gatsby";
import { Organization, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";
import { useI18nContext } from "#root/provider";

export type OrganizationPage = PageProps<
    { organization: Organization },
    PageContext
>;

export default function ({ data, pageContext }: OrganizationPage) {
    return null;
}

export const query = graphql`
    query byId($locale: String, $slug: String) {
        organization(locale: { eq: $locale }, path: { eq: $slug }) {
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
            address
            alumni
            award
            contactPoint
            location
            department
            member
            members
            employee
            employees
            event
            events
            openingHours
        }
    }
`;

export const Head = ({ pageContext, data }: OrganizationPage) => {
    const { locale } = useI18nContext();
    return (
        <PrimitiveHead
            title={`${data.organization.name} @${pageContext.site.locales[locale].title}`}
            pageContext={pageContext}
            data={data.organization}
            variant="default"
        />
    );
};
