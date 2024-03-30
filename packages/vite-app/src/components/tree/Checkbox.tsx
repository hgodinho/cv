import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Square, MinusSquare, XSquare } from "react-feather";

export function Checkbox(props: CheckboxPrimitive.CheckboxProps & { variant: "all" | "none" | "some" }) {
    const CheckType = () => {
        switch (props.variant) {
            case "all":
                return <XSquare size={16} />;
            case "none":
                return <Square size={16} />;
            case "some":
            default:
                return <MinusSquare size={16} />;
        }
    }
    return (
        <CheckboxPrimitive.Root {...props} >
            <CheckboxPrimitive.Indicator >
            </CheckboxPrimitive.Indicator >
            <CheckType />
        </CheckboxPrimitive.Root>
    )
}