import { useEffect } from "react";
import { FileMinus, FilePlus } from "react-feather";

import { useCVContext, useTheme } from "@/provider";
import { Body, Collapsible, Header } from "@/components";
import { tw } from "@/lib";

export function ClassView() {
    const {
        data: { properties, colors },
        selected,
    } = useCVContext();

    const {
        sizes: { icon },
        collapsibles: { class: open },
        viewPort: { height },
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
                    "class",

                    "grid",
                    "grid-cols-subgrid",
                    "grid-rows-subgrid",

                    "col-start-2",
                    "col-span-2",
                    "row-start-1",
                    "row-span-2",

                    "data-[state=closed]:col-span-1",
                    "data-[state=closed]:col-start-3",
                    "data-[state=closed]:w-min",

                    // tablet
                    "md:col-start-4",
                    "md:data-[state=closed]:col-start-5"
                ),
                trigger: tw(
                    "col-class-trigger",
                    "row-class-trigger",

                    // tablet
                    "md:col-class-trigger-md"
                ),
                motion: tw(
                    "overflow-auto",
                    "col-class",
                    "row-class",
                    "flex",
                    "flex-col"
                ),
                content: tw(
                    "h-full",
                    "bg-black/85",
                    "self-end",
                    "border-2",

                    // responsive
                    !open ? "w-0" : tw("w-4/5", "md:w-full")
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
            <main>
                <article className={tw("flex", "flex-col", "h-full", "w-full")}>
                    {!selected ? (
                        <div className="">Select a class to view more info</div>
                    ) : (
                        <>
                            <Header />
                            <Body />
                        </>
                    )}
                </article>
            </main>
        </Collapsible>
    );
}
