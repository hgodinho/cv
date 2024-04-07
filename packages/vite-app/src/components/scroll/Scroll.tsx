import { tw } from "@/lib";
import * as ScrollPrimitive from "@radix-ui/react-scroll-area";
import React from "react";

export type ScrollProps = {
    root?: React.ComponentProps<typeof ScrollPrimitive.Root>;
    viewport?: React.ComponentProps<typeof ScrollPrimitive.Viewport>;
    scrollbar?: React.ComponentProps<
        typeof ScrollPrimitive.ScrollAreaScrollbar
    >;
    thumb?: React.ComponentProps<typeof ScrollPrimitive.ScrollAreaThumb>;
};

export function Scroll({
    children,
    root,
    viewport,
    scrollbar,
    thumb,
}: React.PropsWithChildren<ScrollProps>) {
    return (
        <ScrollPrimitive.Root
            {...root}
            className={tw("overflow-auto", root?.className)}
        >
            <ScrollPrimitive.Viewport
                {...viewport}
                asChild
                className={tw("viewport", viewport?.className)}
            >
                {children}
            </ScrollPrimitive.Viewport>

            <ScrollPrimitive.ScrollAreaScrollbar
                {...scrollbar}
                orientation="vertical"
                className={tw(
                    "scrollbar",
                    "flex",
                    "touch-none",
                    "select-none",
                    "transition-colors",
                    "h-full",
                    "w-2.5",
                    "border-l",
                    "border-t-transparent",
                    scrollbar?.className
                )}
            >
                <ScrollPrimitive.ScrollAreaThumb
                    {...thumb}
                    className={tw(
                        "relative",
                        "flex-1",
                        "rounded-full",
                        "bg-gray-300",
                        thumb?.className
                    )}
                />
            </ScrollPrimitive.ScrollAreaScrollbar>

            <ScrollPrimitive.Corner />
        </ScrollPrimitive.Root>
    );
}
