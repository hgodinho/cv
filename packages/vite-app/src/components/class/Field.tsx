import { ReactNode, useCallback } from "react";

import { Link, Label, type LabelProps } from "@/components";
import { useFilterContext } from "@/provider";
import { tw } from "@/lib";

export type FieldLabelProps = {
    url?: string;
    value: string;
} & LabelProps;

export function FieldLabel({
    url,
    value,
    children,
    ...rest
}: React.PropsWithChildren<FieldLabelProps>) {
    return (
        <Label
            {...rest}
            className={tw("flex", "flex-col", "gap-2", rest.className)}
        >
            {url ? <Link href={url}>{value}</Link> : value}
            {children}
        </Label>
    );
}

export type FieldProps = {
    label: FieldLabelProps;
    value: string | string[];
    find?: boolean;
    filterValue?: FilterValue["filterValue"];
};

export function Field({ label, value, find }: FieldProps) {
    const { nodes, filterValue } = useFilterContext();

    find = typeof find !== "undefined" ? find : true;

    const Value = useCallback(
        ({ value, list }: { value: ReactNode; list?: boolean }) => {
            const url = filterValue
                ? filterValue(value ? value.toString() : "")
                : value
                ? value.toString()
                : "";

            if (value?.toString().startsWith("http") && find) {
                const found = nodes.find((node) => node["id"] === value);
                if (found) {
                    value = <Link to={url}>{found["name"]}</Link>;
                }
            }

            const linkProps = url.startsWith("http")
                ? { href: url }
                : { to: url };

            const LinkOrValue = (value: ReactNode) =>
                value ? (
                    value.toString().startsWith("http") ? (
                        <Link {...linkProps}>{value}</Link>
                    ) : (
                        value
                    )
                ) : (
                    value
                );

            return list ? (
                <li
                    key={url}
                    className={tw("list-item", "text-lg", "font-normal")}
                >
                    {LinkOrValue(value)}
                </li>
            ) : (
                <p
                    key={url}
                    className={tw("content", "text-lg", "font-normal")}
                >
                    {LinkOrValue(value)}
                </p>
            );
        },
        [nodes, links, find, filterValue]
    );

    return (
        <FieldLabel className={tw("field", "mb-6")} {...label}>
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
