import { Link, Label, Scroll } from "@/components";
import { type FilterValue } from "@/provider";
import { tw, alphaHex } from "@/lib";

export type FieldsProps = {
    data: Record<string, any>;
    properties: string[];
    colors: Record<string, string>;
    filterValue?: FilterValue["filterValue"];
};

export type LabelProps = { url?: string; value: string };

export type FieldProps = {
    label: LabelProps;
    value: string | string[];
    url?: string;
    header?: boolean;
    filterValue?: FilterValue["filterValue"];
};

export function Fields({ data, properties, colors, filterValue }: FieldsProps) {
    return (
        <div className={tw("overflow-auto", "flex", "flex-col")}>
            <div
                className={tw(
                    "header",
                    "flex",
                    "flex-row",
                    "gap-4",
                    "border-b-2",
                    "border-dashed",
                    "justify-between",
                    "sticky",
                    "top-0",
                    "z-10",
                    "pt-4",
                    "px-4",
                    "bg-black/90",
                    "text-sm"
                )}
                style={{
                    borderColor: alphaHex(colors[data.type], 0.6),
                }}
            >
                {data["type"] && (
                    <Field
                        label={{ value: "@type" }}
                        value={data["type"]}
                        url="https://www.w3.org/TR/json-ld11/#specifying-the-type"
                        filterValue={filterValue}
                    />
                )}
                {data["id"] && (
                    <Field
                        label={{ value: "@id" }}
                        value={data["id"]}
                        url="https://www.w3.org/TR/json-ld11/#node-identifiers"
                        filterValue={filterValue}
                    />
                )}
            </div>
            <Scroll root={{ className: tw("mr-2", "mt-2", "mb-2") }}>
                <div className={tw("px-4", "pt-2")}>
                    {properties.map((property) => {
                        const value = data[property];
                        if (
                            data.hasOwnProperty(property) &&
                            typeof value !== "undefined"
                        ) {
                            if ("name" === property) {
                                return (
                                    <Field
                                        key={property}
                                        label={{
                                            value: property,
                                            url: `${data["@context"]}/${property}`,
                                        }}
                                        value={value}
                                        header={true}
                                        filterValue={filterValue}
                                    />
                                );
                            }
                            return (
                                <Field
                                    key={property}
                                    label={{
                                        value: property,
                                        url: `${data["@context"]}/${property}`,
                                    }}
                                    value={value}
                                    filterValue={filterValue}
                                />
                            );
                        }
                    })}
                </div>
            </Scroll>
        </div>
    );
}

export function FieldLabel({ url, value }: LabelProps) {
    return (
        <Label className={tw()}>
            {url ? <Link href={url}>{value}</Link> : value}
        </Label>
    );
}

export function Field({ label, value, url, header, filterValue }: FieldProps) {
    const Value = (header: boolean | undefined, value: string) => {
        if (header) {
            return (
                <h2
                    key={value}
                    className={tw(
                        "text-2xl",
                        "font-medium",
                        "italic",
                        "text-wrap"
                    )}
                >
                    {value.toString().startsWith("http") ? (
                        <Link href={filterValue ? filterValue(value) : value}>
                            {value}
                        </Link>
                    ) : (
                        value
                    )}
                </h2>
            );
        }
        return (
            <p key={value} className={tw("text-wrap")}>
                {value.toString().startsWith("http") ? (
                    <Link href={filterValue ? filterValue(value) : value}>
                        {value}
                    </Link>
                ) : (
                    value
                )}
            </p>
        );
    };

    return (
        <div className={tw("field", "mb-4")}>
            <FieldLabel {...label} />
            {Array.isArray(value)
                ? value.map((v) => Value(header, v))
                : Value(header, value)}
        </div>
    );
}
