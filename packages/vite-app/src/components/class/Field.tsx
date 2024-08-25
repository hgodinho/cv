import React, { Key, ReactNode, useCallback } from "react";

import { Link, Label, type LabelProps } from "#root/components";
import { useFilterContext } from "#root/provider";
import { tw } from "#root/lib";

export type FieldLabelProps = {
    url?: string;
    value: string;
} & LabelProps;

export function FieldLabel({
    url,
    value,
    children,
    className,
    ...rest
}: React.PropsWithChildren<FieldLabelProps>) {
    return (
        <Label
            as="div"
            className={tw("flex", "flex-col", "mb-6", "gap-2", className)}
            {...rest}
        >
            {url ? <Link href={url}>{value}</Link> : value}
            {children}
        </Label>
    );
}

export type FieldProps = {
    label: FieldLabelProps;
    value: ReactNode;
    find?: boolean;
    className?: string;
};

export function Field({ label, value, find, className }: FieldProps) {
    const { nodes } = useFilterContext();

    find = typeof find !== "undefined" ? find : true;

    const Value = useCallback(
        ({ value, list }: { value: ReactNode; list?: boolean }) => {
            const url = value ? value.toString() : "";

            if (value?.toString().startsWith("http") && find) {
                const found = nodes.find((node) => node["id"] === value);
                if (found) {
                    value = <Link href={url}>{found["name"]}</Link>;
                }
            }
            const LinkOrValue = (value: ReactNode) =>
                value ? (
                    value.toString().startsWith("http") ? (
                        <Link href={url}>{value}</Link>
                    ) : (
                        value
                    )
                ) : (
                    value
                );

            return list ? (
                <li key={url} className={tw("list-item", "font-normal")}>
                    {LinkOrValue(value)}
                </li>
            ) : (
                <p key={url} className={tw("content", "font-normal")}>
                    {LinkOrValue(value)}
                </p>
            );
        },
        [nodes, find]
    );

    return (
        <FieldLabel className={tw("field", className)} {...label}>
            {Array.isArray(value) ? (
                <ul className={tw("list-[square]", "list-inside", "ml-4")}>
                    {value.map((value: ReactNode, i: Key) => (
                        <Value key={i} value={value} list={true} />
                    ))}
                </ul>
            ) : (
                Value({ value })
            )}
        </FieldLabel>
    );
}
