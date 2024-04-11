import { useMemo } from "react";
import { tw } from "@/lib";
import {
    Link as LinkRouter,
    LinkProps as LinkRouterProps,
} from "react-router-dom";

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
    const props = useMemo<LinkRouterProps>(() => {
        return {
            ...rest,
            target: href ? "_blank" : "_self",
            to: href || to || "",
        };
    }, [href, to, rest]);

    return (
        <LinkRouter
            className={tw("text-blue-300", "hover:text-blue-500")}
            {...props}
        >
            {children}
        </LinkRouter>
    );
}
