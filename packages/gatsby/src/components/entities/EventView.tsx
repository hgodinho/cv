import React, { useMemo } from "react";

import { cva } from "class-variance-authority";
import { tw } from "#root/lib";
import { Link } from "#root/components";
import { CreativeWork, Event } from "@hgod-in-cv/data/src/types";
import { EntityViewProps } from "./types";
import { useFilterContext } from "#root/provider";

const eventViewVariants = cva(["mb-2"], {
    variants: {
        variant: {
            default: [],
            pdf: [],
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
    const { classes } = useFilterContext();

    return (
        <div className={tw(eventViewVariants({ variant, className }))}>
            <p className={tw("font-bold")}>
                {data.startDate ? `${data.startDate} | ` : null}
                {classes?.[data.type]}
            </p>
            <Link href={data.id as string}>{data.name}</Link>
        </div>
    );
}
