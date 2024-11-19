import React from "react";
import * as ScrollPrimitive from "@radix-ui/react-scroll-area";

import { tw } from "#root/lib";

export type ScrollProps = {
    root?: React.ComponentProps<typeof ScrollPrimitive.Root>;
    viewport?: React.ComponentProps<typeof ScrollPrimitive.Viewport>;
    scrollbar?: React.ComponentProps<typeof ScrollPrimitive.Scrollbar>;
    thumb?: React.ComponentProps<typeof ScrollPrimitive.Thumb>;
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
            className={tw("flex", "overflow-auto", root?.className)}
        >
            <ScrollPrimitive.Viewport
                {...viewport}
                asChild
                className={tw("!block", "viewport", viewport?.className)}
            >
                {children}
            </ScrollPrimitive.Viewport>

            <Scrollbar
                scrollbar={scrollbar}
                thumb={thumb}
                orientation="vertical"
            />
            <Scrollbar
                scrollbar={scrollbar}
                thumb={thumb}
                orientation="horizontal"
            />

            <ScrollPrimitive.Corner />
        </ScrollPrimitive.Root>
    );
}

export function Scrollbar({
    scrollbar,
    thumb,
    orientation,
}: {
    scrollbar?: React.ComponentProps<typeof ScrollPrimitive.Scrollbar>;
    thumb?: React.ComponentProps<typeof ScrollPrimitive.Thumb>;
    orientation?: "horizontal" | "vertical";
}) {
    return (
        <ScrollPrimitive.Scrollbar
            {...scrollbar}
            orientation={orientation}
            className={tw(
                "scrollbar",
                "flex",
                "touch-none",
                "select-none",
                "transition-colors",
                "h-full",
                "w-2.5",
                "border-l",
                "border-r",
                "border-zinc-500",
                "border-t-transparent",
                scrollbar?.className
            )}
        >
            <ScrollPrimitive.Thumb
                {...thumb}
                className={tw(
                    "relative",
                    "flex-1",
                    "rounded-none",
                    "bg-zinc-600",
                    thumb?.className
                )}
            />
        </ScrollPrimitive.Scrollbar>
    );
}
