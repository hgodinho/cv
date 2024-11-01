import { tw } from "#root/lib";
import { UnionSchemaType } from "@hgod-in-cv/data/src/types";
import { Link, Phone } from "lucide-react";
import React from "react";
import { linkVariants } from "#root/components";

export type ContactBarProps = {
    data: {
        source: UnionSchemaType;
        target: UnionSchemaType;
        predicate: string;
    }[];
};

export function ContactBar({ data }: ContactBarProps) {
    return (
        <aside
            className={tw(
                "flex",
                "print:flex-col",
                "gap-2",
                "mb-4",
                "items-center",
                "print:items-start"
            )}
        >
            {data.map((sameAs) => {
                return (
                    <a
                        key={sameAs.target._id}
                        href={(sameAs.target.identifier as string[])[0]}
                        className={tw(
                            linkVariants({
                                className: tw("print:flex", "print:gap-2"),
                            })
                        )}
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                    >
                        {sameAs.target.name === "Lattes" ? (
                            <>
                                {"lattes"}
                                <span className={tw("hidden", "print:block")}>
                                    {(sameAs.target.identifier as string[])[0]}
                                </span>
                            </>
                        ) : (
                            <>
                                <img
                                    height="16"
                                    width="16"
                                    alt={sameAs.target.name}
                                    src={`https://cdn.simpleicons.org/${sameAs.target.name}/black`}
                                />
                                <span className={tw("hidden", "print:block")}>
                                    {(sameAs.target.identifier as string[])[0]}
                                </span>
                            </>
                        )}
                    </a>
                );
            })}
            <a
                href="https://hgod.in/cv"
                className={tw(
                    linkVariants({ className: tw("print:flex", "print:gap-2") })
                )}
            >
                <Link size={16} />
                <span className={tw("hidden", "print:block")}>
                    {"https://hgod.in/cv"}
                </span>
            </a>
            <a
                href="mailto:henrique@hgod.in"
                className={tw(
                    linkVariants({ className: tw("print:flex", "print:gap-2") })
                )}
            >
                <img
                    height="16"
                    width="16"
                    alt="Gmail"
                    src="https://cdn.simpleicons.org/gmail/black"
                />
                <span className={tw("hidden", "print:block")}>
                    {"henrique@hgod.in"}
                </span>
            </a>
            <span
                className={tw("hidden", "print:flex", "print:gap-2")}
                aria-label="tel"
            >
                <Phone size={16} />
                {"+55 11 99416 7130"}
            </span>
        </aside>
    );
}
