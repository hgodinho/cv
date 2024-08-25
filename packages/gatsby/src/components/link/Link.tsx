import React, { useMemo } from "react";
import { tw, useLink } from "#root/lib";
import { ExternalLink } from "react-feather";

export type LinkProps = {
    href: string;
};

export function Link({
    href,
    children,
    ...rest
}: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>) {
    const { location, target, isActive } = useLink(href);

    return (
        <a
            className={tw(
                "text-blue-300",
                "hover:text-blue-500",
                "focus:outline-none",
                "focus:underline",
                "focus:decoration-dotted",
                "focus:underline-offset-4",
                "focus:font-bold",
                isActive ? tw("text-blue-400", "font-bold") : "",
                rest.className
            )}
            {...rest}
            target={rest.target || target}
            href={location}
        >
            {target === "_blank" ? (
                <span className={tw("flex", "gap-2")}>
                    {children}
                    <ExternalLink className={tw("self-center", "w-4", "h-4")} />
                </span>
            ) : (
                children
            )}
        </a>
    );
}
