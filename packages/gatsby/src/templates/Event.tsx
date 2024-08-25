import React from "react";

import { PageShell } from "#root/layouts";
import { PageProps, graphql } from "gatsby";
import { Event, PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";

export type EventPage = PageProps<{ event: Event }, PageContext>;

export default function ({ data, pageContext }: EventPage) {
    return (
        <PageShell selected={data.event} pageContext={pageContext}>
            <div>event</div>
        </PageShell>
    );
}

export const query = graphql`
    query byId($id: String) {
        event(_id: { eq: $id }) {
            _id
            id
            type
            name
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
            sameAs
        }
    }
`;

export const Head = ({ pageContext, data }: EventPage) => {
    return (
        <PrimitiveHead
            title={`${data.event.name} @${pageContext.site.title}`}
        />
    );
}