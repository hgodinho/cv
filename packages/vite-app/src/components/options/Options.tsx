import { useEffect, useState } from "react";
import { Filter, Sliders } from "react-feather";

import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { tw } from "@/lib";
// @ts-ignore
import { options } from "@/components/layout/grid.module.css";
// @ts-ignore
import { button } from "@/components/button/button.module.scss";
import { Collapsible, TreeView } from "@/components";
import { useTheme } from "@/provider";

export function OptionsView() {
    const [selected, setSelected] = useState("filter");

    useEffect(() => {
        console.log({ selected });
    }, [selected]);

    return (
        <Collapsible
            className={{
                root: tw(options),
                content: tw("flex", "flex-col", "h-full"),
            }}
        >
            <Options
                value={selected}
                onValueChange={(value) => {
                    console.log(value);
                    setSelected(value);
                }}
            />
            <TreeView />
        </Collapsible>
    );
}

export type OptionsProps = {
    value: string;
    onValueChange: (value: string) => void;
};

export function Options(props: OptionsProps) {
    const {
        sizes: { icon },
    } = useTheme();

    return (
        <ToggleGroup.Root
            type="single"
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
                <button className={tw(button, "p-2", "hover:bg-gray-900")}>
                    <Filter size={icon} />
                </button>
            </ToggleGroup.Item>
            <ToggleGroup.Item value="settings" asChild>
                <button className={tw(button, "p-2", "hover:bg-gray-900")}>
                    <Sliders size={icon} />
                </button>
            </ToggleGroup.Item>
        </ToggleGroup.Root>
    );
}
