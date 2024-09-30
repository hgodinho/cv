import React from "react";

import { tw, alphaHex } from "#root/lib";
import { Field, Link } from "#root/components";
import { useFilterContext, useTheme } from "#root/provider";

export function Header() {
    const { headerRef, selected } = useFilterContext();

    const { colors } = useTheme();

    return selected && (
        <header
            className={tw(
                "header",
                "flex",
                "flex-col",
                "border-b-2",
                "border-dashed",
                "sticky",
                "top-0",
                "z-10",
                "pt-4",
                "pb-4",
                "px-4",
                "bg-black/90"
            )}
            style={{
                borderColor: alphaHex(colors[selected.type], 0.6),
            }}
        >
            <div className={tw("flex", "flex-row", "justify-between", "gap-4")}>
                {selected["type"] && (
                    <Field
                        label={{
                            value: "@type",
                            name: selected["type"],
                        }}
                        value={
                            <Link
                                href={`${selected["_context"]}${selected["type"]}`}
                                children={selected["type"]}
                            />
                        }
                        find={false}
                        className={tw("text-sm")}
                    />
                )}
                {selected["_id"] && (
                    <Field
                        label={{
                            value: "id",
                            name: selected["_id"],
                        }}
                        value={selected["_id"]}
                        find={false}
                        className={tw("text-sm", "break-all")}
                    />
                )}
            </div>
            <h1
                ref={headerRef}
                tabIndex={-1}
                className={tw(
                    "text-3xl",
                    "font-medium",
                    "italic",
                    "focus:outline-none",
                    "focus:underline",
                    "focus:decoration-dotted",
                    "focus:underline-offset-4"
                )}
            >
                {selected.name}
            </h1>
        </header>
    );
}
