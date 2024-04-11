import { Link, Label, Scroll } from "@/components";
import { type FilterValue } from "@/provider";
import { tw } from "@/lib";

export type FieldsProps = {
    data: Record<string, any>;
    properties: string[];
    colors: Record<string, string>;
    filterValue?: FilterValue["filterValue"];
};

export function Fields({ data, properties, filterValue }: FieldsProps) {
    return (
        <div className={tw("overflow-auto", "flex", "flex-col")}>
            <Scroll root={{ className: tw("mr-2", "mt-2", "mb-2") }}>
                <div className={tw("px-4", "pt-2")}>
                    {properties.map((property) => {
                        const value = data[property];
                        if (
                            data.hasOwnProperty(property) &&
                            typeof value !== "undefined"
                        ) {
                            if ("name" === property) {
                                return null;
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

export type LabelProps = { url?: string; value: string };

export function FieldLabel({ url, value }: LabelProps) {
    return (
        <Label className={tw()}>
            {url ? <Link href={url}>{value}</Link> : value}
        </Label>
    );
}

export type FieldProps = {
    label: LabelProps;
    value: string | string[];
    url?: string;
    filterValue?: FilterValue["filterValue"];
};

export function Field({ label, value, url, filterValue }: FieldProps) {
    const Value = (value: string) => {
        const url = filterValue ? filterValue(value.toString()) : value;
        const linkProps = url.startsWith("http") ? { href: url } : { to: url };
        return (
            <p key={value} className={tw("text-wrap")}>
                {value.toString().startsWith("http") ? (
                    <Link {...linkProps}>{value}</Link>
                ) : (
                    value
                )}
            </p>
        );
    };

    return (
        <div className={tw("field", "mb-4")}>
            <FieldLabel {...label} />
            {Array.isArray(value) ? value.map((v) => Value(v)) : Value(value)}
        </div>
    );
}
