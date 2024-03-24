import { tw } from "@/lib";

export type LinkProps = {
    href: string;
    target?: string;
}

export function Link({ href, target, children }: React.PropsWithChildren<LinkProps>) {
    return (
        <a
            href={href}
            target={target || '_blank'}
            className={tw("text-blue-200", "hover:text-blue-400", "text-wrap")}>
            {children}
        </a>
    )
}