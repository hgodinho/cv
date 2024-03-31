import { useState, useCallback } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import { Plus, Minus } from "react-feather";

import { tw } from "@/lib";
import { useTheme } from "@/provider";

export type CollapsibleProps = {
    className?: {
        root?: string;
        trigger?: string;
        content?: string;
    };
    isOpen?: boolean;
    onOpenChange?: CollapsiblePrimitive.CollapsibleProps["onOpenChange"];
    rootProps?: React.ComponentProps<typeof CollapsiblePrimitive.Root>;
    triggerProps?: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>;
};

export function Collapsible({
    children,
    className,
    rootProps,
    triggerProps,
    isOpen,
    onOpenChange,
}: React.PropsWithChildren<CollapsibleProps>) {
    const [open, setOpen] = useState(true);

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

    return (
        <CollapsiblePrimitive.Root
            className={tw("z-10", "flex", "flex-col", className?.root)}
            open={typeof isOpen === "boolean" ? isOpen : open}
            onOpenChange={onChange}
            {...rootProps}
        >
            <CollapsiblePrimitive.Trigger
                className={tw(
                    "options",
                    "bg-gray-50",
                    "text-gray-900",
                    "hover:bg-gray-300",
                    "active:text-gray-600",
                    "w-8",
                    "h-8",
                    "flex",
                    "justify-center",
                    "items-center",
                    className?.trigger
                )}
                {...triggerProps}
            >
                {!open ? <Plus size={icon} /> : <Minus size={icon} />}
            </CollapsiblePrimitive.Trigger>
            <motion.div
                animate={{
                    opacity: open ? 1 : 0,
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
