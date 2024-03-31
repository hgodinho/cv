import { tw } from "@/lib";

export function Label({
    children,
    ...props
}: React.PropsWithChildren<
    React.LabelHTMLAttributes<HTMLLabelElement | HTMLLegendElement> & {
        as?: "legend";
    }
>) {
    const Tag = props.as ?? "label";
    return (
        <Tag
            {...props}
            className={tw("label", "text-sm", "font-bold", props.className)}
        >
            {children}
        </Tag>
    );
}
