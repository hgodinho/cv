import React from "react";

import { tw } from "#root/lib";
import { cva } from "class-variance-authority";

const layoutVariant = cva(["layout", "grid", ,], {
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
            pdf: [
                "pdf",

                "grid-cols-pdf",
                "grid-rows-pdf",

                "md:grid-cols-pdf-md",
                "md:grid-rows-pdf-md",

                "lg:grid-cols-pdf-lg",
                "lg:grid-rows-pdf-lg",

                "print:grid-cols-pdf",
                "print:grid-rows-pdf",
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
}: React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & {
        variant: "default" | "pdf";
    }
>) {
    return (
        <article
            {...props}
            className={tw(layoutVariant({ variant, className }))}
        >
            {children}
        </article>
    );
}
