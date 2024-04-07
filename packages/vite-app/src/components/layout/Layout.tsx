import { tw } from "@/lib";

export function Layout({
    children,
    ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
    return (
        <div
            {...props}
            className={tw(
                "grid",
                "grid-cols-layout",
                "grid-rows-layout",
                "relative",
                "p-4"
            )}
        >
            {children}
        </div>
    );
}
