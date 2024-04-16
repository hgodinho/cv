import { Helmet } from "react-helmet";

import { tw, alphaHex } from "@/lib";
import { Field } from "@/components";
import { useFilterContext } from "@/provider";

export function Header() {
    const {
        headerRef,
        selected,
        data: { name, colors },
    } = useFilterContext();

    return selected ? (
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
            <div
                className={tw(
                    "flex",
                    "flex-row",
                    "justify-between",
                    "gap-4",
                    "text-sm"
                )}
            >
                {selected["type"] && (
                    <Field
                        label={{ value: "@type" }}
                        value={selected["type"]}
                        find={false}
                    />
                )}
                {selected["id"] && (
                    <Field
                        label={{ value: "@id" }}
                        value={selected["id"]}
                        find={false}
                    />
                )}
            </div>
            <Helmet>
                <title>{`${name} - ${selected.name}`}</title>
            </Helmet>
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
    ) : null;
}
