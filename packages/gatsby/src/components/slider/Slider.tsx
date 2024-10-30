"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { tw } from "#root/lib";

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <SliderPrimitive.Root
            ref={ref}
            className={tw(
                "relative flex w-full touch-none select-none items-center",
                className
            )}
            {...props}
        >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full">
                <SliderPrimitive.Range
                    className={tw(
                        "absolute",
                        "h-full",
                        "border-2",
                        "bg-black",
                        "border-black",
                    )}
                />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
                className={tw(
                    "flex",
                    "h-5",
                    "w-5",
                    "rounded-full",
                    "border-2",
                    "border-black",
                    "bg-black",
                    "ring-offset-black",
                    "transition-colors",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-ring",
                    "focus-visible:ring-offset-2",
                    "disabled:pointer-events-none",
                    "disabled:opacity-50",
                    "flex-nowrap",
                    "content-center",
                    "justify-center"
                )}
            >
                <span
                    className={tw(
                        "hidden",
                        "print:block",
                        "z-10",
                        "flex",
                        "text-white",
                        "print:text-black",
                        "text-xs",
                        "font-mono",
                    )}
                >
                    {props.value}
                </span>
            </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
    );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
