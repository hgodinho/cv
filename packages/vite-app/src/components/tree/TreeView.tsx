import { useState } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { tree } from "@/components/layout/grid.module.css";

import { tw } from "@/lib";

export function TreeView() {
    const [open, setOpen] = useState(false);

    return (
        <CollapsiblePrimitive.Root
            className={tw(tree, "z-10", "h-full", "flex", "flex-col")}
            open={open}
            onOpenChange={() => setOpen(!open)}
        >
            <CollapsiblePrimitive.Trigger
                className={tw(
                    "class-view-trigger",
                    "bg-gray-50",
                    "text-gray-900",
                    "hover:bg-gray-300",
                    "active:text-gray-600",
                    "p-1",
                    "font-bold",
                    "w-6",
                    "self-start"
                )}
            >
                {!open ? "+" : "-"}
            </CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content
                className={tw(
                    "class-view-content",
                    "border",
                    "border-dashed",
                    "h-full",
                    "overflow-y-auto",
                    "text-wrap",
                    "bg-black/80"
                )}
            >
                <div
                    className={tw(
                        "h-full",
                        "flex",
                        "flex-col",
                        "text-wrap",
                        "bg-black/80"
                    )}
                >

                </div>
            </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
    )
}