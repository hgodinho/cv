import React, { useEffect, useState } from "react";
import type { NodeObject, LinkObject } from "react-force-graph-3d";

import { Scroll, Field, Link } from "@/components";
import { tw } from "@/lib";
import { useFilterContext } from "@/provider";

export function Description() {
    const {
        selected,
        data: { properties },
    } = useFilterContext();

    return selected ? (
        <section className={tw("px-4", "pt-2", "flex", "flex-col")}>
            <h2
                className={tw(
                    "sticky",
                    "top-0",
                    "text-2xl",
                    "font-medium",
                    "italic",
                    "bg-black/90",
                    "pb-2",
                    "mb-2"
                )}
            >
                Descrição
            </h2>
            {properties.map((property) => {
                const value = selected[property];
                if (
                    selected.hasOwnProperty(property) &&
                    typeof value !== "undefined"
                ) {
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
                        />
                    );
                }
            })}
        </section>
    ) : null;
}

export function Connections() {
    const { connectedTo, selected, nodes, filterValue } = useFilterContext();

    const [connections, setConnections] = useState<
        Record<string, LinkObject[]> | undefined
    >();

    useEffect(() => {
        console.log({ connectedTo });
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
            <h2
                className={tw(
                    "sticky",
                    "top-0",
                    "text-2xl",
                    "font-medium",
                    "italic",
                    "bg-black/90",
                    "pb-2",
                    "mb-2"
                )}
            >
                Conexões
            </h2>
            {Object.entries(connections).map(([key, links]) => {
                console.log({ key, links });
                return (
                    <Field
                        key={key}
                        label={{
                            value: key,
                            url: selected
                                ? `${selected["@context"]}/${key}`
                                : "",
                        }}
                        value={links.map((link: NodeObject, index: number) => {
                            return typeof link.source !== "string" ? (
                                <React.Fragment key={index}>
                                    {link.source.type}{" "}
                                    <Link to={filterValue(link.source.id)}>
                                        {link.source.name}
                                    </Link>
                                </React.Fragment>
                            ) : null;
                        })}
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
