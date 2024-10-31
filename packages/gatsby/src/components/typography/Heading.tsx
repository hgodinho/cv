import React from "react";
import { tw } from "#root/lib";
import { cva } from "class-variance-authority";

export type HeadingProps = {
    level: 1 | 2 | 3 | 4 | 5 | 6;
} & React.HTMLAttributes<HTMLHeadingElement>;

export const headingVariants = cva(["mb-4", "font-bold", "font-mono"], {
    variants: {
        level: {
            1: ["text-3xl"],
            2: ["text-2xl"],
            3: ["text-xl"],
            4: ["text-lg"],
            5: ["text-base"],
            6: ["text-base", "font-sans", "italic"],
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
