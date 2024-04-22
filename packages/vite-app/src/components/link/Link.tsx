import { useMemo } from "react";
import { tw, useFilteredURL } from "@/lib";
import {
    Link as LinkRouter,
    LinkProps as LinkRouterProps,
} from "react-router-dom";
import { ExternalLink } from "react-feather";

export type LinkProps = Omit<LinkRouterProps, "to"> & {
    href?: string;
    to?: LinkRouterProps["to"];
};

export function Link({
    href,
    children,
    to,
    ...rest
}: React.PropsWithChildren<LinkProps>) {
    const target = useMemo(() => (href ? "_blank" : "_self"), [href]);
    const location = useFilteredURL(to || href || "");

    return (
        <LinkRouter
            className={tw(
                "text-blue-300",
                "hover:text-blue-500",
                "focus:outline-none",
                "focus:underline",
                "focus:decoration-dotted",
                "focus:underline-offset-4",
                "focus:font-bold"
            )}
            target={target}
            to={location}
            {...rest}
        >
            {target === "_blank" ? (
                <span className={tw("flex", "gap-2")}>
                    {children}
                    <ExternalLink className={tw("self-center", "w-4", "h-4")} />
                </span>
            ) : (
                children
            )}
        </LinkRouter>
    );
}
