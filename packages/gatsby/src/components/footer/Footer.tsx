import React from "react";
import { VariantSwitch, L10NSelect } from "#root/components";
import { Variant } from "#root/types";
import { tw } from "#root/lib";
import { cva } from "class-variance-authority";

export type FooterProps = Variant & React.HTMLAttributes<HTMLDivElement>;

export const footerVariants = cva(["flex", "justify-between"], {
    variants: {
        variant: {
            default: [
                "col-start-2",
                "md:col-start-2",
                "lg:col-start-2",

                "col-span-5",
                "lg:col-span-5",

                "row-start-5",
            ],
            text: [
                "col-start-2",
                "md:col-start-2",
                "lg:col-start-2",

                "col-span-1",
                "md:col-span-3",
                "lg:col-span-5",

                "row-start-6",
                "lg:row-start-4",
            ],
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export function Footer({ variant, className, ...props }: FooterProps) {
    return (
        <footer
            className={tw(footerVariants({ variant, className }))}
            {...props}
        >
            <L10NSelect variant={variant} />
            <VariantSwitch />
        </footer>
    );
}
