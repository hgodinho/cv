import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Square, MinusSquare, XSquare } from "react-feather";
import { useTheme } from "#root/provider";

export function Checkbox(
    props: CheckboxPrimitive.CheckboxProps & {
        variant: "all" | "none" | "some";
        label: string;
    }
) {
    const {
        sizes: { icon },
    } = useTheme();

    const CheckType = () => {
        switch (props.variant) {
            case "all":
                return <XSquare size={icon} />;
            case "none":
                return <Square size={icon} />;
            case "some":
            default:
                return <MinusSquare size={icon} />;
        }
    };
    return (
        <label htmlFor={props.id}>
            <CheckboxPrimitive.Root tabIndex={-1} {...props}>
                <CheckboxPrimitive.Indicator></CheckboxPrimitive.Indicator>
                <CheckType />
            </CheckboxPrimitive.Root>
            {props.label}
        </label>
    );
}
