import React, { useMemo } from "react";

import { cva } from "class-variance-authority";
import { tw } from "#root/lib";
import { Link } from "#root/components";
import { Intangible } from "@hgod-in-cv/data/src/types";
import { EntityViewProps } from "./types";

const affiliationViewVariants = cva(["mb-2"], {
    variants: {
        variant: {
            default: [],
            pdf: [],
        },
    },
});

export type AffiliationViewProps = EntityViewProps<Intangible>;

export function AffiliationView({
    data,
    variant,
    className,
    nodes,
    links,
    locale,
}: AffiliationViewProps) {
    const { affiliatedTo } = useMemo(() => {
        const employee = links.find((link) => {
            return link.predicate === "employee" && link.object === data.id;
        });

        const affiliatedTo = nodes.find((node) => {
            return node.id === employee?.subject;
        });

        return {
            affiliatedTo,
        };
    }, [nodes, links, data]);

    return (
        <div className={tw(affiliationViewVariants({ variant, className }))}>
            <p className={tw("font-bold")}>
                {`${data.startDate} - ${data.endDate}`} | {data.name}
            </p>
            <Link href={data.id as string}>
                {affiliatedTo?.name}
            </Link>
        </div>
    );
}
