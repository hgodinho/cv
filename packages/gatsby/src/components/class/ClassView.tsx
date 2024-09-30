import React, { useEffect } from "react";

import { useCVContext, useTheme } from "#root/provider";
import { Body, Collapsible, Header } from "#root/components";
import { tw } from "#root/lib";
import { FileMinus, FilePlus } from "react-feather";

export function ClassView() {
    const { selected } = useCVContext();

    const {
        sizes: { icon },
        state: {
            collapsibles: { class: open },
            toggleCollapsible,
            collapsibleOn,
        },
        colors,
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

                    "col-start-5",
                    "col-span-2",
                    "row-start-2",
                    "row-span-2",

                    "data-[state=closed]:col-end-7",
                    "data-[state=closed]:col-span-1",
                    "data-[state=closed]:w-min",

                    // tablet
                    // "md:col-start-4",
                    // "md:data-[state=closed]:col-start-5"
                ),
                trigger: tw(
                    "col-start-2",
                    "col-span-1",
                    "row-start-1",
                    "row-span-1",

                    // tablet
                    "md:col-class-trigger-md"
                ),
                motion: tw(
                    "overflow-auto",
                    "col-start-1",
                    "col-span-2",
                    "row-start-3",
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
                    <Header />
                    <Body />
                </article>
            </main>
        </Collapsible>
    );
}
