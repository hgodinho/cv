import { useEffect } from "react";
import { FileMinus, FilePlus } from "react-feather";

import { useCVContext, useTheme } from "@/provider";
import { Fields, Collapsible } from "@/components";
import { tw } from "@/lib";

export function ClassView() {
    const {
        data: { properties, colors },
        selected,
        filterValue,
    } = useCVContext();

    const {
        sizes: { icon },
        collapsibles: { class: open },
        viewPort: { height, isMobile },
        toggleCollapsible,
        collapsibleOn,
    } = useTheme();

    useEffect(() => {
        if (selected) collapsibleOn("class");
    }, [selected]);

    return (
        <Collapsible
            className={{
                root: tw(
                    "grid",
                    "grid-cols-subgrid",
                    "grid-rows-subgrid",

                    "col-start-2",
                    "col-span-2",
                    "row-start-1",
                    "row-span-2",

                    "data-[state=closed]:col-start-3",
                    "data-[state=closed]:w-min"
                ),
                trigger: tw("col-class-trigger", "row-class-trigger"),
                motion: tw(
                    "overflow-auto",
                    "col-class",
                    "row-class",
                    "flex",
                    "flex-col"
                ),
                content: tw(
                    "bg-black/95",
                    "h-full",
                    "self-end",
                    isMobile && !open ? "w-0" : "w-4/5",
                    "border-2"
                ),
            }}
            isOpen={open}
            onOpenChange={() => toggleCollapsible("class")}
            rootProps={{
                disabled: !selected,
                style: {
                    height: height - 32,
                },
            }}
            contentProps={{
                style: {
                    borderColor: colors[selected?.type],
                },
            }}
            openIcon={<FilePlus size={icon} />}
            closeIcon={<FileMinus size={icon} />}
        >
            <div className={tw("flex", "flex-col", "h-full", "w-full")}>
                {!selected ? (
                    <div className="">Select a class to view more info</div>
                ) : (
                    <Fields
                        data={selected}
                        properties={properties}
                        filterValue={filterValue}
                        colors={colors}
                    />
                )}
            </div>
        </Collapsible>
    );
}
