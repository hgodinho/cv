import React, { useMemo } from "react";
import { tw, useLink } from "#root/lib";
import { ExternalLink } from "react-feather";
import { Link as GatsbyLink } from "gatsby";

export type LinkProps = {
    href: string;
};

export function Link({
    href,
    children,
    ...props
}: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>) {
    const { to, internal, isActive, target, ...rest } = useLink(href || "");

    const className = useMemo(() => {
        return tw(
            "text-blue-300",
            "hover:text-blue-500",
            "focus:outline-none",
            "focus:underline",
            "focus:decoration-dotted",
            "focus:underline-offset-4",
            "focus:font-bold",
            isActive ? tw("text-blue-400", "font-bold") : "",
            props.className
        );
    }, [isActive, props.className]);

    return internal ? (
        <GatsbyLink to={to} className={className}>{children}</GatsbyLink>
    ) : (
        <a
            className={className}
            {...rest}
            target={props.target || target}
            href={to}
        >
            <span className={tw("flex", "gap-2")}>
                {children}
                <ExternalLink className={tw("self-center", "w-4", "h-4")} />
            </span>
        </a>
    );
}
