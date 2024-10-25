import React from "react";
import { Label, Slider } from "#root/components";
import { tw } from "#root/lib";

export type SkillProps = {
    label: React.ReactNode;
    value: number[];
    bestRating: number;
};

export function Skill({ label, value, bestRating }: SkillProps) {
    return (
        <Label
            className={tw(
                "flex",
                "items-center",
                "place-content-between",
                "gap-2",
                "mb-2"
            )}
        >
            {label}
            <Slider
                name={label as string}
                value={value}
                max={bestRating}
                step={1}
                className={tw("w-4/6")}
            />
        </Label>
    );
}
