import React, { useEffect, useState } from "react";
import type { NodeObject, LinkObject } from "react-force-graph-3d";

import { Scroll, Field, Link } from "#root/components";
import { tw } from "#root/lib";
import { useFilterContext, useI18nContext, useCVContext } from "#root/provider";

export function Description() {
    const { properties } = useCVContext();
    const { selected } = useFilterContext();

    return (
        <section className={tw("px-4", "pt-2", "flex", "flex-col")}>
            {Object.entries(properties).map(([property, label]) => {
                if (!selected) return;

                const value = selected[property];
                if (selected.hasOwnProperty(property) && value) {
                    if ("name" === property) {
                        return null;
                    }
                    return (
                        <Field
                            key={property}
                            label={{
                                value: property,
                                url: `${selected["@context"]}/${property}`,
                            }}
                            value={value}
                            className={tw("text-lg")}
                        />
                    );
                }
            })}
        </section>
    );
}

export function Connections() {
    const { connectedTo, selected } = useFilterContext();

    const [connections, setConnections] = useState<
        Record<string, LinkObject[]> | undefined
    >();

    useEffect(() => {
        if (Array.isArray(connectedTo) && connectedTo?.length > 0) {
            const connections: Record<string, LinkObject[]> | undefined =
                connectedTo?.reduce((acc, link) => {
                    if (!acc.hasOwnProperty(link.predicate)) {
                        acc[link.predicate] = [link];
                    } else {
                        acc[link.predicate].push(link);
                    }
                    return acc;
                }, {});
            setConnections(connections);
        } else {
            setConnections(undefined);
        }
    }, [connectedTo]);

    return connections ? (
        <section className={tw("px-4", "pt-2", "flex", "flex-col")}>
            {Object.entries(connections).map(([key, links]) => {
                if (!selected) return null;
                return (
                    <Field
                        key={key}
                        label={{
                            value: key,
                            url: `${selected["@context"]}/${key}`,
                        }}
                        value={links.map((link: NodeObject, index: number) => {
                            return typeof link.source !== "string" ? (
                                <React.Fragment key={index}>
                                    {link.source?._type}{" "}
                                    <Link href={link.source?.id}>
                                        {link.source?.name}
                                    </Link>
                                </React.Fragment>
                            ) : null;
                        })}
                        className={tw("text-lg")}
                    />
                );
            })}
        </section>
    ) : null;
}

export function Body() {
    return (
        <div className={tw("overflow-auto", "flex", "flex-col", "bg-black/45")}>
            <Scroll root={{ className: tw("mr-2", "mt-2", "mb-2") }}>
                <Description />
                <Connections />
            </Scroll>
        </div>
    );
}
