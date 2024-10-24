import React, { useMemo } from "react";

import { cva } from "class-variance-authority";
import { tw } from "#root/lib";
import { Link } from "#root/components";
import { CreativeWork } from "@hgod-in-cv/data/src/types";
import { EntityViewProps } from "./types";
import { useFilterContext } from "#root/provider";

const creativeWorkViewVariants = cva([], {
    variants: {
        variant: {
            default: [],
            pdf: [],
        },
    },
});

export type CreativeWorkViewProps = EntityViewProps<CreativeWork>;

export function CreativeWorkView({
    data,
    variant,
    className,
    nodes,
    links,
    locale,
}: CreativeWorkViewProps) {
    const { classes } = useFilterContext();

    return (
        <div className={tw(creativeWorkViewVariants({ variant, className }))}>
            <p className={tw("font-bold")}>
                {data.datePublished ? `${data.datePublished} | ` : null}
                {classes?.[data.type]}
            </p>
            <Link href={data.id as string}>{data.name}</Link>
        </div>
    );
}
