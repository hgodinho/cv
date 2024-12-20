import React from "react";
import { buttonVariants } from "#root/components";
import { tw } from "#root/lib";
import { FileText, Waypoints } from "lucide-react";
import { useI18nContext, usePageContext, useTheme } from "#root/provider";
import { cva } from "class-variance-authority";
import { Link } from "gatsby";

export const variantSwitchVariant = cva(
    ["variant-switch", "flex", "justify-end", "z-10", "print:hidden"],
    {
        variants: {
            variant: {
                default: ["default"],
                text: ["text"],
                home: ["home"],
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
    const { pageContext } = usePageContext();

    return (
        <div
            {...props}
            className={tw(
                variantSwitchVariant({
                    variant,
                    className,
                })
            )}
        >
            {variant === "default" ? (
                <Link
                    className={tw(buttonVariants())}
                    to={`/${locale}/${pageContext?.site.textSlug ?? "text"}`}
                >
                    <FileText className={tw("w-6", "h-6")} />
                </Link>
            ) : (
                <Link className={tw(buttonVariants())} to={`/${locale}`}>
                    <Waypoints className={tw("w-6", "h-6")} />
                </Link>
            )}
        </div>
    );
}
