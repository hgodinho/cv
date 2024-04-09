import { useState } from "react";
import { Filter, Sliders, Menu, X } from "react-feather";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { tw } from "@/lib";
import { Collapsible, TreeView, Settings } from "@/components";
import { useTheme } from "@/provider";
import buttonStyles from "@/components/button/button.module.scss";

export type OptionsEnum = "filter" | "settings";

export function OptionsView() {
    const [selected, setSelected] = useState<Array<OptionsEnum>>([]);

    const {
        sizes: { icon },
        viewPort: { height, isTablet, isDesktop, isMobile },
        collapsibles: { options },
        toggleCollapsible,
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
            openIcon={<Menu size={icon} />}
            closeIcon={<X size={icon} />}
            isOpen={options}
            onOpenChange={() => toggleCollapsible("options")}
        >
            <div className={tw("flex", "flex-col")}>
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
            </div>
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

    return (
        <ToggleGroup.Root
            type="multiple"
            className={tw(
                "flex",
                "items-center",
                "sticky",
                "top-0",
                "bg-black",
                "border-b",
                "border-t-2",
                "z-10"
            )}
            {...props}
        >
            <ToggleGroup.Item value="filter" asChild>
                <button
                    className={tw(
                        buttonStyles.button,
                        "p-2",
                        "hover:bg-gray-900"
                    )}
                >
                    <Filter size={icon} />
                </button>
            </ToggleGroup.Item>
            <ToggleGroup.Item value="settings" asChild>
                <button
                    className={tw(
                        buttonStyles.button,
                        "p-2",
                        "hover:bg-gray-900"
                    )}
                >
                    <Sliders size={icon} />
                </button>
            </ToggleGroup.Item>
        </ToggleGroup.Root>
    );
}
