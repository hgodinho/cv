import {
    EntryList,
    EntryListItem,
    Heading,
    CredentialView,
    AffiliationView,
    CreativeWorkView,
    EventView,
} from "#root/components";
import { tw } from "#root/lib";
import { useFilterContext } from "#root/provider";
import {
    Connection,
    LinkObject,
    LOCALES,
    NodeObject,
} from "@hgod-in-cv/data/src/types";
import React, { useMemo } from "react";

export type ConnectionsViewProps = {
    connections: Record<string, Connection[]>;
    nodes: NodeObject[];
    links: LinkObject[];
    locale: LOCALES;
};

export function ConnectionsView({
    connections,
    nodes,
    links,
    locale,
}: ConnectionsViewProps) {
    const allowedTypes = useMemo(
        () =>
            [
                ["hasCertification", "target", CredentialView],
                ["affiliation", "target", AffiliationView],
                ["author", "source", CreativeWorkView],
                ["contributor", "source", EventView],
                ["attendee", "source", EventView],
            ] as Array<[string, "source" | "target", React.ComponentType<any>]>,
        []
    );

    const { properties } = useFilterContext();

    return allowedTypes.map(([key, sourceOrTarget, Component]) => {
        return (
            <div key={key as string} className={tw("mb-6")}>
                <Heading level={2} className={tw()}>
                    {properties?.[key]}
                </Heading>
                <EntryList>
                    {connections[key].map((connection) => {
                        return (
                            <EntryListItem
                                key={connection[sourceOrTarget]._id as string}
                            >
                                <Component
                                    data={connection[sourceOrTarget]}
                                    nodes={nodes}
                                    links={links}
                                    locale={locale}
                                />
                            </EntryListItem>
                        );
                    })}
                </EntryList>
            </div>
        );
    });
}
