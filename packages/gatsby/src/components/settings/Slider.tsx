import React, { useCallback, useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { Label } from "#root/components";

import { alphaHex, tw } from "#root/lib";

export type SliderProps = {
    label: string;
};

const SliderSettings = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & SliderProps
>(({ className, label, ...props }, ref) => {
    const [value, setValue] = useState(props.defaultValue ?? [0]);

    const onInputChange = useCallback(
        (value: number, index: number) => {
            if (typeof props.min !== "undefined" && value < props.min) {
                return;
            }
            if (typeof props.max !== "undefined" && value > props.max) {
                return;
            }
            setValue((prev) => {
                const next = [...prev];
                next[index] = value;
                if (props.onValueChange) {
                    props.onValueChange(next);
                }
                return next;
            });
        },
        [value]
    );

    const onSlideChange = useCallback(
        (value: number[]) => {
            if (props.onValueChange) props.onValueChange(value);
            setValue(value);
        },
        [value]
    );

    const valueToUse = typeof props.value !== "undefined" ? props.value : value;

    return (
        <Label
            className={tw(
                "flex",
                "flex-col",
                "gap-2",
                "pt-2",
                "pb-4",
                "pr-2",
                "mb-2"
            )}
        >
            {label}
            <div className={tw("flex", "flex-row", "mx-2", "gap-2")}>
                {valueToUse.map((v, i) => (
                    <input
                        name={`${props.id}.${i}`}
                        key={`${props.id}.${i}`}
                        type="number"
                        className={tw(
                            "w-16",
                            "flex",
                            "h-8",
                            "rounded-md",
                            "border",
                            "border-input",
                            "bg-black",
                            "px-3",
                            "py-2",
                            "text-sm",
                            "[appearance:textfield]",
                            "[&::-webkit-outer-spin-button]:appearance-none",
                            "[&::-webkit-inner-spin-button]:appearance-none",
                            "ring-offset-background",
                            "placeholder:text-muted-foreground",
                            "focus:outline-none",
                            "focus:ring-4",
                            "focus:ring-inset",
                            "focus:ring-gray-600",
                            "disabled:cursor-not-allowed",
                            "disabled:opacity-50"
                        )}
                        tabIndex={-1}
                        value={v}
                        onChange={(e) => {
                            onInputChange(parseFloat(e.target.value), i);
                        }}
                        aria-label={label}
                    />
                ))}
                <SliderPrimitive.Root
                    ref={ref}
                    className={tw(
                        "relative",
                        "flex",
                        "w-full",
                        "touch-none",
                        "select-none",
                        "items-center",
                        className
                    )}
                    {...props}
                    value={valueToUse}
                    onValueChange={onSlideChange}
                >
                    <SliderPrimitive.Track
                        className={tw(
                            "relative",
                            "border-b-2",
                            "border-dotted",
                            "w-full",
                            "mx-2",
                            "grow",
                            "overflow-hidden",
                            "rounded-md"
                        )}
                        style={{
                            borderColor: alphaHex("#ffffff", 0.4),
                        }}
                    >
                        <SliderPrimitive.Range className={tw("absolute")} />
                    </SliderPrimitive.Track>
                    <SliderPrimitive.Thumb
                        className={tw(
                            "block",
                            "h-4",
                            "w-4",
                            "rounded-full",
                            "border-2",
                            "border-white",
                            "bg-black/60",
                            "transition-colors",
                            "focus:outline-none",
                            "focus:ring-4",
                            "focus:ring-inset",
                            "focus:ring-gray-600",
                            "disabled:pointer-events-none",
                            "disabled:opacity-50"
                        )}
                    />
                </SliderPrimitive.Root>
            </div>
        </Label>
    );
});

SliderSettings.displayName = SliderPrimitive.Root.displayName;

export { SliderSettings };
