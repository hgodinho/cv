import React, { useMemo } from "react";
import { tw, useLink } from "#root/lib";
import { ExternalLink } from "react-feather";
import { Link as GatsbyLink } from "gatsby";

export type LinkProps = {
    iconClass?: string;
};

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

    const { className } = useMemo(() => {
        return {
            className: tw(
                "inline-flex",
                "items-center",
                "gap-1",
                "print:text-black",
                "dark:text-blue-300",
                "dark:hover:text-blue-500",
                "text-blue-800",
                "hover:text-blue-700",
                "focus:outline-none",
                "focus:underline",
                "focus:decoration-dotted",
                "focus:underline-offset-4",
                "focus:font-bold",
                "[overflow-wrap:anywhere]",
                isActive ? tw("dark:text-blue-400", "font-bold") : "",
                props.className
            ),
        };
    }, [isActive, props.className]);

    return internal ? (
        <GatsbyLink to={to} className={className} style={style}>
            {children}
        </GatsbyLink>
    ) : (
        <a
            className={className}
            {...rest}
            target={props.target || target}
            href={to}
            style={style}
        >
            {children}
            <ExternalLink className={tw("w-[12px]", "h-[12px]", iconClass)} />
        </a>
    );
}
