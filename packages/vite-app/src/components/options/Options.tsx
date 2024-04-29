import { useState } from "react";
import { Filter, Sliders, Menu, X } from "react-feather";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { tw } from "#root/lib";
import { Collapsible, TreeView, Settings } from "#root/components";
import { useTheme } from "#root/provider";

export type OptionsEnum = "filter" | "settings";

export function OptionsView() {
    const [selected, setSelected] = useState<Array<OptionsEnum>>([]);

    const {
        sizes: { icon },
        state: {
            viewPort: { height, isTablet, isDesktop },
            collapsibles: { options },
            toggleCollapsible,
        },
    } = useTheme();

    return (
        <Collapsible
            initialOpen={isTablet ? isTablet : isDesktop}
            className={{
                root: tw(
                    "options",
                    "grid",
                    "grid-cols-subgrid",
                    "grid-rows-subgrid",

                    "col-start-1",
                    "col-span-2",
                    "row-start-1",
                    "row-span-2",

                    "data-[state=closed]:col-span-1",
                    "data-[state=closed]:w-min"
                ),
                trigger: tw("col-options-trigger", "row-options-trigger"),
                motion: tw(
                    "overflow-auto",
                    "col-options",
                    "row-options",
                    "flex",
                    "flex-col",

                    // responsive
                    !options ? "w-0" : tw("w-4/5", "md:w-full")
                ),
                content: tw("bg-black/90"),
            }}
            rootProps={{
                style: {
                    height: height - 32,
                },
            }}
            triggerProps={{
                "aria-label": "Menu",
            }}
            openIcon={<Menu size={icon} />}
            closeIcon={<X size={icon} />}
            isOpen={options}
            onOpenChange={() => toggleCollapsible("options")}
        >
            <aside className={tw("flex", "flex-col")}>
                <Options
                    value={selected}
                    onValueChange={(value) => {
                        setSelected(value);
                    }}
                />
                <Settings hidden={!selected.includes("settings")} />
                <TreeView
                    mode={selected.includes("filter") ? "filter" : "link"}
                    settings={selected.includes("settings")}
                />
            </aside>
        </Collapsible>
    );
}

export type OptionsProps = {
    value: string[];
    onValueChange: (value: Array<OptionsEnum>) => void;
};

export function Options(props: OptionsProps) {
    const {
        sizes: { icon },
    } = useTheme();

    const toggleClass = tw(
        "p-2",
        "data-[state=on]:bg-gray-800",
        "data-[state=on]:font-bold",
        "hover:bg-gray-900",
        "focus:outline-none",
        "focus:ring-4",
        "focus:ring-inset",
        "focus:ring-gray-500",
        "focus:focus:bg-gray-700"
    );

    return (
        <ToggleGroup.Root
            type="multiple"
            aria-label="Opções"
            className={tw(
                "flex",
                "items-center",
                "sticky",
                "top-0",
                "bg-black",
                "border-b",
                "border-t-2"
            )}
            {...props}
        >
            <ToggleGroup.Item
                value="filter"
                aria-label="Filtrar itens"
                className={toggleClass}
            >
                <Filter size={icon} />
            </ToggleGroup.Item>
            <ToggleGroup.Item
                value="settings"
                aria-label="Configurações"
                className={toggleClass}
            >
                <Sliders size={icon} />
            </ToggleGroup.Item>
        </ToggleGroup.Root>
    );
}
