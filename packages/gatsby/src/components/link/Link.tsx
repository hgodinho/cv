import React, { useMemo } from "react";
import { tw, useLink } from "#root/lib";
import { ExternalLink } from "react-feather";
import { Link as GatsbyLink } from "gatsby";
import { cva } from "class-variance-authority";

export type LinkProps = {
    iconClass?: string;
};

export const linkVariants = cva([
    "inline-flex",
    "items-center",
    "gap-1",
    "print:text-black",
    "underline",
    "decoration-auto",

    "decoration-blue-700",
    "[overflow-wrap:anywhere]",
    "decoration-dashed",

    // modifiers
    "dark:decoration-blue-300",
    "dark:hover:decoration-blue-500",

    "hover:decoration-solid",

    "focus:outline-none",
    "focus:underline",
    "focus:decoration-dotted",
    "focus:underline-offset-4",
    "focus:font-bold",

    // media
    "print:no-underline",
]);

export function Link({
    href,
    children,
    iconClass,
    style,
    ...props
}: React.PropsWithChildren<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps
>) {
    const { to, internal, isActive, target, ...rest } = useLink(href || "");

    return internal ? (
        <GatsbyLink
            to={to}
            className={tw(
                linkVariants({
                    className: [
                        isActive ? tw("dark:text-blue-400", "font-bold") : "",
                        props.className,
                    ],
                })
            )}
            style={style}
        >
            {children}
        </GatsbyLink>
    ) : (
        <a
            className={tw(
                linkVariants({
                    className: [
                        isActive ? tw("dark:text-blue-400", "font-bold") : "",
                        props.className,
                    ],
                })
            )}
            {...rest}
            target={props.target || target}
            href={to}
            style={style}
        >
            {children}
            <ExternalLink
                className={tw(
                    "relative",
                    "w-[12px]",
                    "h-[12px]",
                    "print:hidden",
                    iconClass
                )}
            />
        </a>
    );
}
