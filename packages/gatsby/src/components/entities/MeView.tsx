import React from "react";
import { ContactBar, Heading, SkillSet } from "#root/components";
import {
    Connection,
    LinkObject,
    LOCALES,
    NodeObject,
    Person,
} from "@hgod-in-cv/data/src/types";
import { tw } from "#root/lib";
import { useFilterContext } from "#root/provider";

export type MeViewProps = {
    me: Person;
    connections: Record<string, Connection[]>;
    locale: LOCALES;
    links: LinkObject[];
    nodes: NodeObject[];
};

export function MeView({ me, connections, links, nodes }: MeViewProps) {
    const { properties } = useFilterContext();

    return (
        <>
            <Heading level={1}>
                {me.name}{" "}
                <span className={tw("text-sm")}>{`(${me.birthDate})`}</span>
            </Heading>
            <p className={tw("mb-4")}>{me.description as React.ReactNode}</p>

            <ContactBar data={connections.sameAs} />

            <aside
                className={tw("print:grid", "print:grid-cols-2", "print:gap-6")}
            >
                <SkillSet
                    title={properties?.knowsLanguage as string}
                    data={connections.knowsLanguage}
                    links={links}
                    nodes={nodes}
                />
                <SkillSet
                    title={properties?.knowsAbout as string}
                    data={connections.knowsAbout}
                    links={links}
                    nodes={nodes}
                    className={tw("print:-order-1")}
                />
            </aside>
        </>
    );
}
