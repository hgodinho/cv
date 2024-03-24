import { CustomScroll } from "react-custom-scroll";

import "./scrollbar.css";

import { Link } from "@/components";

import { tw } from "@/lib";

export type FieldsProps = { data: Record<string, any>; properties: string[] };

export type LabelProps = { url?: string; label: string };

export type FieldProps = {
    label: string;
    value: string | string[];
    url?: string;
    header?: boolean;
};

export function Fields({ data, properties }: FieldsProps) {
    return (
        <>
            <div
                className={tw(
                    "flex",
                    "flex-row",
                    "gap-4",
                    "border-b-4",
                    "border-dashed",
                    "border-gray-600",
                    "mb-4",
                    "justify-between",
                    "sticky",
                    "top-0",
                    "pt-4",
                    "px-4",
                    "bg-black"
                )}
            >
                {data["type"] && (
                    <Field
                        label="@type"
                        value={data["type"]}
                        url="https://www.w3.org/TR/json-ld11/#specifying-the-type"
                    />
                )}
                {data["id"] && (
                    <Field
                        label="@id"
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
                                        label={property}
                                        value={value}
                                        url={`${data["@context"]}/${property}`}
                                        header={true}
                                    />
                                );
                            }
                            return (
                                <Field
                                    key={property}
                                    label={property}
                                    value={value}
                                    url={`${data["@context"]}/${property}`}
                                />
                            );
                        }
                    })}
                </CustomScroll>
            </div>
        </>
    );
}

export function Label({ url, label }: LabelProps) {
    return (
        <p className={tw("text-sm", "text-gray-300", "text-wrap")}>
            {url ? <Link href={url}>{label}</Link> : label}
        </p>
    );
}

export function Field({ label, value, url, header }: FieldProps) {
    return (
        <div className={tw("field", "mb-4", "text-wrap")}>
            <Label url={url} label={label} />
            {Array.isArray(value) ? (
                value.map((v) =>
                    header ? (
                        <h2
                            key={v}
                            className={tw("text-2xl", "font-medium", "italic", "text-wrap")}
                        >
                            {v.toString().startsWith("http") ? (
                                <Link href={v}>{v}</Link>
                            ) : (
                                v
                            )}
                        </h2>
                    ) : (
                        <p key={v} className={tw("text-lg", "text-wrap")}>
                            {v.toString().startsWith("http") ? (
                                <Link href={v}>{v}</Link>
                            ) : (
                                v
                            )}
                        </p>
                    )
                )
            ) : header ? (
                <h2 className={tw("text-2xl", "font-medium", "italic", "text-wrap")}>
                    {value.toString().startsWith("http") ? (
                        <Link href={value}>{value}</Link>
                    ) : (
                        value
                    )}
                </h2>
            ) : (
                <p className={tw("text-lg", "text-wrap")}>
                    {value.toString().startsWith("http") ? (
                        <Link href={value}>{value}</Link>
                    ) : (
                        value
                    )}
                </p>
            )}
        </div>
    );
}
