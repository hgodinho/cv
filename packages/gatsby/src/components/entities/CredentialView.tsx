import React, { useMemo } from "react";

import { cva } from "class-variance-authority";
import { tw } from "#root/lib";
import { Link } from "#root/components";
import { Credential } from "@hgod-in-cv/data/src/types";
import { EntityViewProps } from "./types";

const credentialViewVariants = cva([], {
    variants: {
        variant: {
            default: [],
            pdf: [],
        },
    },
});

export type CredentialViewProps = EntityViewProps<Credential>;

export function CredentialView({
    data,
    variant,
    className,
    nodes,
    locale,
}: CredentialViewProps) {
    const issuedBy = useMemo(
        () =>
            nodes.find((node) => {
                return node.id === (data.issuedBy as string[])[0];
            }),
        [nodes, data]
    );

    return (
        <div className={tw(credentialViewVariants({ variant, className }))}>
            <p className={tw("font-bold")}>
                {data.datePublished} | {issuedBy?.name}
            </p>
            <Link href={`/${locale}/${data.path}`}>{data.name}</Link>
        </div>
    );
}
