import React, { Fragment } from "react";

import { cva } from "class-variance-authority";
import { tw } from "#root/lib";
import { Link } from "#root/components";
import { CreativeWork } from "@hgod-in-cv/data/src/types";
import { EntityViewProps } from "./types";
import { useFilterContext } from "#root/provider";

const creativeWorkViewVariants = cva(["mb-2"], {
    variants: {
        variant: {
            default: [],
            text: [],
            home: null,
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
            {typeof data.description !== "undefined" && (
                <p>{data.description as React.ReactNode}</p>
            )}
            {typeof data.publication !== "undefined" && (
                <p>
                    {(data.publication as string[])?.map((pub, i) => (
                        <Fragment key={`pub-${i}`}>{pub}</Fragment>
                    ))}
                </p>
            )}
            {typeof data.sameAs !== "undefined" && (
                <ul className={tw("list-[square]", "list-inside")}>
                    {(data.sameAs as string[])?.map((sameAs, i) => (
                        <li key={`sameAs-${i}`} className={tw()}>
                            <Link
                                href={sameAs}
                                className={tw(
                                    "truncate",
                                    "text-ellipsis",
                                    "break-all"
                                )}
                            >
                                {sameAs}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
