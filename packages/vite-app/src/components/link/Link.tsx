import { tw } from "@/lib";
import { Link as LinkRouter } from "react-router-dom";

export type LinkProps = {
    href: string;
};

export function Link({ href, children }: React.PropsWithChildren<LinkProps>) {
    return (
        <LinkRouter
            to={href}
            className={tw("text-blue-300", "hover:text-blue-500")}
        >
            {children}
        </LinkRouter>
    );
}
