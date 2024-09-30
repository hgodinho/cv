import React, { Key, ReactNode, useCallback } from "react";

import {
    Link,
    Label,
    type LabelProps,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "#root/components";
import { useCVContext } from "#root/provider";
import { tw } from "#root/lib";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Info, Hash, AtSign } from "lucide-react";

export type FieldLabelProps = {
    url?: string;
    name: string;
    value: string;
} & LabelProps;

export function FieldLabel({
    url,
    value,
    children,
    className,
    name,
    ...rest
}: React.PropsWithChildren<FieldLabelProps>) {
    return (
        <Label
            as="div"
            className={tw(
                "flex",
                "flex-col",
                "mb-6",
                "gap-2",
                "font-bold",
                className
            )}
            {...rest}
        >
            {url ? (
                <span className={tw("flex", "flex-row", "gap-2")}>
                    {value}
                    <TooltipProvider delayDuration={300}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className={tw("w-4", "h-4")} />
                            </TooltipTrigger>
                            <TooltipContent
                                className={tw("flex", "flex-col", "text-xs")}
                            >
                                <span
                                    className={tw(
                                        "flex",
                                        "flex-row",
                                        "items-center",
                                        "gap-1"
                                    )}
                                >
                                    <Hash className={tw("w-4", "w-4")} />
                                    {name}
                                </span>
                                <span
                                    className={tw(
                                        "flex",
                                        "flex-row",
                                        "items-center",
                                        "gap-1"
                                    )}
                                >
                                    <AtSign className={tw("w-4", "w-4")} />
                                    <Link href={url} className={tw()}>
                                        schema.org
                                    </Link>
                                </span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </span>
            ) : (
                value
            )}
            {children}
        </Label>
    );
}

export type FieldProps = {
    value: ReactNode;
    label?: FieldLabelProps;
    find?: boolean;
    className?: string;
};

export function Field({ label, value, find, className }: FieldProps) {
    const { nodes } = useCVContext();

    find = typeof find !== "undefined" ? find : true;

    const Value = useCallback(
        ({ value, list }: { value: ReactNode; list?: boolean }) => {
            const url = value ? value.toString() : "";

            if (value?.toString().startsWith("http") && find) {
                const found = nodes?.find((node) => node["id"] === value);
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
        <FieldLabel
            className={tw("field", className)}
            {...label}
            name={label?.name || ""}
            value={label?.value || ""}
        >
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
