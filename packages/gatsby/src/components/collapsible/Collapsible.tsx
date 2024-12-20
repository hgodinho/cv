import React, { useState, useCallback } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import { Plus, Minus, EyeOff } from "react-feather";

import { tw } from "#root/lib";
import { useTheme } from "#root/provider";
import { buttonVariants } from "#root/components";

export type CollapsibleProps = {
    className?: {
        root?: string;
        trigger?: string;
        content?: string;
        motion?: string;
    };
    initialOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: CollapsiblePrimitive.CollapsibleProps["onOpenChange"];
    rootProps?: React.ComponentProps<typeof CollapsiblePrimitive.Root>;
    triggerProps?: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>;
    contentProps?: React.ComponentProps<typeof CollapsiblePrimitive.Content>;
    openIcon?: React.ReactNode;
    closeIcon?: React.ReactNode;
    disabledIcon?: React.ReactNode;
};

export function Collapsible({
    children,
    className,
    rootProps,
    triggerProps,
    contentProps,
    isOpen,
    initialOpen,
    openIcon,
    closeIcon,
    disabledIcon,
    onOpenChange,
}: React.PropsWithChildren<CollapsibleProps>) {
    const [open, setOpen] = useState(
        typeof initialOpen === "boolean" ? initialOpen : false
    );

    const {
        sizes: { icon },
    } = useTheme();

    const onChange = useCallback(
        (open: boolean) => {
            if (typeof onOpenChange !== "undefined") {
                onOpenChange(open);
                setOpen(open);
            } else {
                setOpen(open);
            }
        },
        [onOpenChange]
    );

    const isCollapsibleOpen = typeof isOpen === "boolean" ? isOpen : open;

    return (
        <CollapsiblePrimitive.Root
            className={tw("collapsible", "z-10", className?.root)}
            open={isCollapsibleOpen}
            onOpenChange={onChange}
            defaultOpen={initialOpen || false}
            {...rootProps}
        >
            <CollapsiblePrimitive.Trigger
                className={tw(
                    buttonVariants({
                        className: tw(
                            "collapsible-trigger",
                            className?.trigger
                        ),
                    }),
                    className?.trigger
                )}
                {...triggerProps}
            >
                {rootProps?.disabled
                    ? disabledIcon || <EyeOff size={icon} />
                    : !isCollapsibleOpen
                        ? openIcon || <Plus size={icon} />
                        : closeIcon || <Minus size={icon} />}
            </CollapsiblePrimitive.Trigger>
            <motion.div
                animate={{
                    opacity: isCollapsibleOpen ? 1 : 0,
                }}
                transition={{
                    duration: 0.3,
                }}
                className={tw("motion", "overflow-auto", className?.motion)}
            >
                <CollapsiblePrimitive.Content
                    asChild
                    className={tw("content", "text-wrap", className?.content)}
                    {...contentProps}
                    forceMount={contentProps?.forceMount || true}
                >
                    {children}
                </CollapsiblePrimitive.Content>
            </motion.div>
        </CollapsiblePrimitive.Root>
    );
}
