import { CustomScroll } from "react-custom-scroll";

import "./scrollbar.css";

import { Link } from "@/components";

import { tw, alphaHex } from "@/lib";

export type FilterValue = {
    filterValue?: (value: string) => string;
}

export type FieldsProps = { data: Record<string, any>; properties: string[] } & FilterValue;

export type LabelProps = { url?: string; value: string };

export type FieldProps = {
    label: LabelProps,
    value: string | string[];
    url?: string;
    header?: boolean;
} & FilterValue;

export function Fields({ data, properties, filterValue }: FieldsProps) {
    return (
        <>
            <div
                className={tw(
                    "flex",
                    "flex-row",
                    "gap-4",
                    "border-b-2",
                    "border-dashed",
                    "mb-4",
                    "justify-between",
                    "sticky",
                    "top-0",
                    "pt-4",
                    "px-4",
                    "bg-black",
                    "text-sm"
                )}
                style={{
                    borderColor: alphaHex(data.color, 0.6)
                }}
            >
                {data["type"] && (
                    <Field
                        label={{ value: "@type" }}
                        value={data["type"]}
                        url="https://www.w3.org/TR/json-ld11/#specifying-the-type"
                    />
                )}
                {data["id"] && (
                    <Field
                        label={{ value: "@id" }}
                        value={data["id"]}
                        url="https://www.w3.org/TR/json-ld11/#node-identifiers"
                    />
                )}
            </div>
            <div
                className={tw("cv", "min-h-0", "min-w-0")}
            >
                <CustomScroll
                    heightRelativeToParent={"100%"}
                    className={tw("mx-4", "pb-4")}
                >
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
                                            url: `${data["@context"]}/${property}`
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
                                        url: `${data["@context"]}/${property}`
                                    }}
                                    value={value}
                                    filterValue={filterValue}
                                />
                            );
                        }
                    })}
                </CustomScroll>
            </div>
        </>
    );
}

export function Label({ url, value }: LabelProps) {
    return (
        <p className={tw("text-sm", "text-gray-300", "text-wrap")}>
            {url ? <Link href={url}>{value}</Link> : value}
        </p>
    );
}

export function Field({ label, value, url, header, filterValue }: FieldProps) {
    const Value = (header: boolean | undefined, value: string) => {

        if (header) {
            return (
                <h2
                    key={value}
                    className={tw("text-2xl", "font-medium", "italic", "text-wrap")}
                >
                    {value.toString().startsWith("http") ? (
                        <Link href={filterValue ? filterValue(value) : value}>{value}</Link>
                    ) : (
                        value
                    )}
                </h2>
            )
        }
        return (
            <p key={value} className={tw("text-wrap")}>
                {value.toString().startsWith("http") ? (
                    <Link href={filterValue ? filterValue(value) : value}>{value}</Link>
                ) : (
                    value
                )}
            </p>
        );
    }

    return (
        <div className={tw("field", "mb-4", "text-wrap")}>
            <Label {...label} />
            {Array.isArray(value) ? (
                value.map((v) =>
                    Value(header, v)
                )
            ) : Value(header, value)}
        </div>
    );
}
