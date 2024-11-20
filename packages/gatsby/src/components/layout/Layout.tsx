import React from "react";

import { tw } from "#root/lib";
import { cva } from "class-variance-authority";
import { Variant } from "#root/types";

const layoutVariant = cva(["layout", "grid", "text-pretty"], {
    variants: {
        variant: {
            default: [
                "default",
                "grid-cols-layout",
                "grid-rows-layout",
                "relative", // tablet
                "md:grid-cols-layout-md",
                "md:grid-rows-layout-md",

                // desktop
                "lg:grid-cols-layout-lg",
                "lg:grid-rows-layout-lg",
            ],
            home: [
                "home",

                "grid-cols-home",
                "grid-rows-home",

                "md:grid-cols-home-md",
            ],
            text: [
                "text",

                "grid-cols-text",
                "grid-rows-text",

                "md:grid-cols-text-md",
                "md:grid-rows-text-md",

                "lg:grid-cols-text-lg",
                "lg:grid-rows-text-lg",

                "print:grid-cols-text",
                "print:grid-rows-text",
            ],
        },
        defaultVariants: {
            variant: "default",
        },
    },
});

export function Layout({
    children,
    className,
    variant,
    ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement> & Variant>) {
    return (
        <article
            {...props}
            className={tw(layoutVariant({ variant, className }))}
        >
            {children}
        </article>
    );
}
