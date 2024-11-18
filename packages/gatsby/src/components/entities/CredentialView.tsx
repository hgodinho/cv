import React, { useMemo } from "react";

import { cva } from "class-variance-authority";
import { tw } from "#root/lib";
import { Link } from "#root/components";
import { Credential } from "@hgod-in-cv/data/src/types";
import { EntityViewProps } from "./types";

const credentialViewVariants = cva(["mb-2"], {
    variants: {
        variant: {
            default: [],
            text: [],
        },
    },
});

export type CredentialViewProps = EntityViewProps<Credential>;

export function CredentialView({
    data,
    variant,
    className,
    nodes,
    links,
    locale,
}: CredentialViewProps) {
    const { issuedBy, department, departmentOfDepartment } = useMemo(() => {
        const issuedBy = nodes.find((node) => {
            return node.id === (data.issuedBy as string[])[0];
        });

        const department = links.find((link) => {
            return (
                link.predicate === "department" && link.object === issuedBy?.id
            );
        });

        const departmentOfDepartment = links.find((link) => {
            return (
                link.predicate === "department" &&
                link.object === department?.subject
            );
        });

        return {
            issuedBy,
            department: nodes.find((node) => node.id === department?.subject),
            departmentOfDepartment: nodes.find(
                (node) => node.id === departmentOfDepartment?.subject
            ),
        };
    }, [nodes, data]);

    return (
        <div className={tw(credentialViewVariants({ variant, className }))}>
            <p className={tw("font-bold")}>
                {data.datePublished as React.ReactNode} | {data.name}
            </p>
            <p>
                <Link href={issuedBy?.id as string}>{issuedBy?.name}</Link>
                {typeof department !== "undefined" ? (
                    <>
                        {" - "}
                        <Link href={department?.id as string}>
                            {department?.name}
                        </Link>
                        {typeof departmentOfDepartment !== "undefined" ? (
                            <>
                                {" - "}
                                <Link
                                    href={departmentOfDepartment?.id as string}
                                >
                                    {departmentOfDepartment?.name}
                                </Link>
                            </>
                        ) : (
                            ""
                        )}
                    </>
                ) : (
                    ""
                )}
                {issuedBy?.alternateName
                    ? ` (${issuedBy?.alternateName}${department?.alternateName
                        ? `-${department.alternateName}${departmentOfDepartment?.alternateName
                            ? `-${departmentOfDepartment.alternateName}`
                            : ""
                        }`
                        : ""
                    })`
                    : ""}
            </p>
        </div>
    );
}
