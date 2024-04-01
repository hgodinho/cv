import { useState } from "react";
import { Filter, Sliders } from "react-feather";

import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { tw } from "@/lib";
import { Collapsible, TreeView, Settings } from "@/components";
import { useTheme } from "@/provider";
import optionsStyles from "@/components/layout/grid.module.css";
import buttonStyles from "@/components/button/button.module.scss";

export type OptionsEnum = "filter" | "settings";

export function OptionsView() {
    const [selected, setSelected] = useState<Array<OptionsEnum>>([]);

    return (
        <Collapsible
            initialOpen={true}
            className={{
                root: tw(optionsStyles.options),
                content: tw("flex", "flex-col", "h-full"),
            }}
        >
            <Options
                value={selected}
                onValueChange={(value) => {
                    setSelected(value);
                }}
            />
            <Settings hidden={!selected.includes("settings")} />
            <TreeView mode={selected.includes("filter") ? "filter" : "link"} />
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
                "z-10",
                "bg-black",
                "border-b",
                "border-t-2"
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
