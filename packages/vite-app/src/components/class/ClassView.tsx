import { useState, useEffect } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { Plus, Minus } from "react-feather";

import { useCVContext } from "@/provider";
import { Fields } from "@/components";
import { tw } from "@/lib";

// @ts-ignore
import { classView } from "@/components/layout/grid.module.css";

export function ClassView() {
    const [open, setOpen] = useState(false);

    const {
        data: { properties, colors },
        selected,
        filterValue,
    } = useCVContext();

    useEffect(() => {
        if (selected) setOpen(true);
    }, [selected]);

    return (
        <CollapsiblePrimitive.Root
            className={tw(
                classView,
                "z-10",
                "h-full",
                "flex",
                "flex-col",
                open ? "md:w-4/6" : "",
                open ? "xl:w-full" : ""
            )}
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
                    "self-end"
                )}
            >
                {!open ? <Plus size={16} /> : <Minus size={16} />}
            </CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content
                className={tw(
                    "border-4",
                    "h-full",
                    "overflow-y-auto",
                    "text-wrap",
                )}
                style={{
                    borderColor: colors[selected?.type],
                }}
            >
                <div
                    className={tw(
                        "content",
                        "h-full",
                        "flex",
                        "flex-col",
                        "text-wrap",
                        "bg-black/80"
                    )}
                >
                    {!selected ? (
                        <div className="">Select a class to view more info</div>
                    ) : (
                        <Fields data={selected} properties={properties} filterValue={filterValue} />
                    )}
                </div>
            </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
    );
}
