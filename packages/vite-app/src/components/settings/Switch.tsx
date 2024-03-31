import { tw } from "@/lib";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { Label } from "@/components";

export type SwitchProps = {
    label?: string;
} & React.ComponentProps<typeof SwitchPrimitive.Root>;

export function Switch({ label, ...props }: SwitchProps) {
    return (
        <div className={tw("mb-4")}>
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
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-ring",
                    "focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-background",
                    "disabled:cursor-not-allowed",
                    "disabled:opacity-50",
                    "data-[state=checked]:bg-white/90",
                    "data-[state=unchecked]:bg-white/40"
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
            {label && (
                <Label className={tw("ml-2")} htmlFor={props.id}>
                    {label}
                </Label>
            )}
        </div>
    );
}
