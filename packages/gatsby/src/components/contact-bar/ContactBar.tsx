import { tw } from "#root/lib";
import { UnionSchemaType } from "@hgod-in-cv/data/src/types";
import { Phone } from "lucide-react";
import React from "react";

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
                            "dark:text-blue-300",
                            "dark:hover:text-blue-500",
                            "text-blue-800",
                            "print:text-black",
                            "hover:text-blue-700",
                            "focus:outline-none",
                            "focus:underline",
                            "focus:decoration-dotted",
                            "focus:underline-offset-4",
                            "focus:font-bold"
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
                href="mailto:henrique@hgod.in"
                className={tw(
                    "dark:text-blue-300",
                    "dark:hover:text-blue-500",
                    "text-blue-800",
                    "print:text-black",
                    "hover:text-blue-700",
                    "focus:outline-none",
                    "focus:underline",
                    "focus:decoration-dotted",
                    "focus:underline-offset-4",
                    "focus:font-bold"
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

            <span className={tw("hidden", "print:block")} aria-label="tel">
                <Phone size={16} />
                {"+55 11 99416 7130"}
            </span>
        </aside>
    );
}
