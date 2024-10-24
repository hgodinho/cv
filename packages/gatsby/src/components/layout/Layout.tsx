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
                "lg:grid-cols-pdf-lg",
                // "sm:grid-cols-pdf-sm",
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
