import { tw } from "@/lib";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { Label } from "@/components";

export type SwitchProps = {
    label: string;
} & React.ComponentProps<typeof SwitchPrimitive.Root>;

export function Switch({ label, ...props }: SwitchProps) {
    return (
        <Label
            className={tw(
                "flex",
                "flex-row",
                "gap-2",
                "pt-2",
                "pb-4",
                "pr-2",
                "mb-2"
            )}
        >
            <SwitchPrimitive.Root
                className={tw(
                    "peer",
                    "inline-flex",
                    "h-4",
                    "w-9",
                    "shrink-0",
                    "cursor-pointer",
                    "items-center",
                    "rounded-full",
                    "border-2",
                    "border-transparent",
                    "transition-colors",
                    "focus:outline-none",
                    "focus:ring-4",
                    "focus:ring-inset",
                    "focus:ring-gray-600",
                    "disabled:cursor-not-allowed",
                    "disabled:bg-gray-400",
                    "data-[state=checked]:bg-gray-50",
                    "data-[state=unchecked]:bg-gray-400"
                )}
                {...props}
                name={props.id}
            >
                <SwitchPrimitive.Thumb
                    className={tw(
                        "pointer-events-none",
                        "block",
                        "h-3",
                        "w-3",
                        "rounded-full",
                        "bg-black/90",
                        "shadow-lg",
                        "ring-0",
                        "transition-transform",
                        "data-[state=checked]:translate-x-5",
                        "data-[state=unchecked]:translate-x-0"
                    )}
                />
            </SwitchPrimitive.Root>
            {label}
        </Label>
    );
}
