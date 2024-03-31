import { useState, useEffect } from "react";

import { useCVContext } from "@/provider";
import { Fields, Collapsible } from "@/components";
import { tw } from "@/lib";

// @ts-ignore
import { classView } from "@/components/layout/grid.module.css";

export function ClassView() {
    const [open, setOpen] = useState<boolean>(false);

    const {
        data: { properties, colors },
        selected,
        filterValue,
    } = useCVContext();

    useEffect(() => {
        if (selected) setOpen(true);
    }, [selected]);

    return (
        <Collapsible
            className={{
                root: tw(
                    classView,
                    "h-full",
                    "text-wrap",
                    open ? "md:w-4/6" : "",
                    open ? "xl:w-full" : ""
                ),
                trigger: tw("self-end"),
                content: tw("h-full", "overflow-y-auto", "text-wrap"),
            }}
            isOpen={open}
            onOpenChange={setOpen}
        >
            <div
                className={tw(
                    "content",
                    "h-full",
                    "flex",
                    "flex-col",
                    "text-wrap",
                    "bg-black/80",
                    "border-4"
                )}
                style={{
                    borderColor: colors[selected?.type],
                }}
            >
                {!selected ? (
                    <div className="">Select a class to view more info</div>
                ) : (
                    <Fields
                        data={selected}
                        properties={properties}
                        filterValue={filterValue}
                    />
                )}
            </div>
        </Collapsible>
    );
}
