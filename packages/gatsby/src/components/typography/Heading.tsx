import React from "react";
import { tw } from "#root/lib";
import { cva } from "class-variance-authority";

export type HeadingProps = {
    level: 1 | 2 | 3 | 4 | 5 | 6;
} & React.HTMLAttributes<HTMLHeadingElement>;

export const headingVariants = cva(["mt-4", "mb-4", "font-bold", "font-mono"], {
    variants: {
        level: {
            1: ["text-4xl"],
            2: ["text-3xl"],
            3: ["text-2xl"],
            4: ["text-xl"],
            5: ["text-lg"],
            6: ["text-base"],
        },
    },
});

export function Heading({
    level,
    children,
    className,
    ...props
}: HeadingProps) {
    return React.createElement(
        `h${level}`,
        {
            className: tw(headingVariants({ level, className })),
            ...props,
        },
        children
    );
}
