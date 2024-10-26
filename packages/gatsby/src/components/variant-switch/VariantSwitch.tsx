import React from "react";
import { buttonVariants } from "#root/components";
import { tw } from "#root/lib";
import { FileText, Waypoints } from "lucide-react";
import { useI18nContext, useTheme } from "#root/provider";
import { cva } from "class-variance-authority";

export const variantSwitchVariant = cva(
    ["flex", "justify-end", "print:hidden", "z-10"],
    {
        variants: {
            variant: {
                default: ["lg:col-start-6", "lg:row-start-5"],
                pdf: ["lg:col-start-6", "lg:row-start-4"],
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export function VariantSwitch({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const {
        state: { variant },
    } = useTheme();

    const { locale } = useI18nContext();

    return (
        <div
            {...props}
            className={tw(variantSwitchVariant({ variant, className }))}
        >
            {variant === "default" ? (
                <a
                    className={tw(buttonVariants(), "flex", "p-2", "w-max")}
                    href={`/${locale}/print`}
                >
                    <FileText className={tw("w-6", "h-6")} />
                </a>
            ) : (
                <a
                    className={tw(buttonVariants(), "flex", "p-2", "w-max")}
                    href={`/${locale}`}
                >
                    <Waypoints className={tw("w-6", "h-6")} />
                </a>
            )}
        </div>
    );
}