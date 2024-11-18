import React, { useMemo } from "react";

import { cva } from "class-variance-authority";
import { tw } from "#root/lib";
import { Link } from "#root/components";
import { Organization } from "@hgod-in-cv/data/src/types";
import { EntityViewProps } from "./types";

const memberOfViewVariants = cva(["mb-2"], {
    variants: {
        variant: {
            default: [],
            text: [],
        },
    },
});

export type MemberOfViewProps = EntityViewProps<Organization>;

export function MemberOfView({
    data,
    variant,
    className,
    nodes,
    links,
    locale,
}: MemberOfViewProps) {
    const { issuedBy, department } = useMemo(() => {
        const issuedBy = links.find((link) => {
            return link.predicate === "issuedBy" && link.object === data.id;
        });

        const department = links.find((link) => {
            return link.predicate === "department" && link.object === data.id;
        });

        return {
            issuedBy: nodes.find((node) => {
                return node.id === issuedBy?.subject;
            }),
            department: nodes.find((node) => {
                return node.id === department?.subject;
            }),
        };
    }, [nodes, links, data]);

    // console.log({ issuedBy, department });

    return (
        <div className={tw(memberOfViewVariants({ variant, className }))}>
            <p className={tw("font-bold")}>
                {data.name}
                {department
                    ? ` - ${department.name} ${data.alternateName
                        ? ` (${data.alternateName}${department.alternateName
                            ? `-${department.alternateName}`
                            : ""
                        })`
                        : ""
                    }`
                    : ` (${data.alternateName})`}
            </p>
            <Link href={issuedBy?.id as string}>{issuedBy?.name}</Link>
            {issuedBy?.description && <p>{issuedBy.description}</p>}
        </div>
    );
}
