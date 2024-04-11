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

export type LabelProps = {
    url?: string;
    value: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export function FieldLabel({
    url,
    value,
    children,
    ...rest
}: React.PropsWithChildren<LabelProps>) {
    return (
        <Label {...rest}>
            {url ? (
                <span>
                    <Link href={url}>{value}</Link>
                </span>
            ) : (
                value
            )}
            {children}
        </Label>
    );
}

export type FieldProps = {
    label: LabelProps;
    value: string | string[];
    // list?: boolean;
    filterValue?: FilterValue["filterValue"];
};

export function Field({ label, value, filterValue }: FieldProps) {
    const Value = ({ value, list }: { value: string; list?: boolean }) => {
        const url = filterValue ? filterValue(value.toString()) : value;
        const linkProps = url.startsWith("http") ? { href: url } : { to: url };

        const LinkOrValue = (value: string) =>
            value.toString().startsWith("http") ? (
                <Link {...linkProps}>{value}</Link>
            ) : (
                value
            );

        return list ? (
            <li key={value} className={tw("text-lg", "font-normal")}>
                {LinkOrValue(value)}
            </li>
        ) : (
            <span key={value} className={tw("text-lg", "font-normal")}>
                {LinkOrValue(value)}
            </span>
        );
    };

    return (
        <FieldLabel
            className={tw("field", "flex", "flex-col", "mb-4")}
            {...label}
        >
            {Array.isArray(value) ? (
                <ul className={tw("list-[square]", "list-inside", "ml-4")}>
                    {value.map((value) => (
                        <Value key={value} value={value} list={true} />
                    ))}
                </ul>
            ) : (
                Value({ value })
            )}
        </FieldLabel>
    );
}
