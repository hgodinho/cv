import { tw } from "@/lib";

export type LabelProps = {
    as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>;

export function Label({
    children,
    as,
    ...props
}: React.PropsWithChildren<LabelProps>) {
    const Tag = as ?? "div";

    return (
        <Tag
            {...props}
            className={tw("label", "text-sm", "font-bold", props.className)}
        >
            {children}
        </Tag>
    );
}
