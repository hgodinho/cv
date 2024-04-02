import { useState, useCallback } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import { Plus, Minus, EyeOff } from "react-feather";

import { tw } from "@/lib";
import { useTheme } from "@/provider";

export type CollapsibleProps = {
    className?: {
        root?: string;
        trigger?: string;
        content?: string;
    };
    initialOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: CollapsiblePrimitive.CollapsibleProps["onOpenChange"];
    rootProps?: React.ComponentProps<typeof CollapsiblePrimitive.Root>;
    triggerProps?: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>;
    openIcon?: React.ReactNode;
    closeIcon?: React.ReactNode;
    disabledIcon?: React.ReactNode;
};

export function Collapsible({
    children,
    className,
    rootProps,
    triggerProps,
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
            className={tw("z-10", "flex", "flex-col", className?.root)}
            open={isCollapsibleOpen}
            onOpenChange={onChange}
            defaultOpen={initialOpen || false}
            {...rootProps}
        >
            <CollapsiblePrimitive.Trigger
                className={tw(
                    "options",
                    "w-8",
                    "h-8",
                    "flex",
                    "justify-center",
                    "items-center",
                    "bg-gray-50",
                    "text-gray-900",
                    "hover:bg-gray-300",
                    "active:text-gray-600",
                    "disabled:bg-gray-300/40",
                    "disabled:cursor-not-allowed",
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
                className={tw("cv", "h-full", "overflow-y-auto")}
            >
                <CollapsiblePrimitive.Content
                    forceMount={true}
                    className={tw(
                        "text-wrap",
                        "bg-black/80",
                        "text-gray-300",
                        className?.content
                    )}
                >
                    {children}
                </CollapsiblePrimitive.Content>
            </motion.div>
        </CollapsiblePrimitive.Root>
    );
}
