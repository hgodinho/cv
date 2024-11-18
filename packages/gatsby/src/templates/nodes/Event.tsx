import React from "react";

import { PageProps, graphql } from "gatsby";
import { Event, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";

export type EventPage = PageProps<{ event: Event }, PageContext>;

export default function ({ data, pageContext }: EventPage) {
    return null;
}

export const query = graphql`
    query byId($locale: String, $slug: String) {
        event(locale: { eq: $locale }, path: { eq: $slug }) {
            _id
            _context
            path
            type
            name
            locale
            alternateName
            description
            identifier
            sameAs
            image
            subjectOf
            additionalType
            about
            contributor
            duration
            startDate
            endDate
            attendee
            attendees
            eventStatus
            location
            organizer
            subEvent
            superEvent
        }
    }
`;

export const Head = ({ pageContext, data }: EventPage) => {
    return (
        <PrimitiveHead
            title={`${data.event.name} @${pageContext.site.title}`}
            pageContext={pageContext}
            data={data.event}
            variant="default"
        />
    );
};
