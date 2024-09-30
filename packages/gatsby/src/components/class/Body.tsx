import React, { useEffect, useState } from "react";
import type { NodeObject, LinkObject } from "react-force-graph-3d";

import { Scroll, Field, Link } from "#root/components";
import { tw } from "#root/lib";
import { useFilterContext, useCVContext } from "#root/provider";

export function Description() {
    const { properties } = useCVContext();
    const { selected } = useFilterContext();
    return (
        <section className={tw("px-4", "pt-2", "flex", "flex-col")}>
            {Object.entries(properties || {}).map(([property, label]) => {
                if (!selected) return;
                const value = selected[property];
                if (selected.hasOwnProperty(property) && value) {
                    if ("name" === property) {
                        return null;
                    }
                    // console.log({ selected, value, property, label });
                    return (
                        <Field
                            key={property}
                            label={{
                                name: property,
                                value: label,
                                url: `${selected["_context"]}${property}`,
                            }}
                            value={value.length === 1 ? value[0] : value}
                            className={tw("text-lg")}
                        />
                    );
                }
            })}
        </section>
    );
}

export function Connections() {
    const { connectedTo, nodes, selected } = useFilterContext();
    const { properties, classes } = useCVContext();

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
                            name: key,
                            value: properties?.[key] || "",
                            url: `${selected["_context"]}${key}`,
                        }}
                        value={links.map((link: NodeObject, index: number) => {
                            const source =
                                typeof link.source !== "undefined"
                                    ? link.source
                                    : nodes?.find(
                                        (node) => node.id === link.subject
                                    );
                            if (!source) return null;
                            return (
                                <React.Fragment key={index}>
                                    {classes?.[source._type]}{" "}
                                    <Link href={source.id}>{source.name}</Link>
                                </React.Fragment>
                            );
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
