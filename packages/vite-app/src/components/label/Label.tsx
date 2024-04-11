import { tw } from "@/lib";

export function Label({
    children,
    ...props
}: React.PropsWithChildren<
    React.LabelHTMLAttributes<
        HTMLLabelElement | HTMLLegendElement | HTMLParagraphElement
    > & {
        as?: "p" | "label" | "legend";
    }
>) {
    const { as, ...rest } = props;
    const Tag = as ?? "p";
    return (
        <Tag
            {...rest}
            className={tw("label", "text-sm", "font-bold", props.className)}
        >
            {children}
        </Tag>
    );
}
