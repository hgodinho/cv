import { tw } from "#root/lib";
import { UnionSchemaType } from "@hgod-in-cv/data/src/types";
import React from "react";
import { Link } from "#root/components";

export type ContactBarProps = {
    data: {
        source: UnionSchemaType;
        target: UnionSchemaType;
        predicate: string;
    }[];
};

export function ContactBar({ data }: ContactBarProps) {
    return (
        <aside className={tw("flex", "gap-2", "my-2", "items-center")}>
            {data.map((sameAs) => {
                return (
                    <a
                        key={sameAs.target._id}
                        href={(sameAs.target.identifier as string[])[0]}
                        className={tw(
                            "dark:text-blue-300",
                            "dark:hover:text-blue-500",
                            "text-blue-800",
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
                            "lattes"
                        ) : (
                            <img
                                height="16"
                                width="16"
                                alt={sameAs.target.name}
                                src={`https://cdn.simpleicons.org/${sameAs.target.name}/black`}
                            />
                        )}
                    </a>
                );
            })}
            <a
                href="mailto:ola@hgod.in"
                className={tw(
                    "dark:text-blue-300",
                    "dark:hover:text-blue-500",
                    "text-blue-800",
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
            </a>
        </aside>
    );
}
