import { tw } from "@/lib";
import { Link as LinkRouter } from 'react-router-dom';

export type LinkProps = {
    href: string;
}

export function Link({ href, children }: React.PropsWithChildren<LinkProps>) {
    return (
        <LinkRouter
            to={href}
            className={tw("text-blue-200", "hover:text-blue-400", "text-wrap")}>
            {children}
        </LinkRouter>
    )
}