import React, { useMemo } from "react";

import { cva } from "class-variance-authority";
import { tw } from "#root/lib";
import { Link } from "#root/components";
import { Event } from "@hgod-in-cv/data/src/types";
import { EntityViewProps } from "./types";
import { useFilterContext } from "#root/provider";

const eventViewVariants = cva(["mb-2"], {
    variants: {
        variant: {
            default: [],
            text: [],
        },
    },
});

export type EventViewProps = EntityViewProps<Event>;

export function EventView({
    data,
    variant,
    className,
    nodes,
    links,
    locale,
}: EventViewProps) {
    const { classes, properties } = useFilterContext();

    const { organizer, location } = useMemo(() => {
        const organizer = nodes.find(
            (node) => node.id === (data?.organizer as string[])?.[0]
        );

        const location = nodes.find(
            (node) => node.id === (data?.location as string[])?.[0]
        );

        return { organizer, location };
    }, [data]);

    return (
        <div
            className={tw(
                eventViewVariants({
                    variant,
                    className,
                })
            )}
        >
            <p className={tw("font-bold")}>
                {data.startDate ? `${data.startDate} | ` : null}
                {classes?.[data.type]}
            </p>
            <Link href={data.id as string}>{data.name}</Link>
            {typeof data.description !== "undefined" && (
                <p className={tw()}>{data.description as React.ReactNode}</p>
            )}
            {typeof organizer !== "undefined" && (
                <p className={tw()}>
                    <span className={tw("italic")}>
                        {properties?.["organizer"]}:{" "}
                    </span>
                    <Link href={organizer.id as string}>{organizer.name}</Link>
                </p>
            )}
            {typeof location !== "undefined" && (
                <p className={tw()}>
                    <span className={tw("italic")}>
                        {properties?.["location"]}:{" "}
                    </span>
                    <Link href={location.id as string}>{location.name}</Link>
                </p>
            )}
        </div>
    );
}
