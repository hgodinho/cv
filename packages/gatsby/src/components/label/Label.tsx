import React from "react";
import { tw } from "#root/lib";

export type LabelProps = {
    as?: React.ElementType;
} & (
        | React.HTMLAttributes<Element>
        | React.LabelHTMLAttributes<HTMLLabelElement>
        | React.LabelHTMLAttributes<HTMLLegendElement>
    );

export function Label({
    children,
    as,
    ...props
}: React.PropsWithChildren<LabelProps>) {
    const Tag = as ?? "label";

    return (
        <Tag {...props} className={tw("label", "break-words", props.className)}>
            {children}
        </Tag>
    );
}
