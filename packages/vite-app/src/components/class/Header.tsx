import { tw, alphaHex } from "@/lib";
import { Field } from "@/components";
import { type FilterValue } from "@/provider";

export type HeaderProps = {
    data: Record<string, any>;
    colors: Record<string, string>;
    filterValue?: FilterValue["filterValue"];
};

export function Header({ data, colors, filterValue }: HeaderProps) {
    return (
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
                borderColor: alphaHex(colors[data.type], 0.6),
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
                {data["type"] && (
                    <Field
                        label={{ value: "@type" }}
                        value={data["type"]}
                        filterValue={filterValue}
                        find={false}
                    />
                )}
                {data["id"] && (
                    <Field
                        label={{ value: "@id" }}
                        value={data["id"]}
                        filterValue={filterValue}
                        find={false}
                    />
                )}
            </div>
            <h1 className={tw("text-3xl", "font-medium", "italic")}>
                {data.name}
            </h1>
        </header>
    );
}
